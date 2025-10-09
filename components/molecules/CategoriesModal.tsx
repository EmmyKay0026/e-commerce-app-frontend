"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wrench, Factory, Shield, PlugZap, FlaskConical, Battery, Hammer, Power } from "lucide-react";

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { icon: <Factory className="w-5 h-5" />, name: "Heavy Machinery" },
  { icon: <Wrench className="w-5 h-5" />, name: "Construction Tools" },
  { icon: <PlugZap className="w-5 h-5" />, name: "Electrical Components" },
  { icon: <Shield className="w-5 h-5" />, name: "Safety Gear" },
  { icon: <FlaskConical className="w-5 h-5" />, name: "Industrial Chemicals" },
  { icon: <Battery className="w-5 h-5" />, name: "Power & Energy" },
  { icon: <Hammer className="w-5 h-5" />, name: "Maintenance Tools" },
  { icon: <Power className="w-5 h-5" />, name: "Oil & Gas Equipment" },
];

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose }) => {
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
          <button onClick={onClose} className="text-gray-900 hover:text-red text-xl">
            ✕
          </button>
        </div>

        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 cursor-pointer transition-all"
            >
              {cat.icon}
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CategoriesModal;
