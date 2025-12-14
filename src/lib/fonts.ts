import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const retro = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});
