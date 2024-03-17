import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  SessionProvider,
  TanstackProvider,
  FilterBooksProvider,
  UiComponentsProvider,
} from "@/libs/providers";

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
          <SessionProvider>
            <FilterBooksProvider>
              <UiComponentsProvider>{children}</UiComponentsProvider>
            </FilterBooksProvider>
          </SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
