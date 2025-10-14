import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find Phone",
  description: "Chào mừng bạn đến với trang chủ của Find Phone.",
  keywords: ["nextjs", "metadata", "seo", "web development"],
  openGraph: {
    title: "Tìm số điện thoại",
    description: "Khám phá tìm thông tin số điện thoại rác cần tìm",
    url: "https://find-phone-sigma.vercel.app/",
    siteName: "Tìm số điện thoại",
    images: [
      {
        url: "https://find-phone-sigma.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "logo find phone spam"
      },
    ],
    locale: "vi_VN",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
         <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
