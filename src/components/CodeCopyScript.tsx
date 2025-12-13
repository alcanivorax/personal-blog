"use client";

import { useEffect } from "react";

export function CodeCopyScript() {
  useEffect(() => {
    document.querySelectorAll("pre").forEach((block) => {
      if (block.querySelector(".code-copy-btn")) return;

      const button = document.createElement("button");
      button.className = "code-copy-btn";
      button.setAttribute("aria-label", "Copy code");

      button.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;

      button.onclick = async () => {
        const code = block.querySelector("code")?.textContent;
        if (!code) return;

        await navigator.clipboard.writeText(code);

        button.classList.add("copied");
        setTimeout(() => button.classList.remove("copied"), 400);
      };

      block.appendChild(button);
    });
  }, []);

  return null;
}
