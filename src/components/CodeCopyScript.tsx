"use client";

import { useEffect } from "react";

export function CodeCopyScript() {
  useEffect(() => {
    const addCopyButtons = () => {
      document.querySelectorAll("pre").forEach((block) => {
        // Skip if button already exists
        if (block.querySelector(".code-copy-btn")) return;

        const button = document.createElement("button");
        button.className = "code-copy-btn";
        button.setAttribute("aria-label", "Copy code to clipboard");
        button.setAttribute("type", "button");

        // SVG icons for copy and checkmark
        const copyIcon = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;

        const checkIcon = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        button.innerHTML = copyIcon;

        button.onclick = async () => {
          const code = block.querySelector("code")?.textContent;
          if (!code) return;

          try {
            await navigator.clipboard.writeText(code);

            // Show success feedback
            button.innerHTML = checkIcon;
            button.classList.add("copied");

            setTimeout(() => {
              button.innerHTML = copyIcon;
              button.classList.remove("copied");
            }, 2000);
          } catch (err) {
            console.error("Failed to copy code:", err);
          }
        };

        block.appendChild(button);
      });
    };

    // Run initially
    addCopyButtons();

    // Re-run if content changes (e.g., dynamic loading)
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
