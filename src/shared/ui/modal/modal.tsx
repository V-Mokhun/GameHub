"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../primitives";

interface ModalProps {
  title: string;
  isOpen: boolean;
  description: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({
  description,
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
