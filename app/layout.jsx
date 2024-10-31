import { Livvic } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer"; // Importera footern
import NavbarSmall from "./components/navbar/NavbarSmall";
import NavbarLarge from "./components/navbar/NavbarLarge";
import SearchbarSmall from "./components/navbar/SearchbarSmall";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/AuthContextProvider";

const livvic = Livvic({
  subsets: ["latin"],
  variable: "--font-livvic",
  weight: ["100", "400", "700"],
});

export const metadata = {
  title: "Wanderwise",
  description: "Find your home away from home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${livvic.variable} antialiased flex flex-col min-h-screen bg-timberwolf`}
      >
        <AuthContextProvider>
          <Toaster />
          <NavbarLarge />
          <NavbarSmall />
          <SearchbarSmall />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
