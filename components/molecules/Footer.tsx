"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-black bottom-0 text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Image
            src="/ind_logo.png"
            alt="IndustrialMart Logo"
            width={160}
            height={50}
            className="object-cover w-40 h-15 ml-[-16]"
          />

          <p className="text-sm text-gray-400">
            We are proud to be a leading marketer of top-quality industrial
            equipment and tools, catering to the oil & gas industries and other
            vital sectors across Nigeria.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.facebook.com/share/17WTTNEaSV/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit IndustrialMart Nigeria on Facebook"
              className="hover:text-blue-500 transition-colors"
            >
              <LuFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/industrialmartnigeria"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit IndustrialMart Nigeria on Facebook"
              className="hover:text-blue-500 transition-colors"
            >
              <FaInstagram size={20} />

            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3">Our Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link
                href={"/"}
                className="hover:text-blue-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/about-us"}
                className="hover:text-blue-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={"/marketplace"}
                className="hover:text-blue-500 transition-colors"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href={"/guide/creating-a-business-account"}
                className="hover:text-blue-500 transition-colors"
              >
                How to be a vendor
              </Link>
            </li>
            <li>
              <Link
                href={"/guide/how-to-sell"}
                className="hover:text-blue-500 transition-colors"
              >
                How to start selling
              </Link>
            </li>
            <li>{/* <Link href={"/"}>Contact Us</Link> */}</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            {/* <li>Shipping Policy</li> */}
            <li>
              <Link
                href={"/terms-and-condition"}
                className="hover:text-blue-500 transition-colors"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                href={"/privacy-policy"}
                className="hover:text-blue-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href={"/payment-policy"}
                className="hover:text-blue-500 transition-colors"
              >
                Payment Policy
              </Link>
            </li>
            <li>
              <Link
                href={"/refund-and-return-policy"}
                className="hover:text-blue-500 transition-colors"
              >
                Refund and Return Policy
              </Link>
            </li>
            <li>
              <Link
                href={"/seller-policy"}
                className="hover:text-blue-500 transition-colors"
              >
                Seller Policy
              </Link>
            </li>
            <li>
              <Link
                href={"/buyer-policy"}
                className="hover:text-blue-500 transition-colors"
              >
                Buyer Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">
            Amadi-ama, Trans Amadi Industrial Layout,
            <br />
            Port Harcourt, Rivers State.
          </p>
          <Link
            href={"mailto:support@industrialmart.ng"}
            className="hover:text-blue-500"
          >
            <p className="text-sm mt-3 text-gray-400">
              Email: support@industrialmart.ng
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} IndustrialMart Nigeria. All rights
        reserved.
      </div>
    </footer>
  );
}
