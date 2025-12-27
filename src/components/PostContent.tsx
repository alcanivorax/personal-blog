"use client";
import { cn } from "@/lib/utils";

export function PostContent({ post, html }: { post: any; html: string }) {
  return (
    <article className="relative">
      {/* Right notes */}
      <aside className="hidden lg:block absolute right-0 top-0 -mr-24 w-32 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-wider">
        <p>NOTES</p>
      </aside>

      {/* Prose content */}
      <div className="py-5">
        <div
          className={cn(
            "max-w-none",

            // Paragraphs
            "[&>p]:text-[17px] [&>p]:leading-[1.75] [&>p]:mb-6",
            "[&>p]:text-neutral-700 dark:[&>p]:text-neutral-300",

            // Headings
            "[&>h1]:text-[36px] [&>h1]:font-bold [&>h1]:tracking-tight",
            "[&>h1]:mt-16 [&>h1]:mb-8",
            "[&>h1]:text-neutral-900 dark:[&>h1]:text-neutral-100",

            "[&>h2]:text-[28px] [&>h2]:font-semibold [&>h2]:tracking-tight",
            "[&>h2]:mt-12 [&>h2]:mb-6",
            "[&>h2]:text-neutral-900 dark:[&>h2]:text-neutral-100",

            "[&>h3]:text-[22px] [&>h3]:font-medium",
            "[&>h3]:mt-10 [&>h3]:mb-4",
            "[&>h3]:text-neutral-900 dark:[&>h3]:text-neutral-100",

            "[&>h4]:text-[18px] [&>h4]:font-medium",
            "[&>h4]:mt-8 [&>h4]:mb-3",
            "[&>h4]:text-neutral-900 dark:[&>h4]:text-neutral-100",

            // Code blocks
            "[&>pre]:bg-neutral-900 dark:[&>pre]:bg-neutral-950",
            "[&>pre]:py-4 [&>pre]:px-1 [&>pre]:rounded-sm [&>pre]:my-8",
            "[&>pre]:overflow-x-auto [&>pre]:border",
            "[&>pre]:border-neutral-800 dark:[&>pre]:border-neutral-700",

            "[&>pre>code]:bg-transparent [&>pre>code]:p-0",
            "[&>pre>code]:text-neutral-100 [&>pre>code]:text-sm",

            // Inline code
            "[&>:not(pre)>code]:bg-neutral-100 dark:[&>:not(pre)>code]:bg-neutral-800",
            "[&>:not(pre)>code]:text-neutral-900 dark:[&>:not(pre)>code]:text-neutral-100",
            "[&>:not(pre)>code]:px-1.5 [&>:not(pre)>code]:py-0.5 [&>:not(pre)>code]:rounded",
            "[&>:not(pre)>code]:text-[15px] ",

            // Links
            "[&>a]:text-blue-600 dark:[&>a]:text-blue-400",
            "[&>a]:underline [&>a]:decoration-blue-300 dark:[&>a]:decoration-blue-600",
            "[&>a]:underline-offset-2",
            "hover:[&>a]:decoration-blue-600 dark:hover:[&>a]:decoration-blue-400",
            "[&>a]:transition-colors",

            // Lists
            "[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-6",
            "[&>ul]:text-neutral-700 dark:[&>ul]:text-neutral-300",

            "[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-6",
            "[&>ol]:text-neutral-700 dark:[&>ol]:text-neutral-300",

            "[&>li]:mb-2 [&>li]:leading-[1.75]",

            // Blockquotes
            "[&>blockquote]:border-l-4",
            "[&>blockquote]:border-neutral-300 dark:[&>blockquote]:border-neutral-600",
            "[&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:italic [&>blockquote]:my-8",
            "[&>blockquote]:text-neutral-600 dark:[&>blockquote]:text-neutral-400",

            // Horizontal rules
            "[&>hr]:border-neutral-200 dark:[&>hr]:border-neutral-800 [&>hr]:my-12",

            // Tables
            "[&>table]:w-full [&>table]:my-8 [&>table]:border-collapse",
            "[&>table>thead]:border-b-2",
            "[&>table>thead]:border-neutral-300 dark:[&>table>thead]:border-neutral-700",
            "[&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:text-left",
            "[&>table>thead>tr>th]:font-semibold",
            "[&>table>thead>tr>th]:text-neutral-900 dark:[&>table>thead>tr>th]:text-neutral-100",
            "[&>table>tbody>tr]:border-b",
            "[&>table>tbody>tr]:border-neutral-200 dark:[&>table>tbody>tr]:border-neutral-800",
            "[&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-3",
            "[&>table>tbody>tr>td]:text-neutral-700 dark:[&>table>tbody>tr>td]:text-neutral-300",

            // Images
            "[&>img]:rounded-lg [&>img]:my-12 [&>img]:border",
            "[&>img]:border-neutral-200 dark:[&>img]:border-neutral-800"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
