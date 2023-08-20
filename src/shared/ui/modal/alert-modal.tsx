"use client";

import { useEffect, useState } from "react";
import { Modal } from ".";
import { Button } from "../primitives";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-between sm:justify-end w-full">
        <Button disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
