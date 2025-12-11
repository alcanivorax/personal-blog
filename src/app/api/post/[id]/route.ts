import prisma from "@/lib/prisma";
import { postUpdateSchema } from "@/schema/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const id = Number(idString);

    // Validate the number
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validation = postUpdateSchema.safeParse(body);
    console.log("THIS IS BODY: ", body);
    console.log("THIS IS VALIDATION: ", validation);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      content,
      coverImage,
      published,
      categories,
      expectedReadTime,
    } = validation.data;

    const updatedPost = await prisma.post.update({
      where: { id }, // ✅ Now using the NUMBER variable, not the string
      data: {
        title,
        slug,
        content,
        coverImage,
        published,
        expectedReadTime,

        categories: categories
          ? {
              set: [],
              connectOrCreate: categories.map((name: string) => {
                const slug = name
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");

                return {
                  where: { slug },
                  create: { name, slug },
                };
              }),
            }
          : undefined,
      },
      include: { categories: true },
    });
    console.log("Thisis updated post: ", updatedPost);
    return NextResponse.json(
      { message: "Post updated successfully", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }
    }

    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const id = Number(idString);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const deleted = await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Post deleted successfully", post: deleted },
      { status: 200 }
    );
  } catch (error: any) {
    // Prisma throws when record doesn't exist
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Server error deleting post" },
      { status: 500 }
    );
  }
}
