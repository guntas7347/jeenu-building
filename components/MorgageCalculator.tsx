"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";
import { formatPrice } from "@/lib/helpers";

interface MortgageCalculatorProps {
  price?: number;
  profitPerWeek?: number;
}

const MortgageCalculator = ({
  price = 845900,
  profitPerWeek = 0,
}: MortgageCalculatorProps) => {
  const homePrice = Number(price);

  // Controlled Form State
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(5.8);
  const [loanTerm, setLoanTerm] = useState<number>(30);

  // Perform Calculations
  const { weeklyMortgage, outOfPocket, isCashFlowPositive } = useMemo(() => {
    const principal = homePrice * (1 - downPaymentPct / 100);
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

    const weeklyPayment = (monthlyPayment * 12) / 52;
    const netCost = weeklyPayment - profitPerWeek;

    return {
      weeklyMortgage: weeklyPayment,
      outOfPocket: Math.abs(netCost),
      isCashFlowPositive: netCost <= 0,
    };
  }, [homePrice, downPaymentPct, interestRate, loanTerm, profitPerWeek]);

  return (
    <div className="liquid-glass-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-primary" size={22} />
        <h4 className="font-extrabold text-slate-900 dark:text-white">Investment & Mortgage Calculator</h4>
      </div>

      <div className="space-y-4">
        {/* Home Price (Read Only) */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Property Value
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              $
            </span>
            <input
              className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none rounded-xl text-sm font-bold text-slate-800 dark:text-white"
              type="text"
              value={homePrice.toLocaleString()}
              readOnly
            />
          </div>
        </div>

        {/* Down Payment & Interest Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Down Payment
            </label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
              <input
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:border-primary transition-all"
                type="number"
                min="0"
                max="100"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Interest Rate
            </label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
              <input
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:border-primary transition-all"
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
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:border-primary appearance-none cursor-pointer transition-all"
          >
            <option value={30}>30 Years</option>
            <option value={25}>25 Years</option>
            <option value={20}>20 Years</option>
            <option value={15}>15 Years</option>
          </select>
        </div>

        {/* Results Dashboard */}
        <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200/60 dark:border-white/5 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200/60 dark:border-white/5">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Weekly Mortgage
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {formatPrice(weeklyMortgage)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-200/60 dark:border-white/5">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Est. Weekly Rent
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              +{formatPrice(profitPerWeek)}
            </span>
          </div>

          {/* Dynamic Net Result Box */}
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border ${
              isCashFlowPositive
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800"
                : "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-800"
            }`}
          >
            <div
              className={`mt-0.5 p-1.5 rounded-lg ${
                isCashFlowPositive
                  ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-200 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
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
                  isCashFlowPositive ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"
                }`}
              >
                {isCashFlowPositive ? "Positive Cashflow" : "Out of Pocket"}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-black tracking-tight ${
                    isCashFlowPositive ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {formatPrice(outOfPocket)}
                </span>
                <span
                  className={`text-sm font-bold ${
                    isCashFlowPositive
                      ? "text-emerald-600/70 dark:text-emerald-400/70"
                      : "text-amber-600/70 dark:text-amber-400/70"
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
