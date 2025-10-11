"use client";
import * as React from "react";

export function VendorHeroSkeleton() {
  return (
    <section className="relative w-full animate-pulse" aria-hidden="true">
      {/* Cover Image Placeholder */}
      <div className="relative h-[400px] w-full overflow-hidden bg-gray-200 dark:bg-gray-700" />

      {/* Vendor Info Overlay */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 md:-mt-24">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Vendor Logo Placeholder */}
            <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-700 border-4 border-transparent shadow-xl" />

            {/* Vendor Details Card Placeholder */}
            <div className="flex-1 bg-card rounded-xl p-6 shadow-lg border border-transparent">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-8 md:h-10 w-56 md:w-72 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>

                  <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />

                  <div className="flex items-center gap-4 flex-wrap text-sm pt-2">
                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <div className="h-10 w-full md:w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-10 w-full md:w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section Skeleton */}
      <section id="categories" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-56 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="h-4 w-96 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-6 flex flex-col items-center text-center gap-3 bg-white dark:bg-card rounded-lg shadow-sm"
              >
                <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
// ```// filepath: c:\Users\HP\OneDrive\Documents\Codework\multi-vendor-ecommerce-app\multi-vendor-ecommerce-app-frontend\components\vendor\VendorHeroSkeleton.tsx
// "use client";
// import * as React from "react";

// export function VendorHeroSkeleton() {
//   return (
//     <section className="relative w-full animate-pulse" aria-hidden="true">
//       {/* Cover Image Placeholder */}
//       <div className="relative h-[400px] w-full overflow-hidden bg-gray-200 dark:bg-gray-700" />

//       {/* Vendor Info Overlay */}
//       <div className="container mx-auto px-4">
//         <div className="relative -mt-20 md:-mt-24">
//           <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
//             {/* Vendor Logo Placeholder */}
//             <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-700 border-4 border-transparent shadow-xl" />

//             {/* Vendor Details Card Placeholder */}
//             <div className="flex-1 bg-card rounded-xl p-6 shadow-lg border border-transparent">
//               <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                 <div className="space-y-4 flex-1">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <div className="h-8 md:h-10 w-56 md:w-72 bg-gray-200 dark:bg-gray-700 rounded" />
//                     <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
//                   </div>

//                   <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded" />
//                   <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />

//                   <div className="flex items-center gap-4 flex-wrap text-sm pt-2">
//                     <div className="flex items-center gap-1">
//                       <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
//                       <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
//                       <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
//                     </div>

//                     <div className="flex items-center gap-1">
//                       <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
//                       <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
//                   <div className="h-10 w-full md:w-40 bg-gray-200 dark:bg-gray-700 rounded" />
//                   <div className="h-10 w-full md:w-40 bg-gray-200 dark:bg-gray-700 rounded" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Categories Section Skeleton */}
//       <section id="categories" className="py-16 md:py-24">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <div className="h-8 w-56 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4" />
//             <div className="h-4 w-96 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="p-6 flex flex-col items-center text-center gap-3 bg-white dark:bg-card rounded-lg shadow-sm"
//               >
//                 <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center" />
//                 <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
//                 <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// }
