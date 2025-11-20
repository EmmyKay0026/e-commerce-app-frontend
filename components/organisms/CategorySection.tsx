// Updated CategoryExplorer with adapted UI design

import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCards";
import type { Category, Product } from "@/types/models";
import { preloadCategoryMaps } from "@/services/preloadCategories";
import {
  getAllCategories,
  listProductsByCategory,
} from "@/services/categoryService";
import MobileDropdown from "@/components/molecules/MobileDropDown";

// Preload slug → ID map
await preloadCategoryMaps();

// Fetch all categories
const allCategories: Category[] = await getAllCategories();

// Build tree using child_categories: string[]
function buildCategoryTree(categories: Category[]): Category[] {
  const map = new Map<string, Category>();
  const roots: Category[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat });
  });

  categories.forEach((cat) => {
    const current = map.get(cat.id)!;

    if (!cat.parent_category_id || cat.parent_category_id.length === 0) {
      roots.push(current);
      return;
    }

    let attached = false;
    for (const parentId of cat.parent_category_id) {
      if (map.has(parentId)) {
        const parent = map.get(parentId)!;
        if (!parent.child_categories) parent.child_categories = [];
        if (!parent.child_categories.includes(cat.id)) {
          parent.child_categories.push(cat.id);
        }
        attached = true;
      }
    }

    if (!attached) roots.push(current);
  });

  return roots;
}

const rootCategories = buildCategoryTree(allCategories);
const defaultCategory = rootCategories[0] || allCategories[0];
const selectedCategoryId = defaultCategory?.id;

// Fetch initial products
const productsResult = await listProductsByCategory(selectedCategoryId!, {
  limit: 12,
});
const products: Product[] = productsResult.success
  ? productsResult.data?.products || []
  : [];

// Recursive desktop item
function CategoryTreeItem({ category }: { category: Category }) {
  const hasChildren = category.child_categories?.length;
  const isSelected = category.id === selectedCategoryId;

  return (
    <li>
      <Link
        href={`/category/${category.slug}`}
        className={`block py-2 px-3 rounded-lg text-sm font-medium transition-all ${
          isSelected
            ? "bg-blue-100 text-blue-700 font-bold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {category.name}
      </Link>

      {hasChildren ? (
        <ul className="ml-4 mt-1 border-l border-gray-200 pl-4 space-y-1">
          {category.child_categories!.map((childId) => {
            const child = allCategories.find((c) => c.id === childId);
            return child ? (
              <CategoryTreeItem key={child.id} category={child} />
            ) : null;
          })}
        </ul>
      ) : null}
    </li>
  );
}

// Mobile recursive item
export function MobileItem({ cat, depth }: { cat: Category; depth: number }) {
  const hasChildren = cat.child_categories?.length;

  return (
    <li>
      <Link
        href={`/category/${cat.slug}`}
        className="block py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
      >
        {"— ".repeat(depth)}
        {cat.name}
      </Link>

      {hasChildren && (
        <ul className="ml-2 space-y-1">
          {cat.child_categories!.map((childId) => {
            const child = allCategories.find((c) => c.id === childId);
            return child ? (
              <MobileItem key={child.id} cat={child} depth={depth + 1} />
            ) : null;
          })}
        </ul>
      )}
    </li>
  );
}

export default function CategoryExplorer() {
  return (
    <section className="bg-gray-50 w-full max-w-dvw py-16">
      {/* Header */}
      <div className="text-center mb-10 px-5 md:px-10">
        <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Our Product Categories
        </h3>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Explore our range of high-quality products, designed to meet your
          needs across various categories.
        </p>
      </div>

      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-5 md:px-10 lg:grid-cols-4 lg:px-20">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-md scrollbar-thin">
          <h4 className="mb-4 text-lg font-semibold text-gray-800">
            Categories
          </h4>

          <ul className="space-y-1">
            {rootCategories.map((cat) => (
              <CategoryTreeItem key={cat.id} category={cat} />
            ))}
          </ul>
        </aside>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden w-full relative">
          <MobileDropdown root={rootCategories} />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-900">
              {defaultCategory?.name || "Products"}
            </h4>
            {defaultCategory && (
              <Link
                href={`/category/${defaultCategory.slug}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                See more
              </Link>
            )}
          </div>

          {products.length ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCards key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
