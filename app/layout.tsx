import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import NavigationBar from "@/components/shared/nav-bar";

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
  description: "A personal web app for Derick Hoskinson with a blog, curriculum vitae, and other resources.",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased` }
      >
        <ThemeProvider attribute="class">
          <NavigationBar />
          <main className="mx-auto mt-10 max-w-screen-lg px-4 py-10 md:py-20">
            { children }
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
