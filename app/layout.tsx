import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Red Owl Homes",
  description:
    "Curating extraordinary living spaces for the world's most discerning individuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-on-background transition-colors duration-300">
        <Providers>
          {" "}
          <div className="sticky top-0 w-full bg-red-600 uppercase text-white text-sm py-2 px-4 z-10000 text-center">
            This website is currently under development. Contact:
            admin@rohomes.com.au
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
