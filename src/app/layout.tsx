"use client";
import { Inter } from "next/font/google";
import { SettingsProvider } from "@/hooks/settingsContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18Config";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <CssBaseline />
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
