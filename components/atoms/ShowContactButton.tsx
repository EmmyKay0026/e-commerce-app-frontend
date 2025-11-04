import { useUserStore } from "@/store/useUserStore";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAuthModal } from "@/store/useAuthModal";
import { Copy, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const ShowContactButton = ({
  userPhoneNumber,
  type = "phone",
}: {
  userPhoneNumber: string;
  type?: "phone" | "whatsapp";
}) => {
  const user = useUserStore((state) => state.user);
  const setIsOpen = useAuthModal((state) => state.setIsOpen);
  const [btnText, setBtnText] = useState<string>("Show Contact");

  const handleContactReveal = () => {
    if (btnText !== "Show Contact") return;

    if (user && user.id) {
      setBtnText(userPhoneNumber);
    } else {
      setIsOpen(true);
    }
  };

  //   const copyToClipboard = async (e: any) => {
  //     e.stopPropagation();
  //     // If contact isn't revealed, open auth modal
  //     // if (btnText !== userPhoneNumber) {
  //     //   setIsOpen(true);
  //     //   return;
  //     // }

  //     // Try navigator.clipboard first, fallback to textarea copy
  //     try {
  //       await navigator.clipboard.writeText(userPhoneNumber);
  //     } catch {
  //       const ta = document.createElement("textarea");
  //       ta.value = userPhoneNumber;
  //       document.body.appendChild(ta);
  //       ta.select();
  //       try {
  //         document.execCommand("copy");
  //       } finally {
  //         ta.remove();
  //       }
  //     }

  //     // Provide quick feedback by temporarily changing button text
  //     const prev = btnText;
  //     setBtnText("Copied");
  //     setTimeout(() => setBtnText(prev), 1500);
  //   };
  if (type === "whatsapp") {
    return (
      <Link
        onClick={user ? () => {} : handleContactReveal}
        href={user ? `https://wa.me/${userPhoneNumber}` : "#!"}
        target={user ? "_blank" : ""}
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto bg-transparent text-green-500"
        >
          <FaWhatsapp className="h-4 w-4 mr-2" />
          {/* <Mail className="h-4 w-4 mr-2" /> */}
          WhatsApp
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center  justify-center w-full">
      <Button className="" onClick={handleContactReveal}>
        <Phone className="h-4 w-4 mr-2" />
        {btnText}
        {/* Add copy functionality later */}
        {/* <Copy onClick={copyToClipboard} className="h-4 w-4 ml-2" /> */}
      </Button>
    </div>
  );
};

export default ShowContactButton;

{
  /* <button
        type="button"
        aria-label="Copy contact"
        className="inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100"
        onClick={async (e) => {
          e.stopPropagation();
          // If contact isn't revealed, open auth modal
          if (btnText !== userPhoneNumber) {
            setIsOpen(true);
            return;
          }

          // Try navigator.clipboard first, fallback to textarea copy
          try {
            await navigator.clipboard.writeText(userPhoneNumber);
          } catch {
            const ta = document.createElement("textarea");
            ta.value = userPhoneNumber;
            document.body.appendChild(ta);
            ta.select();
            try {
              document.execCommand("copy");
            } finally {
              ta.remove();
            }
          }

          // Provide quick feedback by temporarily changing button text
          const prev = btnText;
          setBtnText("Copied");
          setTimeout(() => setBtnText(prev), 1500);
        }}
      >
        {/* simple clipboard/copy icon */
}
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-4 w-4"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
>
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>;
//   </button>
// </div> */}
