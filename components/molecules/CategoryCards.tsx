import React from "react";
import { Card } from "../ui/card";
import { Category } from "@/types/models";
import { FaIndustry } from "react-icons/fa";

const CategoryCardsWithIcon = ({ category }: { category: Category }) => {
  return (
    <Card
      key={category.name}
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-[150px] "
    >
      <div className="p-6 flex flex-col items-center text-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center ">
          <FaIndustry className={`h-8 w-8 text-primary`} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{category?.name}</h3>
          <p className="text-sm text-muted-foreground">14 items</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCardsWithIcon;
