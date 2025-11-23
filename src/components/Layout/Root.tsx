import type { ReactNode } from "react";
import { fontVariable, inter } from "@/config/fonts";
import { PresenceProvider } from "@/providers/PresenceProvider";
import { ThemeProvider } from "./ThemeProvider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
