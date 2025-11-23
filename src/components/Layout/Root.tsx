import type { ReactNode } from "react";
import { fontVariable, inter } from "@/config/fonts";
import { PresenceProvider } from "@/providers/PresenceProvider";
import { ThemeProvider } from "./ThemeProvider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontVariable} ${inter.className} font-sans antialiased`}
      >
        <ThemeProvider>
          <PresenceProvider>{children}</PresenceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
