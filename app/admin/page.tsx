import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm bg-surface-container-low p-8 rounded-2xl shadow-2xl border border-outline-variant/10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-black text-primary tracking-tighter font-headline">
              LUXE ESTATE
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-on-surface">Admin Portal</h1>
          <p className="text-on-surface-variant text-sm mt-2">
            Sign in to manage listings and queries.
          </p>
        </div>

        <form className="space-y-5" action="/admin/dashboard">
          <div>
            <label className="form-label text-left">Email Address</label>
            <div className="relative">
              <input
                type="email"
                className="form-input pl-11"
                placeholder="admin@luxeestate.com"
                defaultValue="admin@luxeestate.com"
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant" />
            </div>
          </div>

          <div>
            <label className="form-label text-left">Password</label>
            <div className="relative">
              <input
                type="password"
                className="form-input pl-11"
                placeholder="••••••••"
                defaultValue="password"
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant" />
            </div>
          </div>

          <button type="submit" className="btn-admin w-full mt-4">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
