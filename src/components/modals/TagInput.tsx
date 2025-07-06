import { useEffect, useRef } from "react";

interface TagInputProps {
  hiddenInputRef: React.RefObject<HTMLInputElement | null>;
  initialTags?: string[];
}

export function TagInput({ hiddenInputRef, initialTags = [] }: TagInputProps) {
  const tagsInputRef = useRef<HTMLInputElement | null>(null);
  const tagsListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tagsInput = tagsInputRef.current;
    const tagsList = tagsListRef.current;
    const hiddenInput = hiddenInputRef.current;

    if (!tagsInput || !tagsList || !hiddenInput) return;

    const updateHiddenInput = () => {
      const tagElements = tagsList.querySelectorAll(".tag");
      const tags = Array.from(tagElements)
        .map((tag) => tag.textContent?.replace("×", "").trim() || "")
        .filter((tag) => tag.length > 0);
      hiddenInput.value = tags.join(",");
    };

    const createTagElement = (tagText: string) => {
      const tagDiv = document.createElement("div");
      tagDiv.className =
        "flex justify-center items-center bg-gray-300 capitalize rounded-full px-2 py-1 gap-2 tag";
      tagDiv.innerHTML = `
        ${tagText}
        <span class="tag-remove cursor-pointer font-bold">×</span>
      `;
      tagDiv.querySelector(".tag-remove")?.addEventListener("click", () => {
        tagDiv.remove();
        updateHiddenInput();
      });
      tagsList.appendChild(tagDiv);
    };

    // Render tags si es edición
    tagsList.innerHTML = "";
    initialTags.forEach((tag) => createTagElement(tag));
    updateHiddenInput();

    const handleAddTag = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const tagText = tagsInput.value.trim().replace(",", "");
        if (tagText) {
          createTagElement(tagText);
          tagsInput.value = "";
          updateHiddenInput();
        }
      }
    };

    tagsInput.addEventListener("keydown", handleAddTag);

    return () => {
      tagsInput.removeEventListener("keydown", handleAddTag);
    };
  }, [hiddenInputRef, initialTags]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        name="tags"
        id="tags-input"
        placeholder="Escribe un tag y presiona 'Enter' o una coma."
        className="shadow border rounded w-full py-2 px-3"
        ref={tagsInputRef}
      />
      <div id="tags-list" className="flex gap-2 flex-wrap" ref={tagsListRef}></div>
      <input type="hidden" name="tags" id="tags" ref={hiddenInputRef} />
    </div>
  );
}
