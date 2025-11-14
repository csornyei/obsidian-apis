import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MIMIR",
  description: "Self-hosted AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
          <main
            style={{
              height: "90vh",
            }}
            className="flex w-7/8 flex-col items-center justify-between rounded-b-lg bg-zinc-200 p-8 text-zinc-900 shadow-lg dark:bg-zinc-800 dark:text-zinc-100"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
