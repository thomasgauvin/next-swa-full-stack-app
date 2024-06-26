import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto flex bg-white min-h-screen p-2">
            <div className="w-1/4 border-r-2 border-gray-100">
              <Navbar />
            </div>

            <div className="w-3/4 ml-4">  
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
