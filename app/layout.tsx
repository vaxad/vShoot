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
      <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin=""/>
     <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin=""></script>
      </head>
      <body className={" min-h-screen overflow-x-hidden"}>
        <AuthProvider>
        <Navbar />
        {/* <AuthCheckr /> */}
        <Bg/>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
