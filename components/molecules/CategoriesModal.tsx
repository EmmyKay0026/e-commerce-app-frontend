"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Power, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { constructImageUrl } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose }) => {
  const categories = useCategoryStore((s) => s.categories);
  const pathname = usePathname();

  // ←←← ALL HOOKS MUST BE AT THE TOP (unconditional) ←←←
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset"; // cleanup on unmount/close
    };
  }, [isOpen]);

  // Check if current route belongs to this category
  const isCategoryActive = (slug: string) => {
    return pathname === `/category/${slug}` || pathname.startsWith(`/category/${slug}/`);
  };

  // ←←← EARLY RETURN ONLY AFTER ALL HOOKS ←←←
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 block"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 pointer-events-none">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto bg-white shadow-2xl h-full w-full max-w-[320px] lg:max-w-[360px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  All Categories
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {categories.length > 0 ? (
                  <ul className="space-y-1">
                    {categories.map((cat, i) => {
                      const active = isCategoryActive(cat.slug);
                      return (
                        <motion.li
                          key={cat.slug || i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            href={`/category/${cat.slug}`}
                            onClick={onClose}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                              active
                                ? "bg-blue-50 border border-blue-200 shadow-sm"
                                : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 active:scale-[0.98]"
                            }`}
                          >
                            {active && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                            )}

                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                active
                                  ? "bg-blue-100 ring-2 ring-blue-300"
                                  : "bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:scale-110"
                              }`}
                            >
                              {cat.icon ? (
                                <Image
                                  src={constructImageUrl(cat.icon)}
                                  width={20}
                                  height={20}
                                  alt={cat.name}
                                  className="w-5 h-5 object-contain"
                                />
                              ) : (
                                <Power
                                  className={`w-5 h-5 ${
                                    active ? "text-blue-700" : "text-indigo-600"
                                  }`}
                                />
                              )}
                            </div>

                            <span
                              className={`font-medium text-sm lg:text-base transition-colors ${
                                active
                                  ? "text-blue-700 font-bold"
                                  : "text-gray-800 group-hover:text-indigo-700"
                              }`}
                            >
                              {cat.name}
                            </span>

                            {active && (
                              <div className="ml-auto">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                              </div>
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Power className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No categories available</p>
                    <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-5 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-500 text-center">
                  {categories.length} {categories.length === 1 ? "category" : "categories"} available
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CategoriesModal;