import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import AuthCheckr from "./components/AuthCheckr";
import Bg from "./auth/components/Bg";
import AuthProvider from "@/lib/context/AuthProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vShoot",
  description: "Home for creative minds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={" min-h-screen overflow-x-hidden"}>
        <AuthProvider>
        <Navbar />
        <AuthCheckr />
        <Bg/>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
