import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import NavigationBar from "@/components/shared/nav-bar";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Derick Hoskinson's Personal Website",
  description:
    "A personal web app for Derick Hoskinson with a blog, curriculum vitae, and other resources.",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={ `${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased` }
      >
        {/* <Analytics /> */ }
        <ThemeProvider attribute="class">
          <div className="flex flex-col min-h-screen">
            <NavigationBar />

            <main className="relative flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-3xl">
              { children }</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


