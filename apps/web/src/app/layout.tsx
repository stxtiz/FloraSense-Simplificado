import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FloraSense IoT",
  description: "Sistema vivo entre tierra, agua y datos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${instrumentSerif.variable} ${manrope.variable} ${plexMono.variable} antialiased h-full`}>
      <body className="font-sans text-ink bg-canvas min-h-full flex flex-col selection:bg-water-soft selection:text-ink">
        {children}
      </body>
    </html>
  );
}
