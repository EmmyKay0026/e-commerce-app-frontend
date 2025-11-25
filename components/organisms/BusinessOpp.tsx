"use client";

import TopRanking from "./TopRanking";
import NewArrivals from "./NewArrivals";
import TopDeals from "./TopDeals";
import Link from "next/link";

export default function BusinessOpportunities() {
  return (
    <section className="bg-gray-50 py-10 px-4 md:px-8 lg:px-20">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Discover your next business opportunity
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Top ranking</h3>
              <Link
                href={`/category/top-ranking`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                View more
              </Link>
            </div>
            <TopRanking />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">New arrivals</h3>
              <Link
                href={`/category/new-arrivals`}
                className="text-sm text-muted-foreground"
              >
                View more
              </Link>
            </div>
            <NewArrivals />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Top deals</h3>
              <Link
                href={`/category/top-deals`}
                className="text-sm text-muted-foreground"
              >
                View more
              </Link>
            </div>
            <TopDeals />
          </div>
        </div>
      </div>
    </section>
  );
}