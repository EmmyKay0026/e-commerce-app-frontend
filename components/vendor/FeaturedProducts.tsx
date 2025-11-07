import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { demoProducts } from "@/constants/product";
import { ProductCardGrid } from "../molecules/ProductCardGridView";
import ProductCards from "../molecules/ProductCards";
import { useEffect, useState } from "react";
import { BusinessProfile, Product, User } from "@/types/models";
import { getBusinessProducts } from "@/services/productService";
import { useParams } from "next/navigation";
import { getBusinessProfileBySlug } from "@/services/businessProfileService";

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "₦1,250,000",
    originalPrice: "₦1,450,000",
    image: "/iphone-15-pro.jpg",
    rating: 4.9,
    reviews: 342,
    badge: "Best Seller",
    discount: "14% OFF",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: "₦2,850,000",
    originalPrice: "₦3,200,000",
    image: "/macbook-pro.jpg",
    rating: 4.8,
    reviews: 189,
    badge: "Featured",
    discount: "11% OFF",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: "₦385,000",
    originalPrice: "₦450,000",
    image: "/sony-headphones.jpg",
    rating: 4.9,
    reviews: 567,
    badge: "Top Rated",
    discount: "14% OFF",
  },
];

export function FeaturedProducts() {
  const { slug } = useParams();
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [businessProducts, setBusinessProducts] = useState<Product[] | null>(
    null
  );

  useEffect(() => {
    const getBusniessProducts = async () => {
      // const businessDetails= await getBusinessProfileBySlug(slug?.toString())
      const { data } = await getBusinessProfileBySlug(slug?.toString()!);
      if (!data) return;
      const buzRes = data as unknown as BusinessProfile & { user: User };
      if (!buzRes || !buzRes.id) return;

      setIsPageLoading(true);

      const res = await getBusinessProducts(buzRes.id);
      if (res.success && res.data) {
        // console.log(res.data);

        setBusinessProducts(res.data.data);
      }
      // console.log(res);
      setIsPageLoading(false);
    };

    getBusniessProducts();
  }, [slug]);

  return (
    <section id="featured" className="px-2 lg:px-8 py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hand-picked selection of our most popular and highly-rated products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessProducts?.map((product) => (
            <ProductCards
              // id={product.id}
              key={product.id}
              product={product!}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

//  <Card
//               key={product.id}
//               className="group overflow-hidden hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative aspect-square overflow-hidden bg-muted">
//                 <img
//                   src={product.images[0] || "/placeholder.svg"}
//                   alt={product.name}
//                   className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-3 left-3 flex gap-2">
//                   {/* <Badge className="bg-accent text-accent-foreground">
//                     {product.badge}
//                   </Badge> */}
//                   {/* <Badge variant="destructive">{product.discount}</Badge> */}
//                 </div>
//                 <Button
//                   size="icon"
//                   variant="secondary"
//                   className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <Heart className="h-4 w-4" />
//                 </Button>
//               </div>
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
//                   {product.name}
//                 </h3>
//                 <div className="flex items-center gap-2 mb-3">
//                   <p className="">{product.description}</p>
//                   {/* <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-accent text-accent" />
//                     <span className="text-sm font-medium">
//                       {product.rating}
//                     </span>
//                   </div> */}
//                   {/* <span className="text-sm text-muted-foreground">
//                     ({product.reviews} reviews)
//                   </span> */}
//                 </div>
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-2xl font-bold text-foreground">
//                     {product.price}
//                   </span>
//                   {/* <span className="text-sm text-muted-foreground line-through">
//                     {product.price}
//                   </span> */}
//                 </div>
//                 <Button className="w-full" size="lg">
//                   View contact
//                 </Button>
//               </CardContent>
//             </Card>
