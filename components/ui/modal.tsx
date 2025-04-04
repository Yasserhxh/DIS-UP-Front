"use client"

import type * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ModalProps {
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  showCloseButton?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  children,
  footer,
  className,
  showCloseButton = true,
  size = "md",
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "overflow-hidden p-0",
          size === "sm" && "sm:max-w-[425px]",
          size === "md" && "sm:max-w-[600px]",
          size === "lg" && "sm:max-w-[800px]",
          size === "xl" && "sm:max-w-[1000px]",
          size === "full" && "sm:max-w-[90vw] sm:max-h-[90vh]",
          className,
        )}
      >
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            {showCloseButton && (
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            )}
          </div>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="px-6 py-4">{children}</div>
        {footer && <DialogFooter className="px-6 py-4 border-t">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

