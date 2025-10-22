"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, List, Menu } from "lucide-react";
import CategoriesModal from "./CategoriesModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import MobileBottomNav from "./SubNav";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [animateSearch, setAnimateSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showList, setShowList] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSecondaryNav, setShowSecondaryNav] = useState(true);
  const isMobile = useIsMobile();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setShowList(false);
      }
    };
    if (showList) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showList]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const heroSearch = document.getElementById("hero-search");
      if (heroSearch) {
        const rect = heroSearch.getBoundingClientRect();
        const shouldShow = rect.bottom <= 0;
        if (shouldShow && !showSearch) {
          setShowSearch(true);
          setTimeout(() => setAnimateSearch(true), 50);
        } else if (!shouldShow && showSearch) {
          setAnimateSearch(false);
          setTimeout(() => setShowSearch(false), 200);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSearch, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowSecondaryNav(false);
      } else {
        setShowSecondaryNav(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 left-0 w-full border-b bg-transparent px-0 mx-0 border-none z-50 shadow-sm transition-colors">
      <div className="w-full">
        {/* ===== DESKTOP NAVBAR ===== */}
        {!isMobile && (
          <div className="block w-full">
            {/* Top Bar */}
            <div className="w-full bg-white flex justify-between z-50 py-2 px-16">
              {/* Logo */}
              <div className="relative w-32 h-10 cursor-pointer">
                <Image
                  src="/ind_logo.png"
                  alt="IndustrialMart"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Search Bar (shows on scroll) */}
              <div className="flex items-center gap-3">
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{
                      opacity: animateSearch ? 1 : 0,
                      y: animateSearch ? 0 : -5,
                    }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="hidden md:flex items-center bg-white rounded-full overflow-hidden shadow-sm border border-gray-200 pl-2 pr-0 w-[300px]"
                  >
                    <Input
                      placeholder="Search industrial products..."
                      className="border-none outline-none shadow-none focus:ring-0 focus-visible:ring-0"
                    />
                    <Search className="text-white bg-secondary ml-2 h-9 p-2 w-10 rounded-full" />
                  </motion.div>
                )}
              </div>

              {/* Links + Sign-in */}
              <div className="flex justify-between items-center gap-6 relative">
                <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                  <li className="hover:text-secondary transition-colors cursor-pointer">
                    ABOUT US
                  </li>
                  <li className="hover:text-secondary transition-colors cursor-pointer">
                    <Link href="/market-place">MARKET PLACE</Link>
                  </li>
                  <li className="hover:text-secondary transition-colors cursor-pointer">
                    CONTACT US
                  </li>
                </ul>

                <div onMouseEnter={() => setShowList(true)} className="relative">
                  <Button className="bg-white hover:bg-gray-200 cursor-pointer text-black px-5 rounded-full transition-all flex items-center gap-2">
                    <User /> Sign in/Register
                  </Button>
                </div>
              </div>
            </div>

            {/* Secondary Nav (Desktop) */}
            <AnimatePresence>
              {showSecondaryNav && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start gap-7 pl-20 items-center bg-black/40 backdrop-blur-sm text-sm text-white font-medium py-2"
                >
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowCategories(true)}
                  >
                    <List className="w-4 h-4" />
                    <span>Categories</span>
                  </div>
                  <Link
                    href="/market-place"
                    className="cursor-pointer hover:text-gray-200"
                  >
                    Market Place
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ===== MOBILE NAVBAR ===== */}
        {isMobile && (
          <div className="w-full">
            {/* Top Bar */}
            <div className="flex justify-between items-center bg-white pr-4">
              <div className="relative w-36 h-14">
                <Image
                  src="/ind_logo.png"
                  alt="IndustrialMart Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-4">
                <Search
                  className="text-gray-800 w-5 h-5 cursor-pointer"
                  onClick={() => setMobileSearch(true)}
                />
                <Menu
                  className="text-gray-800 w-5 h-5 cursor-pointer"
                  onClick={() => setShowMenu(true)}
                />
                <User
                  className="text-gray-800 w-5 h-5 cursor-pointer"
                  onClick={() => setShowList(true)}
                />
              </div>
            </div>

            {/* Secondary Nav (Mobile) */}
            <AnimatePresence>
              {showSecondaryNav && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-around items-center bg-black/40 backdrop-blur-sm text-sm text-white font-medium border-t border-gray-200 py-1"
                >
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setShowCategories(true)}
                  >
                    <List className="w-4 h-4" />
                    <span>Categories</span>
                  </div>
                  <span className="cursor-pointer">Market Place</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Sign In Dropdown */}
      <AnimatePresence>
        {showList && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 w-[250px] z-[100]"
          >
            <Button
              variant="ghost"
              onClick={() => setShowList(false)}
              className="flex justify-end text-gray-700 w-full text-xl font-bold"
            >
              ✕
            </Button>
            <div className="flex items-center px-4 pt-4">
              <User className="text-gray-900 bg-gray-300 h-10 p-2 mr-2 w-10 rounded-full" />
              <Button
                onClick={() => {
                  // close dropdown and open global sign-in modal
                  setShowList(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-signin-modal"));
                  }
                }}
                className="bg-white hover:bg-gray-200 cursor-pointer text-black px-3 rounded-full transition-all"
              >
                Sign in/Register
              </Button>
            </div>
            <div className="flex flex-col text-sm text-gray-800 p-4 space-y-3">
              <p className="hover:text-secondary cursor-pointer">My Orders</p>
              <p className="hover:text-secondary cursor-pointer">Notifications</p>
              <p className="hover:text-secondary cursor-pointer">Saved</p>
              <p className="hover:text-secondary cursor-pointer">Wish List</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 w-[250px] z-[100]"
          >
            <Button
              variant="ghost"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 w-full text-xl font-bold"
            >
              ✕
            </Button>
            <div className="flex flex-col text-sm text-gray-800 p-4 space-y-3">
              <p className="hover:text-secondary cursor-pointer">ABOUT US</p>
              <p className="hover:text-secondary cursor-pointer">PRODUCTS</p>
              <p className="hover:text-secondary cursor-pointer">CONTACT US</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {mobileSearch && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full bg-white flex items-center gap-3 px-4 py-3 shadow-md z-50"
          >
            <Search className="text-gray-800 w-5 h-5" />
            <Input
              placeholder="Search industrial products..."
              className="border-none outline-none shadow-none focus:ring-0 flex-1"
            />
            <Button
              variant="ghost"
              onClick={() => setMobileSearch(false)}
              className="text-gray-700"
            >
              ✕
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* removed local SignInModal mount - global manager will handle it */}
      <CategoriesModal
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
      />
      <MobileBottomNav />
    </nav>
  );
}
