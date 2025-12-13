"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TextAlignStart } from "lucide-react";

type SearchItem = {
  id: number;
  title: string;
  slug: string;
};

export function SearchCommand({ posts }: { posts: SearchItem[] }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // ⌘K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <CommandInput placeholder="Search posts…" />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Posts">
          {posts.map((post) => (
            <CommandItem
              key={post.id}
              value={post.title} // 🔥 THIS is what gets searched
              onSelect={() => {
                router.push(`/post/${post.slug}`);
                setOpen(false);
              }}
            >
              <TextAlignStart /> {post.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Pages">
          <CommandItem
            value="About"
            onSelect={() => {
              router.push("/about");
              setOpen(false);
            }}
          >
            About
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
