import prisma from "./prisma";

export const posts = await prisma.post.findMany({
  where: { published: true },
  select: { id: true, title: true, slug: true },
});
