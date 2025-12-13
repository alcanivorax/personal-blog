import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { mono } from "@/lib/fonts";
import { sans } from "@/lib/fonts";
import { SearchCommand } from "@/components/SearchCommand";
import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { id: true, title: true, slug: true },
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mono.variable} ${sans.variable} antialiased bg-stone-100 dark:bg-black transition-colors`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <SearchCommand posts={posts} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
