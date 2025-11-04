"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useCategoryStore } from "@/store/useCategoryStore";
import {
  Wrench,
  Factory,
  Shield,
  PlugZap,
  FlaskConical,
  Battery,
  Hammer,
  Power,
} from "lucide-react";
import Link from "next/link";

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { categories, loading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bottom-0 flex justify-start items-end z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white backdrop-blur-lg border border-white/20 shadow-2xl rounded-r-2xl w-[280px] h-[90dvh] p-6 text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Categories</h2>
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-red text-xl"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-200 animate-pulse"
              >
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 cursor-pointer transition-all"
              >
                <Link
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 cursor-pointer transition-all"
                  href={`/category/${cat.slug}`}
                >
                  {/* You can add a default icon or handle missing icons gracefully */}
                  {cat.icon ? (
                    <img src={cat.icon} alt={cat.name} className="w-5 h-5" />
                  ) : (
                    <Power className="w-5 h-5" />
                  )}
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CategoriesModal;
