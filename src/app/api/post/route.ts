import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { postCreateSchema } from "@/schema/postSchema";

// Improved slugify function
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
};

// Helper to generate unique slug if conflict exists
async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = postCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const {
      title,
      slug: providedSlug,
      content,
      coverImage,
      published,
      categories,
      expectedReadTime,
    } = validation.data;

    // Generate unique slug if conflict exists
    const slug = await generateUniqueSlug(providedSlug);

    // Warn if slug was modified
    const slugWasModified = slug !== providedSlug;

    // Create post with category slugification
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage: coverImage || null,
        published: published ?? false,
        expectedReadTime: expectedReadTime ?? null,

        categories: categories?.length
          ? {
              connectOrCreate: categories.map((name: string) => {
                const categorySlug = slugify(name);

                // Validate generated slug isn't empty
                if (!categorySlug) {
                  throw new Error(`Invalid category name: "${name}"`);
                }

                return {
                  where: { slug: categorySlug },
                  create: {
                    name: name.trim(),
                    slug: categorySlug,
                  },
                };
              }),
            }
          : undefined,
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
        ...(slugWasModified && {
          warning: `Slug was modified to "${slug}" to avoid conflicts`,
        }),
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle Prisma-specific errors
    if (error && typeof error === "object" && "code" in error) {
      // Unique constraint violation (shouldn't happen with our logic, but just in case)
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }

      // Foreign key constraint violation
      if (error.code === "P2003") {
        return NextResponse.json(
          { error: "Invalid reference to related data" },
          { status: 400 }
        );
      }
    }

    // Handle custom validation errors
    if (error instanceof Error && error.message.includes("Invalid category")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Failed to create post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
