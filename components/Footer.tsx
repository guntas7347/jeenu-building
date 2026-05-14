"use client";

import Link from "next/link";
import { Globe, MessageCircle, Phone } from "lucide-react";
import { CONTACT_NUMBER } from "@/lib/config";

const FOOTER_LINKS = [
  {
    title: "Legal",
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
  },
];

const SOCIAL_LINKS = [
  {
    icon: Phone,
    href: `tel:${CONTACT_NUMBER}`,
    ariaLabel: "Call",
  },
  {
    icon: MessageCircle,
    href: `https://wa.me/61${CONTACT_NUMBER}?text=Hi%2C%20I%20saw%20your%20new%20build%20listings%20on%20rohomes.com.au.`,
    ariaLabel: "WhatsApp",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative mt-24">
      {/* Optional: Subtle background glow for the glass to catch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="liquid-glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 relative z-10">
            <div className="max-w-md">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Red Owl Homes
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                Quality home builds, dual key homes, and duplex opportunities
                across Australia—delivered with trust and transparency.
              </p>

              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      aria-label={social.ariaLabel}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 hover:scale-110 active:scale-95 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm backdrop-blur-md"
                    >
                      <Icon size={20} />
                    </Link>
                  );
                })}
                <Link
                  href="https://www.instagram.com/rohomes.com.au/"
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 hover:scale-110 active:scale-95 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm backdrop-blur-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 md:gap-24">
              {FOOTER_LINKS.map((section) => (
                <div key={section.title}>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              © {currentYear} Red Owl Homes. Connecting Australians with Quality
              Builds.
            </p>

            <div className="flex items-center gap-6 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Globe size={12} />
                <span>English</span>
              </div>
              <div className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                AUD ($)
              </div>
            </div>
          </div>

          {/* Liquid Refraction Background Detail */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
