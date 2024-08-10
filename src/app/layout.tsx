import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import {
  SessionProvider,
  TanstackProvider,
  UiComponentsProvider,
} from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Give a Book",
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
        <Toaster position="top-right" closeButton />
        <TanstackProvider>
          <SessionProvider>
            <UiComponentsProvider>{children}</UiComponentsProvider>
          </SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
