"use client";

import { Dialog, DialogContent } from "../primitives";
import { Modal } from "./";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

export const ImageModal = ({
  onClose,
  isOpen = false,
  src,
}: ImageModalProps) => {
  if (!src) return null;

  const onChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  return (
    <Dialog open={isOpen !== false} onOpenChange={onChange}>
      <DialogContent className="p-0 md:p-0 border-none bg-transparent w-full max-w-full lg:max-w-[90%]">
        <div className="relative aspect-square w-full h-full">
          <Image src={src} fill alt="Image" sizes="100%" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
