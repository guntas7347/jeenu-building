import { Building, TrendingUp, Users, MessageSquare } from "lucide-react";

const stats = [
  {
    label: "Total Properties",
    value: "128",
    increase: "+4 this month",
    icon: Building,
  },
  {
    label: "Active Queries",
    value: "34",
    increase: "+12 this week",
    icon: MessageSquare,
  },
  {
    label: "Total Views",
    value: "2.4M",
    increase: "+15% vs last month",
    icon: TrendingUp,
  },
  { label: "Client Inquiries", value: "89", increase: "Steady", icon: Users },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">
          Overview
        </h1>
        <p className="text-on-surface-variant mt-1">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-surface-container p-6 rounded-xl border border-outline-variant/10"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                  Today
                </span>
              </div>
              <div className="text-3xl font-bold text-on-surface mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-on-surface-variant">
                {stat.label}
              </div>
              <div className="text-[10px] font-bold text-primary mt-4 uppercase tracking-wider">
                {stat.increase}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-6">
        <h2 className="text-lg font-bold text-on-surface mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 py-3 border-b border-outline-variant/5 last:border-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-on-surface">
                <span className="font-bold">John Doe</span> submitted a query
                for <span className="font-bold">The Obsidian Pavilion</span>.
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 py-3 border-b border-outline-variant/5 last:border-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Building className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-on-surface">
                <span className="font-bold">Julian Vasseur</span> added a new
                property <span className="font-bold">Alpine Horizon</span>.
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                5 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
