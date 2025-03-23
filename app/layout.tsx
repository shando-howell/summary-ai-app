import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export const metadata: Metadata = {
  title: "SomeUp",
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
        <div className="relative flex min-h-screen flex-col">
          <Header />
            <main className="flex-1">
              {children}
            </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
