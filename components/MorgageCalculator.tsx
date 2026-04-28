"use client";

import { useState, useMemo } from "react";
import { Calculator, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatPrice } from "@/lib/helpers";

interface MortgageCalculatorProps {
  price?: number; // Assumes your database sends this in cents/paisa
  profitPerWeek?: number; // Estimated weekly rental income
}

const MortgageCalculator = ({
  price = 845900, // Default to $845,900.00 (in cents)
  profitPerWeek = 0, // Default to $800/week rent
}: MortgageCalculatorProps) => {
  // Convert from cents to standard currency format
  const homePrice = Number(price);

  // Controlled Form State
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(5.8);
  const [loanTerm, setLoanTerm] = useState<number>(30);

  // Perform Calculations (Wrapped in useMemo so it only recalculates when inputs change)
  const { weeklyMortgage, outOfPocket, isCashFlowPositive } = useMemo(() => {
    // 1. Calculate Principal Loan Amount
    const principal = homePrice * (1 - downPaymentPct / 100);

    // 2. Standard Amortization Formula for Monthly Payment
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // 3. Convert Monthly Mortgage to Weekly Mortgage
    const weeklyPayment = (monthlyPayment * 12) / 52;

    // 4. Calculate Net Out of Pocket (Mortgage minus Expected Rent)
    const netCost = weeklyPayment - profitPerWeek;

    return {
      weeklyMortgage: weeklyPayment,
      outOfPocket: Math.abs(netCost), // Use absolute value for display purposes
      isCashFlowPositive: netCost <= 0, // True if rent covers the mortgage
    };
  }, [homePrice, downPaymentPct, interestRate, loanTerm, profitPerWeek]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-blue-600" size={24} />
        <h4 className="font-bold text-slate-900">Investment Calculator</h4>
      </div>

      <div className="space-y-4">
        {/* Home Price (Read Only) */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Property Value
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              $
            </span>
            <input
              className="w-full pl-8 pr-4 py-3 bg-slate-50 border-none outline-none rounded-xl text-sm font-bold text-slate-700"
              type="text"
              value={homePrice.toLocaleString()}
              readOnly
            />
          </div>
        </div>

        {/* Down Payment & Interest Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Down Payment
            </label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
              <input
                className="w-full px-4 py-3 bg-slate-50 border border-transparent outline-none rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10 transition-all"
                type="number"
                min="0"
                max="100"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Interest Rate
            </label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
              <input
                className="w-full px-4 py-3 bg-slate-50 border border-transparent outline-none rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10 transition-all"
                type="number"
                step="0.1"
                min="0"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full px-4 py-3 bg-slate-50 border border-transparent outline-none rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10 appearance-none cursor-pointer transition-all"
          >
            <option value={30}>30 Years</option>
            <option value={25}>25 Years</option>
            <option value={20}>20 Years</option>
            <option value={15}>15 Years</option>
          </select>
        </div>

        {/* Results Dashboard */}
        <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
            <span className="text-sm font-semibold text-slate-500">
              Weekly Mortgage
            </span>
            <span className="text-sm font-bold text-slate-900">
              {formatPrice(weeklyMortgage)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
            <span className="text-sm font-semibold text-slate-500">
              Est. Weekly Rent
            </span>
            <span className="text-sm font-bold text-emerald-600">
              +{formatPrice(profitPerWeek)}
            </span>
          </div>

          {/* Dynamic Net Result Box */}
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border ${
              isCashFlowPositive
                ? "bg-emerald-50 border-emerald-100"
                : "bg-amber-50 border-amber-100"
            }`}
          >
            <div
              className={`mt-0.5 p-1.5 rounded-lg ${
                isCashFlowPositive
                  ? "bg-emerald-200 text-emerald-700"
                  : "bg-amber-200 text-amber-700"
              }`}
            >
              {isCashFlowPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
            </div>
            <div>
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                  isCashFlowPositive ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {isCashFlowPositive ? "Positive Cashflow" : "Out of Pocket"}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-black tracking-tight ${
                    isCashFlowPositive ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {formatPrice(outOfPocket)}
                </span>
                <span
                  className={`text-sm font-bold ${
                    isCashFlowPositive
                      ? "text-emerald-600/70"
                      : "text-amber-600/70"
                  }`}
                >
                  / week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
