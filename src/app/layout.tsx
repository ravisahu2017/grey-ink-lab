import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import CartDrawer from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grey Ink Lab",
  description: "Grey Ink Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CategoryProvider>
          <CartProvider>
            <NavBar />
            {children}
            <CartDrawer />
            <Footer />
          </CartProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
