"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    coverImage: "",
    categories: "",
  });
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (published: boolean) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          published,
          categories: formData.categories
            .split(",")
            .map((cat) => cat.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          alert("A post with this slug already exists");
        } else if (response.status === 400) {
          alert(`Validation error: ${data.error || "Invalid data"}`);
        } else {
          alert(data.error || "Failed to create post");
        }
        return;
      }

      // Success - navigate to the post
      router.push(`/post/${data.post.slug}`); // Fixed: data.post.slug, not data.slug
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Network error - please check your connection and try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMarkdown = (text: string) => {
    // Basic markdown rendering
    return text
      .replace(
        /^### (.*$)/gim,
        "<h3 class='text-2xl font-bold mt-6 mb-3'>$1</h3>"
      )
      .replace(
        /^## (.*$)/gim,
        "<h2 class='text-3xl font-bold mt-8 mb-4'>$1</h2>"
      )
      .replace(
        /^# (.*$)/gim,
        "<h1 class='text-4xl font-bold mt-10 mb-5'>$1</h1>"
      )
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(
        /!\[([^\]]+)\]\(([^)]+)\)/g,
        "<img src='$2' alt='$1' class='max-w-full h-auto rounded-lg my-4' />"
      )
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        "<a href='$2' class='text-blue-600 hover:underline'>$1</a>"
      )
      .replace(
        /`([^`]+)`/g,
        "<code class='bg-gray-100 px-2 py-1 rounded text-sm'>$1</code>"
      )
      .replace(
        /^\> (.+)$/gim,
        "<blockquote class='border-l-4 border-gray-300 pl-4 italic my-4'>$1</blockquote>"
      )
      .replace(/^\* (.+)$/gim, "<li class='ml-6'>$1</li>")
      .replace(/(<li.*<\/li>)/s, "<ul class='list-disc my-4'>$1</ul>")
      .replace(/\n\n/g, "</p><p class='mb-4'>")
      .replace(/^(?!<[h|u|b|l|i])/gim, "<p class='mb-4'>");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
        <p className="text-gray-600">Write your post using Markdown syntax</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="post-url-slug"
              required
            />
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium mb-2"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium mb-2"
            >
              Categories
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tech, programming, web (comma-separated)"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-sm font-medium">
                Content * (Markdown)
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {isPreview ? "Edit" : "Preview"}
              </button>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="# Your Post Title

Write your content here using **Markdown** syntax...

## Markdown Cheatsheet:
- **Bold**: **text**
- *Italic*: *text*
- `Code`: `code`
- [Link](url)
- ![Image](url)
- > Quote
- * List item"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={
                isSubmitting ||
                !formData.title ||
                !formData.slug ||
                !formData.content
              }
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={
                isSubmitting ||
                !formData.title ||
                !formData.slug ||
                !formData.content
              }
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Preview</h2>

            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <h1 className="text-3xl font-bold mb-4">
              {formData.title || "Your Post Title"}
            </h1>

            {formData.categories && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.categories.split(",").map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {cat.trim()}
                  </span>
                ))}
              </div>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: formData.content
                  ? renderMarkdown(formData.content)
                  : "<p class='text-gray-400'>Your content will appear here...</p>",
              }}
            />
          </div>
        </div>
      </div>

      {/* Markdown Help */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-3">Markdown Quick Reference:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded"># H1</code>
            <p className="text-gray-600 mt-1">Heading 1</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">**bold**</code>
            <p className="text-gray-600 mt-1">Bold text</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">*italic*</code>
            <p className="text-gray-600 mt-1">Italic text</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">`code`</code>
            <p className="text-gray-600 mt-1">Inline code</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">[link](url)</code>
            <p className="text-gray-600 mt-1">Hyperlink</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">![alt](url)</code>
            <p className="text-gray-600 mt-1">Image</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">&gt; quote</code>
            <p className="text-gray-600 mt-1">Blockquote</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">* item</code>
            <p className="text-gray-600 mt-1">List item</p>
          </div>
        </div>
      </div>
    </div>
  );
}
