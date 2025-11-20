"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Power, X } from "lucide-react";
import Link from "next/link";

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose }) => {
  const categories = useCategoryStore((s) => s.categories);

  if (!isOpen) return null;

  // Prevent body scroll when modal is open
  if (typeof window !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden lg:block"
            onClick={onClose}
          />

          {/* Modal Container */}
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
                    {categories.map((cat, i) => (
                      <motion.li
                        key={cat.slug || i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link
                          href={`/category/${cat.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 active:scale-[0.98] transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            {cat.icon ? (
                              <img
                                src={cat.icon}
                                alt={cat.name}
                                className="w-5 h-5 object-contain"
                              />
                            ) : (
                              <Power className="w-5 h-5 text-indigo-600" />
                            )}
                          </div>
                          <span className="text-gray-800 font-medium text-sm lg:text-base group-hover:text-indigo-700 transition-colors">
                            {cat.name}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Power className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      No categories available
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Check back later for updates
                    </p>
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
