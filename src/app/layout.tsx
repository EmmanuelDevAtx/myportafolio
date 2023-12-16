"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/hooks/settingsContext";
import { I18nextProvider } from "react-i18next";
import i18n from '../i18n/i18Config';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
