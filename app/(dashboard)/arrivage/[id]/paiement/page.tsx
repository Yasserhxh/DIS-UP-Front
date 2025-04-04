"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { SearchableSelect } from "@/components/forms/searchable-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for dropdowns
const banqueOptions = [
  { value: "attijariwafa", label: "Attijariwafa Bank" },
  { value: "bmce", label: "BMCE Bank (Bank of Africa)" },
  { value: "bcp", label: "Banque Centrale Populaire" },
  { value: "cih", label: "CIH Bank" },
  { value: "sgma", label: "Société Générale Maroc" },
  { value: "cdm", label: "Crédit du Maroc" },
  { value: "cfg", label: "CFG Bank" },
  { value: "albarid", label: "Al Barid Bank" },
]

const modePaiementOptions = [
  { value: "virement", label: "Virement bancaire" },
  { value: "lettre-credit", label: "Lettre de crédit" },
  { value: "cheque", label: "Chèque" },
  { value: "especes", label: "Espèces" },
]

export default function ArrivagePaiementPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const arrivageId = params.id as string

  // Form state with mock data (read-only)
  const formData = {
    description: "Arrivage de ferraille E1 et E2",
    numeroFactureProforma: "FP-2025-0458",
    dateReceptionFacture: new Date("2025-01-10"),
    pays: "France",
    fournisseur: "ArcelorMittal",
    devise: "EUR",
    tonnageTotal: "2000",
    toleranceTonnage: "5",
    dateBooking: new Date("2025-01-20"),
  }

  // Paiement form state
  const [paiementData, setPaiementData] = useState({
    banque: "",
    modePaiement: "",
    referenceSwift: "",
    dateSwift: null as Date | null,
    files: [] as File[],
  })

  const handleSelectChange = (name: string, value: string) => {
    setPaiementData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaiementData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | null) => {
    setPaiementData((prev) => ({ ...prev, dateSwift: date }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPaiementData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files as FileList)],
      }))
    }
  }

  const handleRemoveFile = (index: number) => {
    setPaiementData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Paiement submitted:", paiementData)

    toast({
      title: "Paiement enregistré",
      description: "Les informations de paiement ont été enregistrées avec succès.",
    })

    router.push("/arrivage/liste")
  }

  // Helper component for form row
  const FormRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ${className}`}>{children}</div>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/arrivage/liste">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Paiement de l'arrivage {arrivageId}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de paiement</CardTitle>
          <CardDescription>Enregistrez les informations de paiement pour cet arrivage</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <FormRow>
              <div className="space-y-2 col-span-full">
                <Label>Description</Label>
                <Input value={formData.description} disabled />
              </div>
            </FormRow>

            {/* Facture Proforma */}
            <FormRow>
              <div className="space-y-2">
                <Label>Numéro Facture Proforma</Label>
                <Input value={formData.numeroFactureProforma} disabled />
              </div>
              <div className="space-y-2">
                <Label>Date Réception Facture Proforma</Label>
                <Input value={formData.dateReceptionFacture.toLocaleDateString("fr-FR")} disabled />
              </div>
            </FormRow>

            {/* Pays, Fournisseur, Devise */}
            <FormRow>
              <div className="space-y-2">
                <Label>Pays</Label>
                <Input value={formData.pays} disabled />
              </div>
              <div className="space-y-2">
                <Label>Fournisseur</Label>
                <Input value={formData.fournisseur} disabled />
              </div>
              <div className="space-y-2">
                <Label>Devise</Label>
                <Input value={formData.devise} disabled />
              </div>
            </FormRow>

            {/* Tonnage */}
            <FormRow>
              <div className="space-y-2">
                <Label>Tonnage Total</Label>
                <Input value={`${formData.tonnageTotal} tonnes`} disabled />
              </div>
              <div className="space-y-2">
                <Label>Tolérance Tonnage</Label>
                <Input value={`${formData.toleranceTonnage}%`} disabled />
              </div>
            </FormRow>

            {/* Date Booking */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Booking</Label>
                <Input value={formData.dateBooking.toLocaleDateString("fr-FR")} disabled />
              </div>
            </FormRow>

            {/* Section Paiement */}
            <div className="space-y-6 mt-8">
              <h3 className="text-xl font-semibold">Paiement</h3>

              <FormRow>
                <div className="space-y-2">
                  <Label>Banque</Label>
                  <SearchableSelect
                    options={banqueOptions}
                    value={paiementData.banque}
                    onChange={(value) => handleSelectChange("banque", value)}
                    placeholder="Sélectionner une banque"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mode de paiement</Label>
                  <Select
                    value={paiementData.modePaiement}
                    onValueChange={(value) => handleSelectChange("modePaiement", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un mode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      {modePaiementOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormRow>

              <FormRow>
                <div className="space-y-2">
                  <Label htmlFor="referenceSwift">Référence du SWIFT</Label>
                  <Input
                    id="referenceSwift"
                    name="referenceSwift"
                    value={paiementData.referenceSwift}
                    onChange={handleInputChange}
                    placeholder="Ex: SWIFT-2025-12345"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date SWIFT</Label>
                  <DatePicker date={paiementData.dateSwift} setDate={handleDateChange} />
                </div>
              </FormRow>

              <div className="space-y-2">
                <Label>Pièces jointes</Label>
                <div className="border border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Glissez-déposez des fichiers ici ou cliquez pour parcourir
                    </p>
                    <Input type="file" className="hidden" id="file-upload" multiple onChange={handleFileChange} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Parcourir les fichiers
                    </Button>
                  </div>
                </div>

                {paiementData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Fichiers sélectionnés:</p>
                    <ul className="space-y-2">
                      {paiementData.files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                            Supprimer
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Submit buttons */}
            <div className="flex justify-end gap-4 pt-4 pb-6">
              <Button variant="outline" type="button" onClick={() => router.push("/arrivage/liste")}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer le paiement</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

