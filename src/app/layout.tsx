import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "Zophix",
  description: "Mobile hospital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={` ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
                    <NextTopLoader />

            {children}
          </ThemeProvider>
          <Toaster theme="light" richColors position="top-right" />
          <SpeedInsights />
        </body>
      </AuthProvider>
    </html>
  );
}
