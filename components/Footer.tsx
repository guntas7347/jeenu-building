"use client";

import Link from "next/link";
import { Globe, MessageCircle, Share2 } from "lucide-react";

// 1. Define footer link categories dynamically
const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Support", href: "/contact" },
      { label: "Market Guide", href: "/guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

// 2. Define social links dynamically
const SOCIAL_LINKS = [
  { icon: Globe, href: "#", ariaLabel: "Website" },
  { icon: MessageCircle, href: "#", ariaLabel: "Chat" },
  { icon: Share2, href: "#", ariaLabel: "Share" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear(); // 3. Dynamic year

  return (
    <footer className="w-full border-t border-slate-200 mt-16 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Red Owl Homes
            </h2>
            <p className="font-body-md text-slate-500 dark:text-slate-400 mb-6">
              Redefining the real estate journey with transparency, luxury, and
              professional excellence. Find your place in the world.
            </p>
            <div className="flex gap-4">
              {/* 4. Map over social links using Lucide React icons */}
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-100 dark:border-slate-700"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* 5. Map over the dynamic footer link categories */}
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-4 hover:underline decoration-blue-600/30"
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

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400 opacity-80">
            © {currentYear} Red Owl Homes. Professional Real Estate Solutions.
          </p>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <Globe size={14} />
            <span className="font-label-sm">English (US)</span>
            <span className="mx-2 text-slate-200 dark:text-slate-700">|</span>
            <span className="font-label-sm">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
