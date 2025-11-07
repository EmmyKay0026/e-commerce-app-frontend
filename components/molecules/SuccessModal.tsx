import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  productUrl: string;
  profileUrl: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  productUrl,
  profileUrl,
}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Product Created Successfully!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your product has been listed. What would you like to do next?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-4 mt-4">
          {/* <Link href={profileUrl} passHref> */}
          <Button onClick={onClose} variant="outline">
            Add Another Product
          </Button>
          {/* </Link> */}
          <Link href={productUrl} passHref>
            <Button>View Product</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
