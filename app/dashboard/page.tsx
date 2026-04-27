import {
  Building2,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
} from "lucide-react";

// --- DYNAMIC DATA ARRAYS ---

const STATS = [
  {
    label: "Total Listings",
    value: "128",
    increase: "+4 this month",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trendColor: "text-blue-600",
  },
  {
    label: "Active Queries",
    value: "34",
    increase: "+12 this week",
    icon: MessageSquare,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    trendColor: "text-amber-600",
  },
  {
    label: "Total Users",
    value: "89",
    increase: "Steady growth",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trendColor: "text-emerald-600",
  },
  {
    label: "Total Views",
    value: "2.4M",
    increase: "+15% vs last month",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    trendColor: "text-indigo-600",
  },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    user: "Sarah Jenkins",
    action: "submitted a query for",
    target: "The Obsidian Pavilion",
    time: "2 hours ago",
    icon: MessageSquare,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: 2,
    user: "Marcus Sterling",
    action: "added a new property",
    target: "Alpine Horizon",
    time: "5 hours ago",
    icon: Building2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: 3,
    user: "David Chen",
    action: "registered as a",
    target: "New User",
    time: "1 day ago",
    icon: Users,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Overview
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Welcome back, Ajiteshwar. Here's what's happening today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center`}
                >
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  Today
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-500">
                {stat.label}
              </div>
              <div className={`text-xs font-bold ${stat.trendColor} mt-4`}>
                {stat.increase}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Clock className="text-blue-600" size={24} />
          Recent Activity
        </h2>
        <div className="space-y-6">
          {RECENT_ACTIVITY.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${activity.iconBg} flex items-center justify-center shrink-0 border border-slate-50`}
                >
                  <Icon className={`${activity.iconColor}`} size={20} />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-bold text-slate-900">
                      {activity.target}
                    </span>
                    .
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-1.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
