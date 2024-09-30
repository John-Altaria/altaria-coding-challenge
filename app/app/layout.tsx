import "./globals.css";
import "@/public/assets/css/bootstrap.css";
import "@/public/assets/css/login-register.css";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Location Tracker - John",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
        />
      </head>
      <body className={poppins.className}>
        {children}
        <Toaster reverseOrder position="top-left" />
      </body>
    </html>
  );
}
