"use client"; // Add this at the top

import { Livvic } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import NavbarSmall from "./components/navbar/NavbarSmall";
import NavbarLarge from "./components/navbar/NavbarLarge";
import SearchbarSmall from "./components/navbar/SearchbarSmall";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/AuthContextProvider";
import { usePathname } from "next/navigation"; // Import usePathname
import LogoSmall from "./components/navbar/LogoSmall";
import { BookingProvider } from "./context/BookingContext";
import { SearchProvider } from "./context/SearchContext";

const livvic = Livvic({
  subsets: ["latin"],
  variable: "--font-livvic",
  weight: ["100", "400", "700"],
});

// export const metadata = {
//   title: "Wanderwise",
//   description: "Find your home away from home",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  return (
    <html lang="en">
      <body
        className={`${livvic.variable} antialiased flex flex-col min-h-screen bg-timberwolf`}
      >
        <AuthContextProvider>
          <SearchProvider>
            <BookingProvider>
              <Toaster />
              <NavbarLarge />
              <NavbarSmall />
              {pathname === "/" ? <SearchbarSmall /> : <LogoSmall />}{" "}
              {/* Conditionally render */}
              <main className="flex-grow">{children}</main>
              <Footer />
            </BookingProvider>
          </SearchProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
