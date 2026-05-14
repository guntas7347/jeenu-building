"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Calculator,
  Home,
  Car,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Phone,
  Percent,
  DollarSign,
  Clock,
} from "lucide-react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────
type Tab = "home" | "asset";
type FreqKey = "monthly" | "fortnightly" | "weekly";

const FREQ: Record<FreqKey, { label: string; n: number }> = {
  monthly: { label: "Monthly", n: 12 },
  fortnightly: { label: "Fortnightly", n: 26 },
  weekly: { label: "Weekly", n: 52 },
};

// ─── Config per tab ──────────────────────────────────────────────────────────
const CONFIG = {
  home: {
    label: "Home Loan",
    icon: Home,
    accentClass: "text-primary",
    defaultAmount: 600000,
    defaultRate: 6.35,
    defaultTerm: 30,
    minAmount: 50000,
    maxAmount: 3000000,
    stepAmount: 10000,
    maxTerm: 30,
    minTerm: 5,
    desc: "Standard residential mortgage repayment estimator",
    color: "#e27b32",
  },
  asset: {
    label: "Asset Finance",
    icon: Car,
    accentClass: "text-blue-500",
    defaultAmount: 50000,
    defaultRate: 7.5,
    defaultTerm: 5,
    minAmount: 5000,
    maxAmount: 500000,
    stepAmount: 1000,
    maxTerm: 7,
    minTerm: 1,
    desc: "Vehicles, equipment & marine asset finance estimator",
    color: "#3b82f6",
  },
} as const;

// ─── Helper ──────────────────────────────────────────────────────────────────
function fmt(n: number, dec = 0) {
  return n.toLocaleString("en-AU", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

// ─── Slider component ────────────────────────────────────────────────────────
function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  minLabel,
  maxLabel,
  accent,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: any) => void;
  minLabel: string;
  maxLabel: string;
  accent: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </label>
        <span
          className="text-lg font-black tabular-nums"
          style={{ color: accent }}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary bg-gray-200 dark:bg-white/10"
        style={{ accentColor: accent }}
      />
      <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── Amortization row type ───────────────────────────────────────────────────
interface AmorRow {
  year: number;
  open: number;
  principal: number;
  interest: number;
  close: number;
}

function buildAmortization(
  amount: number,
  annualRate: number,
  termYears: number,
): AmorRow[] {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  const emi =
    r === 0
      ? amount / n
      : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const rows: AmorRow[] = [];
  let balance = amount;

  for (let y = 1; y <= termYears; y++) {
    const open = balance;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    for (let m = 0; m < 12 && balance > 0; m++) {
      const intPayment = balance * r;
      const prinPayment = Math.min(emi - intPayment, balance);
      yearlyInterest += intPayment;
      yearlyPrincipal += prinPayment;
      balance = Math.max(balance - prinPayment, 0);
    }
    rows.push({
      year: y,
      open,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      close: balance,
    });
    if (balance <= 0) break;
  }
  return rows;
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function CalculatorsPage() {
  const [tab, setTab] = useState<Tab>("home");
  const cfg = CONFIG[tab];

  const [amount, setAmount] = useState(cfg.defaultAmount);
  const [rate, setRate] = useState(cfg.defaultRate);
  const [term, setTerm] = useState(cfg.defaultTerm);
  const [freq, setFreq] = useState<FreqKey>("monthly");
  const [extraRepay, setExtraRepay] = useState(0);
  const [showAllRows, setShowAllRows] = useState(false);

  // Switch tab resets
  const switchTab = useCallback(
    (t: Tab) => {
      if (t === tab) return;
      setTab(t);
      setAmount(CONFIG[t].defaultAmount);
      setRate(CONFIG[t].defaultRate);
      setTerm(CONFIG[t].defaultTerm);
      setFreq("monthly");
      setExtraRepay(0);
      setShowAllRows(false);
    },
    [tab],
  );

  // Core calc
  const { monthly, totalPayment, totalInterest, rows } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly =
      r === 0
        ? amount / n
        : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - amount;
    const rows = buildAmortization(amount, rate, term);
    return { monthly, totalPayment, totalInterest, rows };
  }, [amount, rate, term]);

  // Repayment per frequency
  const repayment = useMemo(() => {
    const { n } = FREQ[freq];
    return (monthly * 12) / n;
  }, [monthly, freq]);

  // Extra repayment savings (simple estimation)
  const savings = useMemo(() => {
    if (extraRepay <= 0) return null;
    const r = rate / 100 / 12;
    const stdMonthly = monthly;
    const newMonthly = stdMonthly + extraRepay;

    let bal = amount;
    let months = 0;
    let totalInt = 0;
    while (bal > 0 && months < term * 12 * 2) {
      const intCharge = bal * r;
      const prin = Math.min(newMonthly - intCharge, bal);
      totalInt += intCharge;
      bal -= prin;
      months++;
    }
    const savedInterest = totalInterest - totalInt;
    const savedMonths = term * 12 - months;
    return {
      savedInterest,
      savedYears: Math.floor(savedMonths / 12),
      savedMonths: savedMonths % 12,
    };
  }, [extraRepay, monthly, amount, rate, term, totalInterest]);

  const principalPct = Math.round((amount / totalPayment) * 100);
  const interestPct = 100 - principalPct;

  const displayRows = showAllRows ? rows : rows.slice(0, 5);
  const accent = cfg.color;

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1a130f] border-b border-gray-100 dark:border-white/8 pt-20 pb-8 px-6">
        <div className="max-w-5xl mx-auto pt-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Loan Repayment Calculator
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Visualize repayments, interest costs, and early-payoff savings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* ── Main calculator grid ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Inputs */}
          <section className="lg:col-span-5 bg-white dark:bg-[#2a1e15] rounded-2xl border border-gray-100 dark:border-white/8 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-gray-800 dark:text-white">
                Loan Details
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">{cfg.desc}</p>
            </div>

            <Slider
              label="Loan Amount"
              value={amount}
              display={`$${fmt(amount)}`}
              min={cfg.minAmount}
              max={cfg.maxAmount}
              step={cfg.stepAmount}
              onChange={setAmount}
              minLabel={`$${fmt(cfg.minAmount)}`}
              maxLabel={`$${fmt(cfg.maxAmount)}`}
              accent={accent}
            />

            <Slider
              label="Interest Rate (p.a.)"
              value={rate}
              display={`${rate.toFixed(2)}%`}
              min={1}
              max={15}
              step={0.05}
              onChange={setRate}
              minLabel="1.00%"
              maxLabel="15.00%"
              accent={accent}
            />

            <Slider
              label="Loan Term"
              value={term}
              display={`${term} yr${term > 1 ? "s" : ""}`}
              min={cfg.minTerm}
              max={cfg.maxTerm}
              step={1}
              onChange={setTerm}
              minLabel={`${cfg.minTerm} yr`}
              maxLabel={`${cfg.maxTerm} yrs`}
              accent={accent}
            />

            {/* Extra repayment */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Extra Repayment / mo
                </label>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                  {extraRepay > 0 ? "Savings on!" : "Optional"}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={extraRepay || ""}
                  placeholder="0"
                  onChange={(e) =>
                    setExtraRepay(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm font-bold text-gray-800 dark:text-white outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="lg:col-span-7 flex flex-col gap-5">
            {/* Repayment frequency + big number */}
            <div className="bg-white dark:bg-[#2a1e15] rounded-2xl border border-gray-100 dark:border-white/8 shadow-sm p-6">
              {/* Freq selector */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-white/8 rounded-xl w-fit mb-5">
                {(Object.keys(FREQ) as FreqKey[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFreq(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      freq === f
                        ? "bg-white dark:bg-white/15 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                  >
                    {FREQ[f].label}
                  </button>
                ))}
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    {FREQ[freq].label} Repayment
                  </p>
                  <p
                    className="text-4xl font-black tabular-nums"
                    style={{ color: accent }}
                  >
                    ${fmt(repayment, 0)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    incl. principal + interest
                  </p>
                </div>

                {/* Split bar */}
                <div className="flex-1 max-w-[200px]">
                  <div className="flex h-2.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${principalPct}%`,
                        backgroundColor: accent,
                      }}
                    />
                    <div
                      className="h-full bg-gray-300 dark:bg-white/20 transition-all duration-700"
                      style={{ width: `${interestPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-gray-400">
                    <span style={{ color: accent }}>
                      Principal {principalPct}%
                    </span>
                    <span>Interest {interestPct}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: DollarSign,
                  label: "Total Repayment",
                  value: `$${fmt(totalPayment, 0)}`,
                  sub: "over full term",
                  color: accent,
                },
                {
                  icon: Percent,
                  label: "Total Interest",
                  value: `$${fmt(totalInterest, 0)}`,
                  sub: `${fmt((totalInterest / amount) * 100, 1)}% of principal`,
                  color: "#f97316",
                },
                {
                  icon: Clock,
                  label: "Loan Term",
                  value: `${term} yrs`,
                  sub: `${term * 12} payments`,
                  color: "#6366f1",
                },
              ].map(({ icon: Icon, label, value, sub, color }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-[#2a1e15] rounded-xl border border-gray-100 dark:border-white/8 shadow-sm p-4"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                    {label}
                  </p>
                  <p className="text-base font-black text-gray-900 dark:text-white tabular-nums">
                    {value}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Extra repayment savings */}
            {savings && (
              <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                    Extra Repayment Savings
                  </p>
                  <p className="text-sm text-emerald-800 dark:text-emerald-300">
                    Paying an extra <strong>${fmt(extraRepay)}/mo</strong> saves{" "}
                    <strong>${fmt(savings.savedInterest, 0)}</strong> in
                    interest
                    {savings.savedYears > 0 || savings.savedMonths > 0 ? (
                      <>
                        {" "}
                        and cuts your loan by{" "}
                        <strong>
                          {savings.savedYears > 0
                            ? `${savings.savedYears}y `
                            : ""}
                          {savings.savedMonths > 0
                            ? `${savings.savedMonths}m`
                            : ""}
                        </strong>
                      </>
                    ) : null}
                    .
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ── Amortization table ─────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#2a1e15] rounded-2xl border border-gray-100 dark:border-white/8 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/8 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Yearly Amortization Schedule
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                How your loan balance reduces year by year
              </p>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {rows.length} Years
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/3">
                  {[
                    "Year",
                    "Opening Balance",
                    "Principal Paid",
                    "Interest Paid",
                    "Closing Balance",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {displayRows.map((row, i) => (
                  <tr
                    key={row.year}
                    className={`hover:bg-gray-50 dark:hover:bg-white/3 transition-colors ${
                      i === 0 ? "font-semibold" : ""
                    }`}
                  >
                    <td className="px-5 py-3 font-bold text-gray-700 dark:text-gray-200">
                      {row.year}
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 tabular-nums">
                      ${fmt(row.open, 0)}
                    </td>
                    <td
                      className="px-5 py-3 tabular-nums"
                      style={{ color: accent }}
                    >
                      ${fmt(row.principal, 0)}
                    </td>
                    <td className="px-5 py-3 text-orange-500 tabular-nums">
                      ${fmt(row.interest, 0)}
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 tabular-nums">
                      ${fmt(row.close, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length > 5 && (
            <button
              onClick={() => setShowAllRows(!showAllRows)}
              className="w-full py-3 text-xs font-bold text-gray-500 hover:text-gray-800 dark:hover:text-white flex items-center justify-center gap-1.5 border-t border-gray-100 dark:border-white/8 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
            >
              {showAllRows ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Collapse Table
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> View All {rows.length}{" "}
                  Years
                </>
              )}
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
