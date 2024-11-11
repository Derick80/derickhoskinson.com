import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import NavigationBar from "@/components/shared/nav-bar";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from 'react-hot-toast';

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
        className={ `${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col gap-20 antialiased` }
      >
        {/* <Analytics /> */ }
        <ThemeProvider attribute="class">
          <Toaster />

          <div className="min-h- flex flex-col gap-10 space-y-10">
            <NavigationBar />

            <main className="container relative mx-auto flex-grow px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              { children }
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
