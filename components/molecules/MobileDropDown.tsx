import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Category, Product } from "@/types/models";
import { MobileItem } from "@/components/organisms/CategorySection"

export default function MobileDropdown({
  root,
  onSelect,
  allCategories,
}: {
  root: Category[];
  onSelect: (categoryId: string | null) => void;
  allCategories: Category[];
}) {
  const [show, setShow] = useState(false);

  const handleSelect = (categoryId: string | null) => {
    onSelect(categoryId);
    setShow(false); // Close dropdown after selection
  };

  return (
    <>
      <button
        onClick={() => setShow((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-3 font-medium text-gray-800 shadow-sm"
      >
        <span>Select category</span>
        {show ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {show && (
        <ul className="absolute mt-3 w-full max-h-[300px] overflow-y-auto rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-md z-10 space-y-1">
          {/* All Categories option */}
          <li>
            <button
              onClick={() => handleSelect(null)}
              className="w-full text-left block py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 font-medium"
            >
              All Categories
            </button>
          </li>

          {/* Category tree */}
          {root.map((cat) => (
            <MobileItem
              key={cat.id}
              cat={cat}
              depth={0}
              onSelect={handleSelect}
              allCategories={allCategories}
            />
          ))}
        </ul>
      )}
    </>
  );
}