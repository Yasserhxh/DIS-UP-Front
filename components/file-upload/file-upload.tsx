"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  label: string
  description?: string
  accept?: string
  maxSize?: number // in MB
  onChange?: (file: File | null) => void
  className?: string
}

export function FileUpload({
  label,
  description = "Cliquez pour télécharger",
  accept = "image/*,application/pdf",
  maxSize = 5, // 5MB default
  onChange,
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (selectedFile: File | null) => {
    setError(null)

    if (!selectedFile) {
      setFile(null)
      onChange && onChange(null)
      return
    }

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`La taille du fichier dépasse ${maxSize}MB`)
      return
    }

    setFile(selectedFile)
    onChange && onChange(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
    onChange && onChange(null)
  }

  return (
    <div className={className}>
      {!file ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/50 hover:bg-muted",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">{description}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
              {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            </div>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            />
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={removeFile}>
              <X className="h-4 w-4" />
              <span className="sr-only">Supprimer</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

