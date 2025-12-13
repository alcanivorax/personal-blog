import { Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  title: string;
  readTime: number | null;
  slug: string;
  coverImage: string | null;
};

export function PostCard({ title, readTime, slug, coverImage }: PostCardProps) {
  return (
    <Link
      href={`/post/${slug}`}
      className="
        group relative block overflow-hidden transition-colors
        border border-black/20 bg-white hover:bg-neutral-50
        dark:border-white/15 dark:bg-neutral-950 dark:hover:bg-neutral-900
      "
    >
      {/* Vertical Side Lines */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-black/10 dark:bg-white/10" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-black/10 dark:bg-white/10" />

      {/* Side Label */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-90">
        <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
          MODULE • {slug}
        </span>
      </div>

      {/* Header Row */}
      <div
        className="
          flex justify-between items-center px-4 py-2
          border-b border-black/15 bg-neutral-50/30
          dark:border-white/15 dark:bg-neutral-900/40
        "
      >
        <span className="text-[10px] font-mono tracking-wider text-neutral-600 dark:text-neutral-400">
          SECTION 01.{Math.floor(Math.random() * 90)}
        </span>
        <span className="text-[10px] font-mono tracking-wider text-neutral-600 dark:text-neutral-400">
          {readTime} MIN
        </span>
      </div>

      {/* Image */}
      <div className="aspect-[4/3] border-b border-black/15 dark:border-white/15 relative overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="
              object-cover grayscale-50 group-hover:grayscale-25
              transition-all duration-500
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 text-xs font-mono tracking-wider">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Title Block */}
      <div className="px-4 py-6">
        <p className="text-[10px] font-mono mb-3 tracking-wider text-neutral-500 dark:text-neutral-400">
          SPECIFICATION ENTRY
        </p>

        <h2
          className="
            text-[18px] font-medium leading-tight tracking-tight
            text-neutral-900 group-hover:translate-x-[2px]
            transition-transform
            dark:text-neutral-100
          "
        >
          {title}
        </h2>
      </div>
    </Link>
  );
}
