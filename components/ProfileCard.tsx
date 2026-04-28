import { Mail, Phone, MapPin, User as UserIcon, Edit3 } from "lucide-react";

interface ProfileCardProps {
  user: any;
  onEditClick: () => void;
}

export default function ProfileCard({ user, onEditClick }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50" />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-white shadow-md flex items-center justify-center shrink-0 overflow-hidden">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon size={40} className="text-slate-300" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
            {user?.name || "Anonymous User"}
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-500 mt-2">
            <span className="flex items-center gap-1.5">
              <Mail size={16} className="text-blue-600" /> {user?.email}
            </span>
            {user?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone size={16} className="text-blue-600" /> {user.phone}
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onEditClick}
          className="w-full md:w-auto px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* Bio Section */}
      {user?.bio && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            About Me
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">{user.bio}</p>
        </div>
      )}
    </div>
  );
}
