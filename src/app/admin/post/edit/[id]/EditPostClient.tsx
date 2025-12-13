"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  categories: string;
  expectedReadTime: number | "";
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Post = {
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  categories: Category[];
  expectedReadTime: number | null;
};

export default function EditPostClient({ id }: { id: number }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    title: "",
    slug: "",
    content: "",
    coverImage: "",
    categories: "",
    expectedReadTime: "",
  });

  // ✅ FETCH POST (GET)
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
      try {
        const res = await fetch(`/api/post/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setError("Post not found");
          setInitialLoading(false);
          return;
        }

        const { post }: { post: Post } = await res.json();

        setForm({
          title: post.title,
          slug: post.slug,
          content: post.content,
          coverImage: post.coverImage ?? "",
          categories: post.categories.map((c) => c.name).join(", "),

          expectedReadTime: post.expectedReadTime ?? "",
        });

        setInitialLoading(false);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Network error");
          setInitialLoading(false);
        }
      }
    }

    fetchPost();
    return () => controller.abort();
  }, [id]);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "expectedReadTime" ? Number(value) || "" : value,
    }));
  }

  // ✅ UPDATE POST (PUT)
  async function submit(published: boolean) {
    if (!form.title || !form.slug || !form.content) {
      setError("Title, slug, and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          expectedReadTime: form.expectedReadTime || null,
          categories: form.categories
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
          published,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to update post");
        setLoading(false);
        return;
      }

      router.push(`/post/${data.post.slug}`);
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-sm text-neutral-500">
        Loading post…
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-12 border-b border-black/10 pb-6">
        <p className="text-[11px] font-mono tracking-widest text-neutral-500">
          ADMIN • EDIT • {id}
        </p>
        <h1 className="text-[28px] font-medium tracking-tight">Edit Post</h1>
      </header>

      {error && <div className="mb-6 text-sm text-red-600">{error}</div>}

      <div className="space-y-8">
        <Field label="Title">
          <input
            name="title"
            value={form.title}
            onChange={updateField}
            className="input"
          />
        </Field>

        <Field label="Slug">
          <input
            name="slug"
            value={form.slug}
            onChange={updateField}
            className="input font-mono"
          />
        </Field>

        <Field label="Cover Image">
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={updateField}
            className="input"
          />
        </Field>

        <Field label="Categories">
          <input
            name="categories"
            value={form.categories}
            onChange={updateField}
            className="input"
          />
        </Field>

        <Field label="Read Time (minutes)">
          <input
            type="number"
            name="expectedReadTime"
            value={form.expectedReadTime}
            onChange={updateField}
            className="input"
            min={1}
          />
        </Field>

        <Field label="Content (Markdown)">
          <textarea
            name="content"
            rows={18}
            value={form.content}
            onChange={updateField}
            className="textarea font-mono"
          />
        </Field>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => submit(false)}
            className="btn-secondary"
            disabled={loading}
          >
            Save Draft
          </button>

          <button
            onClick={() => submit(true)}
            className="btn-primary"
            disabled={loading}
          >
            Update & Publish
          </button>
        </div>
      </div>
    </div>
  );
}

/* Field helper */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
