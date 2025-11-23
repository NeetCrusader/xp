import "./globals.css";
import RootLayout from "@/components/Layout/Root";
import { metadata } from "@/config/metadata";

export { metadata };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
