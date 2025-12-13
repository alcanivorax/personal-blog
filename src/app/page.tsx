import { PostCard } from "@/components/layout/PostCard";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      coverImage: true,
      createdAt: true,
      expectedReadTime: true,
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <div
      className="
    relative max-w-7xl mx-auto px-8 py-24 bg-grid
    dark:bg-neutral-950
  "
    >
      {/* Page Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-[-1] grid grid-cols-12 gap-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="border-l border-black/5 dark:border-white/5"
          />
        ))}
      </div>

      {/* Page Header */}
      <div className="mb-24 border-b border-black/15 dark:border-white/15 pb-6">
        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          INDEX • 001
        </p>
        <h2 className="text-[34px] leading-none tracking-tight text-neutral-900 dark:text-neutral-100">
          Latest Posts
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            readTime={post.expectedReadTime}
            slug={post.slug}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </div>
  );
}
