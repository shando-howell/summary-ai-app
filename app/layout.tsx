import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summary AI",
  description: "Summary AI SAAS App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
