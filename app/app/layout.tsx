import type { Metadata } from "next";
import "./globals.css";
import "@/public/assets/css/bootstrap.css";
import "@/public/assets/css/login-register.css";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Location Tracker",
  description: "See events close to you",
};
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
