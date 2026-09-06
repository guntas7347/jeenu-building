import { Mail, Phone, User as UserIcon, Edit3 } from "lucide-react";

interface ProfileCardProps {
  user: any;
  onEditClick: () => void;
}

export default function ProfileCard({ user, onEditClick }: ProfileCardProps) {
  return (
    <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-white/60 dark:border-white/10 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon size={40} className="text-slate-400" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
            {user?.name || "Anonymous User"}
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <Mail size={16} className="text-primary" /> {user?.email}
            </span>
            {user?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone size={16} className="text-primary" /> {user.phone}
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onEditClick}
          className="w-full md:w-auto px-5 py-2.5 liquid-glass text-slate-800 dark:text-slate-200 font-bold rounded-xl hover:text-primary transition-colors flex items-center justify-center gap-2 border border-white/70 dark:border-white/10"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* Bio Section */}
      {user?.bio && (
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
            About Me
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{user.bio}</p>
        </div>
      )}
    </div>
  );
}
