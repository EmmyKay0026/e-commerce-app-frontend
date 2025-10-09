"use client";

import Link from "next/link";
import Image from "next/image";

const items = [
  { id: "n1", img: "https://picsum.photos/seed/n1/400/300" },
  { id: "n2", img: "https://picsum.photos/seed/n2/400/300" },
  { id: "n3", img: "https://picsum.photos/seed/n3/400/300" },
  { id: "n4", img: "https://picsum.photos/seed/n4/400/300" },
];

export default function NewArrivals() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-2 gap-3">
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/new-arrivals/${it.id}`}
            className="block rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Open new arrival ${it.id}`}
          >
            <div className="relative h-28 sm:h-32 w-full">
              <Image src={it.img} alt={`new ${it.id}`} fill className="object-cover" loading="lazy" />
            </div>
          </Link>
        ))}
      </div>

      <Link href="/new-arrivals" className="block bg-white rounded-xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">112,000+ products added today</p>
            <p className="text-sm text-gray-500">New this week — Products from Verified Suppliers only</p>
          </div>
          <div className="w-20 h-20 rounded-md overflow-hidden relative hidden sm:block">
            <Image src="https://picsum.photos/seed/ann/400/300" alt="new" fill className="object-cover" loading="lazy" />
          </div>
        </div>
      </Link>
    </div>
  );
}
