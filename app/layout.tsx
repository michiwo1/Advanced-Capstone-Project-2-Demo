import type { Metadata } from "next";
import { Inter, Inter as InterDisplay } from "next/font/google";
import "./globals.css";
import { NavigationWrapper } from "@/components/navigation-wrapper";
import Script from "next/script";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interDisplay = InterDisplay({
  subsets: ['latin'],
  variable: '--font-inter-display',
  display: 'swap',
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
        className={`${inter.variable} ${interDisplay.variable} antialiased bg-[#FAFAFA] min-h-screen font-sans`}
      >
        <NavigationWrapper />
        {children}
      </body>
    </html>
  );
}
