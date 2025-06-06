import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookIcon } from "@primer/octicons-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | BookSearch",
    default: "BookSearch",
  },
  description: "Tan Shao Yun",
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
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost normal-case text-xl">
              <BookIcon size={24} />
              BookSearch
            </a>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
