import type { Metadata } from "next";
import { Inter, Orbitron, Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/language-context";
import FontApplier from "@/components/FontApplier";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const kantumruy = Kantumruy_Pro({ subsets: ["khmer", "latin"], weight: ["300", "400", "500", "700"], variable: "--font-kantumruy" });

export const metadata: Metadata = {
  title: "USEA Career Center – Siem Reap, Cambodia",
  description: "Find jobs, attend events, and build your career with USEA Career Center in Siem Reap, Cambodia.",
};

// Runs before React hydrates so there's no flash of the wrong theme.
const noFlashScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("usea-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${kantumruy.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-screen flex flex-col neon-bg font-sans" style={{ fontFamily: "var(--active-font)" }} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <FontApplier />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
