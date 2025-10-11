import { Card } from "@/components/ui/card";
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad,
} from "lucide-react";

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    count: 145,
    color: "text-blue-600",
  },
  { name: "Laptops", icon: Laptop, count: 89, color: "text-purple-600" },
  { name: "Audio", icon: Headphones, count: 234, color: "text-pink-600" },
  { name: "Wearables", icon: Watch, count: 167, color: "text-green-600" },
  { name: "Cameras", icon: Camera, count: 78, color: "text-orange-600" },
  { name: "Gaming", icon: Gamepad, count: 112, color: "text-red-600" },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="px-2 lg:px-8 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our extensive collection of premium electronics across
            multiple categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <Icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} items
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
