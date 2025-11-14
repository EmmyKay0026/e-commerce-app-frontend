"use client";
import { useEffect, useRef, useState } from "react";
import { listProducts } from "@/services/productService";
import type { Product } from "@/types/models";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  User,
  List,
  Menu,
  Accessibility,
  Store,
  Bookmark,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CategoriesModal from "./CategoriesModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileBottomNav from "./SubNav";
import { useUserStore } from "@/store/useUserStore";
import { useAuthModal } from "@/store/useAuthModal";
import { toast } from "sonner";
import { supabase } from "@/config/supabase";
import { constructImageUrl } from "@/lib/utils";

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
  const debounceRef = useRef<number | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const user = useUserStore((state) => state.user);
  const setIsOpen = useAuthModal((state) => state.setIsOpen);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [showBottomNav, setShowBottomNav] = useState(true);
  const [manualToggle, setManualToggle] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setShowBottomNav(false);
      } else {
        // Scrolling up
        setShowBottomNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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

  // cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // logout handler
  const handleLogout = async () => {
    toast("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast(error.message);
    } else {
      toast("✅ Logged out successfully!");
      setIsOpen(true);
      window.location.href = "/";
    }
  };

  // close search results when clicking outside the search area
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults(null);
      }
    };
    if (searchResults && searchResults.length > 0) {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [searchResults]);

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

  const handleDebouncedSearch = (query: string) => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    if (!query || query.trim().length === 0) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    debounceRef.current = window.setTimeout(async () => {
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch {}
        abortControllerRef.current = null;
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsSearching(true);
      try {
        const res = await listProducts({
          q: query,
          perPage: 8,
          signal: controller.signal,
        });
        if (res.success && res.data) {
          setSearchResults(res.data.products || []);
        } else {
          setSearchResults([]);
          console.warn("Search error:", res.error);
        }
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
          return;
        }
        console.error("Search request failed:", err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
        if (abortControllerRef.current === controller)
          abortControllerRef.current = null;
      }
    }, 350);
  };

  return (
    <nav className="sticky top-0 left-0 w-full border-b bg-transparent px-0 mx-0 border-none z-50 shadow-sm transition-colors">
      <div className="w-full">
        {/* ===== DESKTOP NAVBAR ===== */}
        {!isMobile && (
          <div className="block w-full">
            {/* Top Bar */}
            <div className="w-full bg-white flex justify-between z-50 py-2 px-16">
              <Link href={"/"} className="relative w-40 h-15 cursor-pointer">
                <Image
                  src="/ind_logo.png"
                  alt="IndustrialMart"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </Link>

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
                    className="hidden md:flex items-center bg-white rounded-full overflow-hidden border-[0.5px] border-[#007bff] pl-2 pr-0 w-[300px]"
                    ref={searchRef}
                  >
                    <Input
                      value={searchQuery}
                      onChange={(e) => {
                        const q = e.target.value;
                        setSearchQuery(q);
                        handleDebouncedSearch(q);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const q = (e.currentTarget as HTMLInputElement).value;
                          router.push(
                            `/marketplace?q=${encodeURIComponent(q)}`
                          );
                          setSearchResults(null);
                        }
                      }}
                      placeholder="Search industrial products..."
                      className="border-none outline-none shadow-none focus:ring-0 focus-visible:ring-0"
                    />
                    <Search className="text-[#c0ab87] sbg-secondary ml-2 h-9 p-2 w-10 rounded-full" />

                    {searchResults !== null && (
                      <div className="absolute left-0 top-[10vh] mt-2 w-full bg-white rounded-b-lg shadow-lg z-50 max-h-64 overflow-auto">
                        {isSearching ? (
                          <div className="p-3">
                            <ul className="divide-y">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <li key={i} className="px-3 py-2">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 animate-pulse" />
                                    <div className="flex-1">
                                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
                                      <div className="h-2 bg-gray-200 rounded w-1/3 animate-pulse" />
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : searchResults.length === 0 ? (
                          <div className="p-3 text-sm text-muted-foreground">
                            No results
                          </div>
                        ) : (
                          <>
                            <ul className="divide-y">
                              {searchResults.slice(0, 6).map((p) => (
                                <li
                                  key={p.id}
                                  className="px-3 py-2 hover:bg-gray-50"
                                >
                                  <Link
                                    href={`/products/${p.slug}`}
                                    className="flex items-center gap-3"
                                  >
                                    <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                      {p.images && p.images[0] ? (
                                        <Image
                                          src={constructImageUrl(p.images[0])}
                                          alt={p.name}
                                          width={40}
                                          height={40}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                                          No image
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 text-sm">
                                      <div className="font-medium text-foreground">
                                        {p.name}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {p.price} Lagos, Nigeria
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>

                            <div className="p-2 border-t text-center">
                              <Link
                                href={`/products?q=${encodeURIComponent(
                                  searchQuery || ""
                                )}`}
                                className="text-sm font-medium text-primary"
                              >
                                See all results
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between items-center gap-6 relative">
                <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                  <li className="hover:text-secondary transition-colors cursor-pointer">
                    <Link href="/about-us">About us</Link>
                  </li>
                  <li className="hover:text-secondary transition-colors cursor-pointer">
                    <Link href="/marketplace">Marketplace</Link>
                  </li>
                  <li className="hover:text-secondary transition-colors cursor-pointer">
                    <Link
                      onClick={user ? () => {} : () => setIsOpen(true)}
                      href={user ? "/sell" : "#"}
                    >
                      Start selling
                    </Link>
                  </li>
                </ul>

                <div
                  onMouseEnter={() => setShowList(true)}
                  className="relative"
                >
                  <Button className="bg-white hover:bg-gray-200 cursor-pointer text-black px-5 rounded-full transition-all flex items-center gap-2">
                    <User /> {user ? "Account" : "Sign in/Register"}
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
                    href="/marketplace"
                    className="cursor-pointer hover:text-gray-200"
                  >
                    Marketplace
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ===== MOBILE NAVBAR ===== */}
        {isMobile && (
          <div className="w-full">
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
                  <span className="cursor-pointer">Marketplace</span>
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
            {user ? (
              <div className="relative w-full">
                <Button className="bg-white hover:bg-transparent cursor-pointer text-black px-5 rounded mx-2 transition-all flex items-center gap-2">
                  <Image
                    alt={user.first_name}
                    src={constructImageUrl(user.profile_picture ?? "/user.png")}
                    width={50}
                    height={50}
                    className="object-cover rounded-full w-10 h-10"
                  />{" "}
                  {user.first_name}
                </Button>
              </div>
            ) : (
              <div className="flex items-center px-4 pt-4">
                <User className="text-gray-900 bg-gray-300 h-10 p-2 mr-2 w-10 rounded-full" />
                <Button
                  onClick={() => {
                    setShowList(false);
                    setIsOpen(true);
                  }}
                  className="bg-white hover:bg-gray-200 cursor-pointer text-black px-3 rounded-full transition-all"
                >
                  Sign in/Register
                </Button>
              </div>
            )}
            <ul className="flex flex-col text-sm text-gray-800 p-4 mt-3 space-y-6">
              <li
                onClick={user ? () => {} : () => setIsOpen(true)}
                className="hover:text-secondary cursor-pointer"
              >
                <Link
                  className="flex gap-2"
                  href={user ? `/user/${user.profile_link}/profile` : "#"}
                >
                  <User className="w-5 h-5" />
                  My account
                </Link>
              </li>
              {!user || user.role === "user" ? (
                <li
                  onClick={user ? () => {} : () => setIsOpen(true)}
                  className="hover:text-secondary cursor-pointer"
                >
                  <Link
                    className="flex gap-2"
                    onClick={user ? () => {} : () => setIsOpen(true)}
                    href={user ? "/sell" : "#"}
                  >
                    <Store className="w-5 h-5" />
                    Start selling
                  </Link>
                </li>
              ) : (
                <li
                  onClick={user ? () => {} : () => setIsOpen(true)}
                  className="hover:text-secondary cursor-pointer"
                >
                  <Link
                    className="flex gap-2"
                    href={user ? `/shop/${user.shop_link}` : "#"}
                  >
                    <Store className="w-5 h-5" />
                    My shop
                  </Link>
                </li>
              )}

              <li
                onClick={user ? () => {} : () => setIsOpen(true)}
                className="hover:text-secondary cursor-pointer"
              >
                <Link
                  className="flex gap-2"
                  href={user ? `/user/${user.profile_link}/saved` : "#"}
                >
                  <Bookmark className="w-5 h-5" />
                  Saved items
                </Link>
              </li>
              <li
                onClick={user ? () => {} : () => setIsOpen(true)}
                className="hover:text-secondary cursor-pointer"
              >
                <Link className="flex gap-2" href={user ? `/settings` : "#"}>
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </li>
              {user && (
                <li
                  onClick={() => handleLogout()}
                  className="hover:text-secondary cursor-pointer flex gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </li>
              )}
            </ul>
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
              className="flex justify-end text-gray-700 w-full text-xl font-bold"
            >
              ✕
            </Button>
            <ul className="flex flex-col text-sm text-gray-800 p-4 space-y-3">
              <li className="hover:text-secondary cursor-pointer">
                <Link href="/about-us">About us</Link>
              </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link href="/marketplace">Marketplace</Link>
              </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link href="/sell">Start selling</Link>
              </li>
            </ul>
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
              value={searchQuery}
              onChange={(e) => {
                const q = e.target.value;
                setSearchQuery(q);
                handleDebouncedSearch(q);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = (e.currentTarget as HTMLInputElement).value;
                  router.push(`/marketplace?q=${encodeURIComponent(q)}`);
                  setSearchResults(null);
                  setMobileSearch(false);
                }
              }}
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
            {searchResults !== null && (
              <div className="absolute left-0 top-[6vh] mt-2 w-full bg-white rounded-b-lg shadow-lg z-50 max-h-64 overflow-auto">
                {isSearching ? (
                  <div className="p-3">
                    <ul className="divide-y">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <li key={i} className="px-3 py-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 animate-pulse" />
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
                              <div className="h-2 bg-gray-200 rounded w-1/3 animate-pulse" />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-3 text-sm text-muted-foreground">
                    No results
                  </div>
                ) : (
                  <>
                    <ul className="divide-y">
                      {searchResults.slice(0, 6).map((p) => (
                        <li key={p.id} className="px-3 py-2 hover:bg-gray-50">
                          <Link
                            href={`/products/${p.slug}`}
                            className="flex items-center gap-3"
                          >
                            <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              {p.images && p.images[0] ? (
                                <Image
                                  src={constructImageUrl(p.images[0])}
                                  alt={p.name}
                                  width={40}
                                  height={40}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                                  No image
                                </div>
                              )}
                            </div>
                            <div className="flex-1 text-sm">
                              <div className="font-medium text-foreground">
                                {p.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {p.price} Lagos, Nigeria
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="p-2 border-t text-center">
                      <Link
                        href={`/products?q=${encodeURIComponent(
                          searchQuery || ""
                        )}`}
                        className="text-sm font-medium text-primary"
                      >
                        See all results
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CategoriesModal
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
      />
      
      {/* Toggle Button - Shows when nav is hidden */}
      <AnimatePresence>
        {isMobile && !manualToggle && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setManualToggle(true)}
            className="fixed bottom-15 right-4 z-[60] bg-white rounded-full shadow-lg p-2 border border-gray-200"
          >
            <ChevronUp className="w-5 h-5 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav with Toggle Button */}
      <AnimatePresence>
        {isMobile && showBottomNav && manualToggle && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 w-full z-50"
          >
            {/* Toggle Button Above Nav */}
            <div className="absolute -top-12 right-4 z-[60]">
              <button
                onClick={() => setManualToggle(false)}
                className="fixed bottom-15 right-4 z-[60] bg-white rounded-full shadow-lg p-2 border border-gray-200"
              >
                <ChevronDown className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <MobileBottomNav />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}