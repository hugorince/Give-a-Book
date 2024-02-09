import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/libs/auth/session-provider";
import TanstackProvider from "@/libs/providers/tanstack-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Give A Book",
  description: "by pingozoo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <SessionProvider>{children}</SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
