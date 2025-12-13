import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { CodeCopyScript } from "@/components/CodeCopyScript";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  // Markdown → HTML
  const html = await markdownToHtml(post.content);

  return (
    <div className="relative max-w-5xl mx-auto px-8 py-24 dark:text-neutral-100">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-grid pointer-events-none" />

      {/* Blueprint corner marks */}
      <CornerMarks />

      {/* Side marginalia */}
      <div className="hidden lg:block absolute left-0 top-40 -translate-x-20 rotate-90">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
          DOCUMENT REF • {post.slug}
        </span>
      </div>

      {/* Header */}
      <header className="mb-24 border-b border-black/10 dark:border-white/15 pb-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
          SECTION • 01.00 – TECHNICAL REPORT
        </p>

        <h1 className="text-[42px] leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-8 text-[12px] font-mono text-neutral-500 dark:text-neutral-400">
          <span>DATE • {post.createdAt.toISOString().slice(0, 10)}</span>
          <span>READ • {post.expectedReadTime} MIN</span>
          <span>ID • {post.slug.toUpperCase()}</span>
        </div>
      </header>

      {/* Cover */}
      {post.coverImage && (
        <div className="mb-20 border border-black/10 dark:border-white/15 relative">
          <img
            src={post.coverImage}
            className="w-full object-cover grayscale-50 hover:grayscale-25 transition duration-500"
          />

          <div className="absolute top-2 left-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm px-2 py-[2px] text-[10px] font-mono tracking-wider border border-black/10 dark:border-white/15">
            FIGURE 1.0
          </div>
        </div>
      )}

      {/* Content */}
      <article className="relative">
        {/* Right notes */}
        <aside className="hidden lg:block absolute right-0 top-0 -mr-24 w-32 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-wider">
          <p>NOTES</p>
          {/* <p className="mt-6 opacity-80">
            Check alignment with grid structure. Review semantic rhythm. Verify
            typographic hierarchy.
          </p> */}
        </aside>

        {/* Prose */}
        <div
          className="
            prose prose-neutral max-w-none
            dark:prose-invert

            prose-p:text-[17px] prose-p:leading-[1.75]
            prose-img:border prose-img:border-black/10 dark:prose-img:border-white/15
            prose-img:my-12

            prose-h2:text-[28px] prose-h2:font-medium prose-h2:tracking-tight
            prose-h3:text-[20px] prose-h3:font-medium
          "
          dangerouslySetInnerHTML={{
            __html: numberParagraphs(html),
          }}
        />
      </article>

      {/* Footer */}
      <footer className="mt-24 pt-6 border-t border-black/10 dark:border-white/15 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest">
        END OF DOCUMENT • {post.slug.toUpperCase()}
      </footer>

      {/* Copy button injector */}
      <CodeCopyScript />
    </div>
  );
}

/* Paragraph numbering */
function numberParagraphs(html: string) {
  return html
    .split("</p>")
    .map((p, i) =>
      p.trim()
        ? `<p><span class="paragraph-marker">${String(i + 1).padStart(
            2,
            "0"
          )}.</span> ${p}</p>`
        : ""
    )
    .join("");
}

/* Corner marks */
function CornerMarks() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-black/20 dark:border-white/20" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-black/20 dark:border-white/20" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-black/20 dark:border-white/20" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-black/20 dark:border-white/20" />
    </div>
  );
}
