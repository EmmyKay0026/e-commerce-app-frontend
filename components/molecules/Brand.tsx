import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
// import logo from "../../assets/images/logo.png";
// import { Link } from "react-router-dom";
// import { cn } from "../../utils/twMerge";

const Brand = ({ className }: { className?: string }) => {
  return (
    <Link className="w-[85px]" href="/">
      <img
        // src={logo}
        src={"/images/logo.png"}
        alt="DYEN logo"
        className={cn(" w-full object-cover", className)}
      />
    </Link>
  );
};

export default Brand;
