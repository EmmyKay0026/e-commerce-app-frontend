"use client";

import Link from "next/link";
import Image from "next/image";

export default function TopDeals() {
  return (
    <div className="space-y-4">
      <Link href="/deals/1" className="block bg-white rounded-xl shadow-sm p-3 lg:flex items-center gap-3 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="w-20 h-14 rounded-md overflow-hidden relative">
          <Image src="https://picsum.photos/seed/d1/200/140" alt="deal1" fill className="object-cover" loading="lazy" />
        </div>
        <div>
          <p className="font-medium">180-day lowest price</p>
        </div>
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-3">
        <p className="font-medium mb-2">Deals on best sellers</p>
        <Link href="/deals/2" className="block rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div className="relative w-full h-40 rounded-md overflow-hidden">
            <Image src="https://picsum.photos/seed/d2/800/500" alt="big" fill className="object-cover" loading="lazy" />
          </div>
        </Link>
      </div>
    </div>
  );
}
