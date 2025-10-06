"use client";

import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">IndustrialMart Nigeria</h2>
          <p className="text-sm text-gray-400">
            We are proud to be a leading marketer of top-quality industrial
            equipment and tools, catering to the oil & gas industries and other
            vital sectors across Nigeria.
          </p>
          <div className="flex gap-3 mt-4">
            <Facebook size={20} />
            <Instagram size={20} />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3">Our Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Browse Products</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Return Policy</li>
            <li>Product Condition Policy</li>
            <li>Warranty Policy</li>
            <li>Shipping Policy</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">
            📍 Amadi-ama, Trans Amadi Industrial Layout,
            <br />
            Port Harcourt, Rivers State.
          </p>
          <p className="text-sm mt-3 text-gray-400">
            Email: sales@industrialmartnigeria.com
          </p>
          <p className="text-sm mt-2 text-gray-400">Call us: +234-7078581059</p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} IndustrialMart Nigeria. All rights reserved.
      </div>
    </footer>
  );
}
