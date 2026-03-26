"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export function SuccessModal({ open, onClose, title, message }: SuccessModalProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-10 max-w-sm text-center shadow-none"
      >
        {/* Animated checkmark */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="flex items-center justify-center w-14 h-14 border border-[var(--color-border-strong)]"
            initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Check size={22} strokeWidth={1.5} className="text-[var(--color-ink)]" />
            </motion.div>
          </motion.div>
        </div>

        <DialogHeader className="gap-3 items-center">
          <DialogTitle className="text-base font-semibold tracking-tight text-[var(--color-ink)]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-[var(--color-ink-light)] leading-relaxed">
            {message}
          </DialogDescription>
        </DialogHeader>

        <button
          onClick={onClose}
          className="mt-8 w-full border border-[var(--color-border-strong)] py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
