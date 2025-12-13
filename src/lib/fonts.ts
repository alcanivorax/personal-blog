// import { GeistMono } from "geist/font/mono";
// import { IBM_Plex_Sans as FontSans } from "next/font/google";

// export const fontSans = FontSans({
//   weight: ["400", "500", "600"],
//   display: "swap",
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const geistMono = GeistMono;
import { Inter, JetBrains_Mono } from "next/font/google";

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
