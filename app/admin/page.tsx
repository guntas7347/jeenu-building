"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  MessageSquare,
  BarChart3,
  Loader2,
} from "lucide-react";
import { getDashboardStats } from "@/lib/actions/stats";
import DashboardChart from "@/components/DashboardChart";
import { useSession } from "next-auth/react";

export default function DashboardOverviewPage() {
  const { data: session } = useSession();

  // 1. Setup local state for the data and loading status
  const [stats, setStats] = useState({
    totalListings: 0,
    totalQueries: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const STATS_UI = [
    {
      label: "Total Listings",
      value: stats.totalListings,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Queries",
      value: stats.totalQueries,
      icon: MessageSquare,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-500 font-medium">
          Loading dashboard metrics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Overview
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Welcome back, {session?.user?.name || "Admin"}. Here is a snapshot of
          your platform today.
        </p>
      </header>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {STATS_UI.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center`}
                >
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  All Time
                </span>
              </div>
              <div>
                <div className="text-4xl font-black text-slate-900 mb-1 tracking-tight">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="text-blue-600" size={24} />
          System Metrics Distribution
        </h2>

        {/* Render the Client Chart Component */}
        <DashboardChart
          listings={stats.totalListings}
          queries={stats.totalQueries}
          users={stats.totalUsers}
        />
      </div>
    </div>
  );
}
