"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface DocumentType {
  id: string
  name: string
  required: boolean
  description?: string
}

interface UploadedDocument {
  documentTypeId: string
  file: File
  uploadDate: Date
}

interface DocumentUploadSectionProps {
  documentTypes: DocumentType[]
  className?: string
  onDocumentsChange?: (documents: UploadedDocument[]) => void
}

// Update the DocumentUploadSection component to remove asterisks and unnecessary code
export function DocumentUploadSection({ documentTypes, className, onDocumentsChange }: DocumentUploadSectionProps) {
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null)
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleDocumentTypeChange = (value: string) => {
    setSelectedDocumentType(value)
    setError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedDocumentType) {
      setError("Veuillez sélectionner un type de document d'abord")
      return
    }

    const file = e.target.files?.[0]
    if (!file) return

    // Check if this document type already has an uploaded file
    const existingDocIndex = uploadedDocuments.findIndex((doc) => doc.documentTypeId === selectedDocumentType)

    if (existingDocIndex >= 0) {
      // Replace the existing document
      const updatedDocs = [...uploadedDocuments]
      updatedDocs[existingDocIndex] = {
        documentTypeId: selectedDocumentType,
        file,
        uploadDate: new Date(),
      }
      setUploadedDocuments(updatedDocs)
    } else {
      // Add new document
      const newDocs = [
        ...uploadedDocuments,
        {
          documentTypeId: selectedDocumentType,
          file,
          uploadDate: new Date(),
        },
      ]
      setUploadedDocuments(newDocs)
    }

    // Reset the file input
    e.target.value = ""

    // Notify parent component
    if (onDocumentsChange) {
      onDocumentsChange([...uploadedDocuments])
    }
  }

  const handleDeleteDocument = (documentTypeId: string) => {
    const updatedDocs = uploadedDocuments.filter((doc) => doc.documentTypeId !== documentTypeId)
    setUploadedDocuments(updatedDocs)

    // Notify parent component
    if (onDocumentsChange) {
      onDocumentsChange(updatedDocs)
    }
  }

  const getDocumentTypeName = (id: string) => {
    return documentTypes.find((type) => type.id === id)?.name || "Document"
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="document-type">Type de document</Label>
            <Select value={selectedDocumentType || ""} onValueChange={handleDocumentTypeChange}>
              <SelectTrigger id="document-type" className="mt-1.5">
                <SelectValue placeholder="Sélectionner un type de document" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={!selectedDocumentType}
              />
              <Button type="button" disabled={!selectedDocumentType} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Documents téléchargés</h3>
        {uploadedDocuments.length > 0 ? (
          <div className="space-y-2">
            {uploadedDocuments.map((doc) => (
              <div
                key={doc.documentTypeId}
                className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{getDocumentTypeName(doc.documentTypeId)}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.file.name} ({(doc.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.documentTypeId)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun document téléchargé</p>
        )}
      </div>
    </div>
  )
}

