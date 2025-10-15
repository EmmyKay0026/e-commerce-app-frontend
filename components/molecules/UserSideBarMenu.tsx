import { Bookmark, Contact, Settings, Shield, Store } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaStore } from "react-icons/fa";

const UserSideBarMenu = () => {
  return (
    <section className="shadow bg-white p-4  rounded flex flex-col  gap-4   ">
      <ul className="space-y-4">
        <li>
          <Link
            href={`products`}
            className="flex items-center gap-1 cursor-pointer hover:text-primary"
          >
            <Store className="mr-2 h-4 w-4" />
            My products
          </Link>
        </li>
        <li>
          <Link
            href={`profile`}
            className="flex items-center gap-1 cursor-pointer hover:text-primary"
          >
            <Contact className="mr-2 h-4 w-4" />
            Contact info
          </Link>
        </li>

        <li>
          <Link
            href={`saved`}
            className="flex items-center gap-1 cursor-pointer hover:text-primary"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Saved
          </Link>
        </li>
        <li>
          <Link
            href={`/user/settings`}
            className="flex items-center gap-1 cursor-pointer hover:text-primary"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default UserSideBarMenu;
