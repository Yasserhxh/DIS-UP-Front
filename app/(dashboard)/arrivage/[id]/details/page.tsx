"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { SearchableSelect } from "@/components/forms/searchable-select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

// Sample data for dropdowns
const paysOptions = [
  { value: "maroc", label: "Maroc" },
  { value: "france", label: "France" },
  { value: "espagne", label: "Espagne" },
  { value: "allemagne", label: "Allemagne" },
  { value: "italie", label: "Italie" },
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
]

const qualiteOptions = [
  { value: "e1", label: "E1" },
  { value: "e2", label: "E2" },
  { value: "e3", label: "E3" },
  { value: "e4", label: "E4" },
]

// Mock data for commandes
const mockCommandes = [
  { id: "CMD-2025-001", qualite: "E1", tonnage: 1200, prixUnitaire: 450, tauxChange: 10.8 },
  { id: "CMD-2025-002", qualite: "E2", tonnage: 800, prixUnitaire: 420, tauxChange: 10.8 },
]

export default function ArrivageDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const arrivageId = params.id as string

  const [searchCommandeQuery, setSearchCommandeQuery] = useState("")
  const [commandes, setCommandes] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(false)

  // Add effect to handle body overflow when accordion is open
  useEffect(() => {
    // No need to modify body overflow
    return () => {
      // Cleanup
    }
  }, [accordionOpen])

  // Form state with mock data
  const [formData, setFormData] = useState({
    description: "Arrivage de ferraille E1 et E2",
    numeroFactureProforma: "FP-2025-0458",
    dateReceptionFacture: new Date("2025-01-10"),
    pays: "france",
    fournisseur: "arcelormittal",
    devise: "eur",
    tonnageTotal: "2000",
    toleranceTonnage: "5",
    dateBooking: new Date("2025-01-20"),
    coutFinancement: "25000",
    coutFretDevise: "350000",
    montantTaxes: "20000",
    dateSignatureContrat: new Date("2025-01-05"),
    banque: "attijariwafa",
    dateDepotLettreCredit: new Date("2025-01-12"),
    dateDemandeLicence: new Date("2025-01-15"),
    dateObtentionLicence: new Date("2025-01-25"),
    portChargement: "rotterdam",
    dateLimiteChargement: new Date("2025-02-10"),
    dateDebutChargement: new Date("2025-02-05"),
    poidsDepart: "2010",
    poidsArrivee: "1990",
    poidsMoyen: "2000",
    qualiteDepart: "premium",
    qualiteArrivee: "premium",
    qualiteMoyenne: "premium",
    dateHeureNOR: new Date("2025-02-15"),
    tauxDechargement: new Date("2025-02-20"),
    dispatchDemurrage: true,
    conditionsAchat: "Conditions standard d'achat",
    informationsContractuelles: "Informations contractuelles standard",
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
      title: "Arrivage mis à jour",
      description: "Les détails de l'arrivage ont été mis à jour avec succès.",
    })
  }

  const handleSearchCommande = () => {
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setCommandes(mockCommandes)
      setIsSearching(false)
    }, 800)
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
        <h2 className="text-3xl font-bold tracking-tight">Détails de l'arrivage {arrivageId}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails d'arrivage</CardTitle>
          <CardDescription>Consultez et modifiez les informations de l'arrivage</CardDescription>
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

            {/* Accordion for additional details */}
            <div className="relative">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                onValueChange={(value) => setAccordionOpen(!!value)}
              >
                <AccordionItem value="plus-details">
                  <AccordionTrigger className="text-lg font-medium">Plus de détails</AccordionTrigger>
                  <AccordionContent className="overflow-visible">
                    <div className="space-y-6">
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
                          <Select
                            value={formData.banque}
                            onValueChange={(value) => handleSelectChange("banque", value)}
                          >
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
                          <DatePicker
                            date={formData.dateHeureNOR}
                            setDate={(date) => handleDateChange("dateHeureNOR", date)}
                          />
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

                      {/* Documents téléchargés */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Documents téléchargés</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">Facture Proforma</p>
                                <p className="text-xs text-muted-foreground">facture-proforma-2025-458.pdf (1.2 MB)</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">Contrat</p>
                                <p className="text-xs text-muted-foreground">contrat-arcelormittal-2025.pdf (3.5 MB)</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">Licence d'Import</p>
                                <p className="text-xs text-muted-foreground">licence-import-2025-123.pdf (0.8 MB)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Gestion des commandes */}
            <div className="space-y-6 mt-8">
              <h3 className="text-xl font-semibold">Gestion des commandes</h3>

              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="searchCommande">N° de commande</Label>
                  <Input
                    id="searchCommande"
                    value={searchCommandeQuery}
                    onChange={(e) => setSearchCommandeQuery(e.target.value)}
                    placeholder="Entrez un numéro de commande"
                  />
                </div>
                <Button type="button" onClick={handleSearchCommande} disabled={isSearching}>
                  {isSearching ? "Recherche..." : "Rechercher"}
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {commandes.length > 0 && (
                <div className="rounded-md border mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N° Commande</TableHead>
                        <TableHead>Qualité</TableHead>
                        <TableHead>Tonnage</TableHead>
                        <TableHead>Prix Unitaire Final</TableHead>
                        <TableHead>Taux de change</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commandes.map((commande) => (
                        <TableRow key={commande.id}>
                          <TableCell className="font-medium">{commande.id}</TableCell>
                          <TableCell>{commande.qualite}</TableCell>
                          <TableCell>{commande.tonnage} tonnes</TableCell>
                          <TableCell>{commande.prixUnitaire} €/tonne</TableCell>
                          <TableCell>{commande.tauxChange}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                <DropdownMenuItem>Voir détails</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Submit buttons */}
            <div className="flex justify-end gap-4 pt-4 pb-6">
              <Button variant="outline" type="button" onClick={() => router.push("/arrivage/liste")}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

