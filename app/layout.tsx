import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavigationWrapper } from "@/components/navigation-wrapper";
import Script from "next/script";

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
  title: "Career Compass - Your AI Career Assistant",
  description: "An AI-powered platform to help you navigate your career path, improve your resume, and find the perfect job match.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA] min-h-screen`}
      >
        <NavigationWrapper />
        {children}
      </body>
    </html>
  );
}
