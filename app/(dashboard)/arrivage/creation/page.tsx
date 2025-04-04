"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { DocumentUploadSection, type DocumentType } from "@/components/forms/document-upload-section"
import { SearchableSelect } from "@/components/forms/searchable-select"

// Document types for the upload section
const documentTypes: DocumentType[] = [
  { id: "facture-proforma", name: "Facture Proforma", required: true },
  { id: "contrat", name: "Contrat", required: true },
  { id: "demande-lc", name: "Demande LC ou L'engagement d'import", required: true },
  { id: "licence-import", name: "Licence d'Import", required: true },
  { id: "certificat-non-radio", name: "Certificat de non-Radio Activité", required: false },
  { id: "certificat-non-explosif", name: "Certificat de non explosif", required: true },
]

// Sample data for dropdowns
const paysOptions = [
  { value: "maroc", label: "Maroc" },
  { value: "france", label: "France" },
  { value: "espagne", label: "Espagne" },
  { value: "allemagne", label: "Allemagne" },
  { value: "italie", label: "Italie" },
  { value: "royaume-uni", label: "Royaume-Uni" },
  { value: "etats-unis", label: "États-Unis" },
  { value: "canada", label: "Canada" },
  { value: "chine", label: "Chine" },
  { value: "japon", label: "Japon" },
  { value: "inde", label: "Inde" },
  { value: "bresil", label: "Brésil" },
  { value: "russie", label: "Russie" },
]

const fournisseurOptions = [
  { value: "arcelormittal", label: "ArcelorMittal" },
  { value: "tata-steel", label: "Tata Steel" },
  { value: "posco", label: "POSCO" },
  { value: "nippon-steel", label: "Nippon Steel" },
]

const deviseOptions = [
  { value: "mad", label: "MAD" },
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
  { value: "gbp", label: "GBP" },
]

const banqueOptions = [
  { value: "attijariwafa", label: "Attijariwafa Bank" },
  { value: "bmce", label: "BMCE Bank" },
  { value: "sgma", label: "Société Générale Maroc" },
  { value: "bp", label: "Banque Populaire" },
]

const portOptions = [
  { value: "casablanca", label: "Port Casablanca" },
  { value: "tanger-med", label: "Port Tanger Med" },
  { value: "rotterdam", label: "Port Rotterdam" },
  { value: "anvers", label: "Port Anvers" },
  { value: "marseille", label: "Port Marseille" },
]

const qualiteOptions = [
  { value: "premium", label: "Premium" },
  { value: "standard", label: "Standard" },
  { value: "grade-a", label: "Grade A" },
  { value: "grade-b", label: "Grade B" },
]

export default function CreationArrivagePage() {
  const router = useRouter()
  const { toast } = useToast()

  // Add effect to set overflow hidden on body
  useEffect(() => {
    // Add overflow hidden to body
    document.body.style.overflow = "hidden"

    // Cleanup function to restore original overflow
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // Form state
  const [formData, setFormData] = useState({
    description: "",
    numeroFactureProforma: "",
    dateReceptionFacture: null as Date | null,
    pays: "",
    fournisseur: "",
    devise: "",
    tonnageTotal: "",
    toleranceTonnage: "",
    dateBooking: null as Date | null,
    coutFinancement: "",
    coutFretDevise: "",
    montantTaxes: "",
    dateSignatureContrat: null as Date | null,
    banque: "",
    dateDepotLettreCredit: null as Date | null,
    dateDemandeLicence: null as Date | null,
    dateObtentionLicence: null as Date | null,
    portChargement: "",
    dateLimiteChargement: null as Date | null,
    dateDebutChargement: null as Date | null,
    poidsDepart: "",
    poidsArrivee: "",
    poidsMoyen: "",
    qualiteDepart: "",
    qualiteArrivee: "",
    qualiteMoyenne: "",
    dateHeureNOR: null as Date | null,
    tauxDechargement: null as Date | null,
    dispatchDemurrage: false,
    conditionsAchat: "",
    informationsContractuelles: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)

    // Show success toast
    toast({
      title: "Arrivage créé",
      description: "L'arrivage a été créé avec succès.",
    })

    // Redirect to list page after submission
    router.push("/arrivage/liste")
  }

  // Helper component for form row
  const FormRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ${className}`}>{children}</div>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Création d'arrivage</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulaire de création d'arrivage</CardTitle>
          <CardDescription>Remplissez les informations pour créer un nouvel arrivage</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <FormRow>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de l'arrivage"
                />
              </div>
            </FormRow>

            {/* Facture Proforma */}
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="numeroFactureProforma">Numéro Facture Proforma</Label>
                <Input
                  id="numeroFactureProforma"
                  name="numeroFactureProforma"
                  value={formData.numeroFactureProforma}
                  onChange={handleInputChange}
                  placeholder="Ex: FP-2025-0458"
                />
              </div>
              <div className="space-y-2">
                <Label>Date Réception Facture Proforma</Label>
                <DatePicker
                  date={formData.dateReceptionFacture}
                  setDate={(date) => handleDateChange("dateReceptionFacture", date)}
                />
              </div>
            </FormRow>

            {/* Pays, Fournisseur, Devise */}
            <FormRow>
              <div className="space-y-2">
                <Label>Pays</Label>
                <SearchableSelect
                  options={paysOptions.map((option) => ({ value: option.value, label: option.label }))}
                  value={formData.pays}
                  onChange={(value) => handleSelectChange("pays", value)}
                  placeholder="Sélectionner un pays"
                />
              </div>
              <div className="space-y-2">
                <Label>Fournisseur</Label>
                <Select
                  value={formData.fournisseur}
                  onValueChange={(value) => handleSelectChange("fournisseur", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    {fournisseurOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Devise</Label>
                <Select value={formData.devise} onValueChange={(value) => handleSelectChange("devise", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviseOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormRow>

            {/* Tonnage */}
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="tonnageTotal">Tonnage Total</Label>
                <Input
                  id="tonnageTotal"
                  name="tonnageTotal"
                  type="number"
                  value={formData.tonnageTotal}
                  onChange={handleInputChange}
                  placeholder="Ex: 5000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toleranceTonnage">Tolérance Tonnage</Label>
                <Input
                  id="toleranceTonnage"
                  name="toleranceTonnage"
                  type="number"
                  value={formData.toleranceTonnage}
                  onChange={handleInputChange}
                  placeholder="Ex: 5"
                />
              </div>
            </FormRow>

            {/* Date Booking */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Booking</Label>
                <DatePicker date={formData.dateBooking} setDate={(date) => handleDateChange("dateBooking", date)} />
              </div>
            </FormRow>

            {/* Coûts */}
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="coutFinancement">Coût Financement</Label>
                <Input
                  id="coutFinancement"
                  name="coutFinancement"
                  type="number"
                  step="0.01"
                  value={formData.coutFinancement}
                  onChange={handleInputChange}
                  placeholder="Ex: 25000.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coutFretDevise">Coût Fret En Devise</Label>
                <Input
                  id="coutFretDevise"
                  name="coutFretDevise"
                  type="number"
                  step="0.01"
                  value={formData.coutFretDevise}
                  onChange={handleInputChange}
                  placeholder="Ex: 350000.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="montantTaxes">Montant Taxes</Label>
                <Input
                  id="montantTaxes"
                  name="montantTaxes"
                  type="number"
                  step="0.01"
                  value={formData.montantTaxes}
                  onChange={handleInputChange}
                  placeholder="Ex: 20000.00"
                />
              </div>
            </FormRow>

            {/* Contrat et Banque */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Signature Contrat</Label>
                <DatePicker
                  date={formData.dateSignatureContrat}
                  setDate={(date) => handleDateChange("dateSignatureContrat", date)}
                />
              </div>
              <div className="space-y-2">
                <Label>Banque</Label>
                <Select value={formData.banque} onValueChange={(value) => handleSelectChange("banque", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une banque" />
                  </SelectTrigger>
                  <SelectContent>
                    {banqueOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Dépôt Lettre Crédit</Label>
                <DatePicker
                  date={formData.dateDepotLettreCredit}
                  setDate={(date) => handleDateChange("dateDepotLettreCredit", date)}
                />
              </div>
            </FormRow>

            {/* Licence Import */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Demande Licence Import</Label>
                <DatePicker
                  date={formData.dateDemandeLicence}
                  setDate={(date) => handleDateChange("dateDemandeLicence", date)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date Obtention Licence Import</Label>
                <DatePicker
                  date={formData.dateObtentionLicence}
                  setDate={(date) => handleDateChange("dateObtentionLicence", date)}
                />
              </div>
            </FormRow>

            {/* Port */}
            <FormRow>
              <div className="space-y-2">
                <Label>Port Chargement</Label>
                <Select
                  value={formData.portChargement}
                  onValueChange={(value) => handleSelectChange("portChargement", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un port" />
                  </SelectTrigger>
                  <SelectContent>
                    {portOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormRow>

            {/* Dates Chargement */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Limite Chargement</Label>
                <DatePicker
                  date={formData.dateLimiteChargement}
                  setDate={(date) => handleDateChange("dateLimiteChargement", date)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date Début Chargement</Label>
                <DatePicker
                  date={formData.dateDebutChargement}
                  setDate={(date) => handleDateChange("dateDebutChargement", date)}
                />
              </div>
            </FormRow>

            {/* Poids */}
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="poidsDepart">Poids Départ</Label>
                <Input
                  id="poidsDepart"
                  name="poidsDepart"
                  type="number"
                  step="0.01"
                  value={formData.poidsDepart}
                  onChange={handleInputChange}
                  placeholder="Ex: 5000.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poidsArrivee">Poids Arrivée</Label>
                <Input
                  id="poidsArrivee"
                  name="poidsArrivee"
                  type="number"
                  step="0.01"
                  value={formData.poidsArrivee}
                  onChange={handleInputChange}
                  placeholder="Ex: 4980.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poidsMoyen">Poids Moyen</Label>
                <Input
                  id="poidsMoyen"
                  name="poidsMoyen"
                  type="number"
                  step="0.01"
                  value={formData.poidsMoyen}
                  onChange={handleInputChange}
                  placeholder="Ex: 4990.00"
                />
              </div>
            </FormRow>

            {/* Qualité */}
            <FormRow>
              <div className="space-y-2">
                <Label>Qualité Départ</Label>
                <Select
                  value={formData.qualiteDepart}
                  onValueChange={(value) => handleSelectChange("qualiteDepart", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une qualité" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualiteOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Qualité Arrivée</Label>
                <Select
                  value={formData.qualiteArrivee}
                  onValueChange={(value) => handleSelectChange("qualiteArrivee", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une qualité" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualiteOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Qualité Moyenne</Label>
                <Select
                  value={formData.qualiteMoyenne}
                  onValueChange={(value) => handleSelectChange("qualiteMoyenne", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une qualité" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualiteOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormRow>

            {/* NOR et Déchargement */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Heure NOR</Label>
                <DatePicker date={formData.dateHeureNOR} setDate={(date) => handleDateChange("dateHeureNOR", date)} />
              </div>
              <div className="space-y-2">
                <Label>Taux Déchargement</Label>
                <DatePicker
                  date={formData.tauxDechargement}
                  setDate={(date) => handleDateChange("tauxDechargement", date)}
                />
              </div>
              <div className="space-y-2 flex items-center">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dispatchDemurrage"
                    checked={formData.dispatchDemurrage}
                    onCheckedChange={(checked) => handleSwitchChange("dispatchDemurrage", checked)}
                  />
                  <Label htmlFor="dispatchDemurrage">Dispatch Demurrage</Label>
                </div>
              </div>
            </FormRow>

            {/* Conditions et Informations */}
            <FormRow>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="conditionsAchat">Conditions Achat</Label>
                <Textarea
                  id="conditionsAchat"
                  name="conditionsAchat"
                  value={formData.conditionsAchat}
                  onChange={handleInputChange}
                  placeholder="Conditions d'achat"
                  rows={3}
                />
              </div>
            </FormRow>

            <FormRow>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="informationsContractuelles">Informations Contractuelles</Label>
                <Textarea
                  id="informationsContractuelles"
                  name="informationsContractuelles"
                  value={formData.informationsContractuelles}
                  onChange={handleInputChange}
                  placeholder="Informations contractuelles"
                  rows={3}
                />
              </div>
            </FormRow>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documents</h3>
              <DocumentUploadSection documentTypes={documentTypes} />
            </div>

            {/* Submit buttons */}
            <div className="flex justify-end gap-4 pt-4 pb-6">
              <Button variant="outline" type="button" onClick={() => router.push("/arrivage/liste")}>
                Annuler
              </Button>
              <Button type="submit">Créer l'arrivage</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

