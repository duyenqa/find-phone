import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { Playfair_Display } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
})

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
      </head>
      <body className={playfair_display.className}>
        <ThemeProvider>
         <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
        />
      </body>
    </html>
  );
}
