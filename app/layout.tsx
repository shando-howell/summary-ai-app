import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Gist",
  description: "Summary AI SAAS App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body>
          <div className="relative flex min-h-screen flex-col">
            <Header />
              <main className="flex-1">
                {children}
              </main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
