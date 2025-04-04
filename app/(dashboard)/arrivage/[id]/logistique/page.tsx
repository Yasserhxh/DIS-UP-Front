"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  MoreHorizontal,
  Plus,
  Ship,
  ThumbsDown,
  ThumbsUp,
  FileText,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/ui/date-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SearchableSelect } from "@/components/forms/searchable-select"
import { DocumentUploadSection, type DocumentType } from "@/components/forms/document-upload-section"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Sample data for read-only form
const formData = {
  description: "Arrivage de ferraille E1 et E2",
  numeroFactureProforma: "FP-2025-0458",
  dateReceptionFacture: "10/01/2025",
  pays: "France",
  fournisseur: "ArcelorMittal",
  devise: "EUR",
  tonnageTotal: "2000 tonnes",
  toleranceTonnage: "5%",
  dateBooking: "20/01/2025",
}

// Sample data for planning table
const planningData = [
  {
    id: 1,
    dateDepart: "15/02/2025",
    dateArrivee: "25/02/2025",
    dateAccostage: "26/02/2025",
  },
  {
    id: 2,
    dateDepart: "20/02/2025",
    dateArrivee: "01/03/2025",
    dateAccostage: "02/03/2025",
  },
]

// Sample data for navires table
const naviresData = [
  {
    id: 1,
    navire: "Cargo Express",
    dateArriveeChargement: "10/02/2025",
    dateFinChargement: "15/02/2025",
    dateDepart: "16/02/2025",
    dateArriveeDecharge: "26/02/2025",
    status: "pending",
  },
  {
    id: 2,
    navire: "Ocean Voyager",
    dateArriveeChargement: "12/02/2025",
    dateFinChargement: "18/02/2025",
    dateDepart: "19/02/2025",
    dateArriveeDecharge: "01/03/2025",
    status: "pending",
  },
  {
    id: 3,
    navire: "Maritime Star",
    dateArriveeChargement: "15/02/2025",
    dateFinChargement: "20/02/2025",
    dateDepart: "21/02/2025",
    dateArriveeDecharge: "03/03/2025",
    status: "pending",
  },
]

// Document types for uploads in procedure portuaire
const documentTypesProcedure: DocumentType[] = [
  { id: "dum", name: "Document Unique de Marchandise", required: false },
  { id: "nor", name: "Notice of Readiness", required: false },
  { id: "bill-lading", name: "Bill of Lading", required: false },
  { id: "certificat-origine", name: "Certificat d'Origine", required: false },
  { id: "certificat-qualite", name: "Certificat de Qualité", required: false },
  { id: "autorisation-douane", name: "Autorisation Douanière", required: false },
]

// Document types for uploads in qualification
const documentTypesQualification: DocumentType[] = [
  { id: "rapport-inspection", name: "Rapport d'inspection", required: false },
  { id: "certificat-qualite", name: "Certificat de qualité", required: false },
  { id: "photos", name: "Photos", required: false },
  { id: "autres", name: "Autres documents", required: false },
]

// Sample data for surveillants
const typeSurveillantOptions = [
  { value: "interne", label: "Interne" },
  { value: "externe", label: "Externe" },
  { value: "consultant", label: "Consultant" },
]

const paysOptions = [
  { value: "maroc", label: "Maroc" },
  { value: "france", label: "France" },
  { value: "espagne", label: "Espagne" },
  { value: "allemagne", label: "Allemagne" },
  { value: "italie", label: "Italie" },
]

const surveillantOptions = [
  { value: "bureau-veritas", label: "Bureau Veritas" },
  { value: "sgs", label: "SGS" },
  { value: "intertek", label: "Intertek" },
  { value: "cotecna", label: "Cotecna" },
  { value: "control-union", label: "Control Union" },
]

// Sample data for surveillants table
const surveillantsData = [
  { id: 1, type: "Externe", surveillant: "Bureau Veritas" },
  { id: 2, type: "Interne", surveillant: "Équipe Qualité SONASID" },
]

// Sample data for commandes
const commandeOptions = [
  { value: "cmd-001", label: "CMD-2025-001" },
  { value: "cmd-002", label: "CMD-2025-002" },
  { value: "cmd-003", label: "CMD-2025-003" },
]

// Sample data for autorisation transfert
const commandesData = [
  { id: "CMD-2025-001", qualite: "E1", quantite: "800T", autorise: false },
  { id: "CMD-2025-002", qualite: "E2", quantite: "1200T", autorise: true },
  { id: "CMD-2025-003", qualite: "E1", quantite: "500T", autorise: false },
]

// Sample data for suivi déchargement
const suiviDechargementData = [
  { id: 1, date: "26/02/2025", quantiteDechargee: "300T", quantiteRestante: "1700T" },
  { id: 2, date: "27/02/2025", quantiteDechargee: "450T", quantiteRestante: "1250T" },
]

// Types d'incidents options
const typeIncidentOptions = [
  { value: "technique", label: "Problème technique" },
  { value: "securite", label: "Incident de sécurité" },
  { value: "retard", label: "Retard important" },
  { value: "qualite", label: "Problème de qualité" },
  { value: "autre", label: "Autre" },
]

export default function ArrivageLogistiquePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const arrivageId = params.id as string

  const [activeTab, setActiveTab] = useState("planning")
  const [dateDepart, setDateDepart] = useState<Date | null>(null)
  const [dateArrivee, setDateArrivee] = useState<Date | null>(null)
  const [dateAccostage, setDateAccostage] = useState<Date | null>(null)

  // Procedure portuaire form state
  const [procedureForm, setProcedureForm] = useState({
    numeroDUM: "",
    dateDUM: null as Date | null,
    tauxCharge: "",
    dateNOR: null as Date | null,
    heureNOR: "",
    dateAccostageNavire: null as Date | null,
  })

  // Surveillant form state
  const [surveillantForm, setSurveillantForm] = useState({
    typeSurveillant: "",
    pays: "",
    surveillant: "",
  })

  // Qualification dialog state
  const [isQualificationDialogOpen, setIsQualificationDialogOpen] = useState(false)
  const [selectedSurveillantId, setSelectedSurveillantId] = useState<number | null>(null)
  const [qualificationForm, setQualificationForm] = useState({
    dateQualification: null as Date | null,
    commande: "",
    commentaire: "",
  })

  // Autorisation transfert state
  const [commandes, setCommandes] = useState(commandesData)
  const [isAutoriserDialogOpen, setIsAutoriserDialogOpen] = useState(false)
  const [selectedCommandeId, setSelectedCommandeId] = useState<string | null>(null)

  // Déchargement form state
  const [dechargementForm, setDechargementForm] = useState({
    dateDebut: null as Date | null,
    dateFin: null as Date | null,
  })

  // Suivi déchargement form state
  const [suiviDechargementForm, setSuiviDechargementForm] = useState({
    date: null as Date | null,
    quantiteDechargee: "",
    quantiteRestante: "",
  })

  // Suivi déchargement data state
  const [suiviDechargement, setSuiviDechargement] = useState(suiviDechargementData)

  // Add this to the state declarations at the top of the component
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false)
  const [selectedSurveillantForConsultation, setSelectedSurveillantForConsultation] = useState<any>(null)

  // Incident dialog state
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false)
  const [incidentForm, setIncidentForm] = useState({
    type: "",
    date: new Date() as Date | null,
    heureSurvenue: "",
    heureResolution: "",
    commentaire: "",
  })

  const handleAddPlanning = () => {
    toast({
      title: "Planning ajouté",
      description: "Le planning a été ajouté avec succès.",
    })

    // Reset form
    setDateDepart(null)
    setDateArrivee(null)
    setDateAccostage(null)
  }

  const handleApproveNavire = (id: number) => {
    toast({
      title: "Navire approuvé",
      description: `Le navire #${id} a été approuvé avec succès.`,
    })
  }

  const handleRejectNavire = (id: number) => {
    toast({
      title: "Navire rejeté",
      description: `Le navire #${id} a été rejeté.`,
    })
  }

  const handleProcedureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProcedureForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleProcedureDateChange = (name: string, date: Date | null) => {
    setProcedureForm((prev) => ({ ...prev, [name]: date }))
  }

  const handleSurveillantSelectChange = (name: string, value: string) => {
    setSurveillantForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSurveillant = () => {
    // In a real app, you would call an API to add the surveillant
    toast({
      title: "Surveillant ajouté",
      description: "Le surveillant a été ajouté avec succès.",
    })

    // Reset form
    setSurveillantForm({
      typeSurveillant: "",
      pays: "",
      surveillant: "",
    })
  }

  const handleOpenQualification = (id: number) => {
    setSelectedSurveillantId(id)
    setIsQualificationDialogOpen(true)
  }

  const handleQualificationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQualificationForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleQualificationDateChange = (date: Date | null) => {
    setQualificationForm((prev) => ({ ...prev, dateQualification: date }))
  }

  const handleQualificationSubmit = () => {
    // In a real app, you would call an API to submit the qualification
    toast({
      title: "Qualification enregistrée",
      description: "La qualification a été enregistrée avec succès.",
    })

    // Close dialog and reset form
    setIsQualificationDialogOpen(false)
    setSelectedSurveillantId(null)
    setQualificationForm({
      dateQualification: null,
      commande: "",
      commentaire: "",
    })
  }

  const handleSaveProcedure = () => {
    toast({
      title: "Procédure enregistrée",
      description: "Les informations de procédure portuaire ont été enregistrées avec succès.",
    })
  }

  const handleOpenAutoriserDialog = (id: string) => {
    setSelectedCommandeId(id)
    setIsAutoriserDialogOpen(true)
  }

  const handleAutoriserCommande = () => {
    if (selectedCommandeId) {
      // Update the commandes state to mark the selected commande as authorized
      setCommandes((prev) =>
        prev.map((commande) => (commande.id === selectedCommandeId ? { ...commande, autorise: true } : commande)),
      )

      toast({
        title: "Commande autorisée",
        description: `La commande ${selectedCommandeId} a été autorisée avec succès.`,
      })

      // Close dialog and reset selected commande
      setIsAutoriserDialogOpen(false)
      setSelectedCommandeId(null)
    }
  }

  const handleDechargementDateChange = (name: string, date: Date | null) => {
    setDechargementForm((prev) => ({ ...prev, [name]: date }))
  }

  const handleSaveDechargement = () => {
    toast({
      title: "Dates de déchargement enregistrées",
      description: "Les dates de déchargement ont été enregistrées avec succès.",
    })

    // Reset form
    setDechargementForm({
      dateDebut: null,
      dateFin: null,
    })
  }

  const handleSuiviDechargementDateChange = (date: Date | null) => {
    setSuiviDechargementForm((prev) => ({ ...prev, date }))
  }

  const handleSuiviDechargementInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSuiviDechargementForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSuiviDechargement = () => {
    // Create a new suivi déchargement entry
    const newEntry = {
      id: suiviDechargement.length + 1,
      date: suiviDechargementForm.date ? suiviDechargementForm.date.toLocaleDateString("fr-FR") : "N/A",
      quantiteDechargee: suiviDechargementForm.quantiteDechargee,
      quantiteRestante: suiviDechargementForm.quantiteRestante,
    }

    // Add the new entry to the state
    setSuiviDechargement((prev) => [...prev, newEntry])

    toast({
      title: "Suivi de déchargement ajouté",
      description: "Le suivi de déchargement a été ajouté avec succès.",
    })

    // Reset form
    setSuiviDechargementForm({
      date: null,
      quantiteDechargee: "",
      quantiteRestante: "",
    })
  }

  // Add this function to handle opening the consultation dialog
  const handleOpenConsultation = (item: any) => {
    setSelectedSurveillantForConsultation(item)
    setIsConsultationDialogOpen(true)
  }

  // Handle incident form changes
  const handleIncidentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setIncidentForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleIncidentDateChange = (date: Date | null) => {
    setIncidentForm((prev) => ({ ...prev, date }))
  }

  const handleIncidentSelectChange = (value: string) => {
    setIncidentForm((prev) => ({ ...prev, type: value }))
  }

  const handleSubmitIncident = () => {
    toast({
      title: "Incident signalé",
      description: "L'incident a été signalé avec succès.",
    })

    // Close dialog and reset form
    setIsIncidentDialogOpen(false)
    setIncidentForm({
      type: "",
      date: new Date(),
      heureSurvenue: "",
      heureResolution: "",
      commentaire: "",
    })
  }

  // Helper component for form row
  const FormRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ${className}`}>{children}</div>
  )

  // Add CSS for dark upload buttons
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .upload-dark button[type="button"] {
        background-color: var(--sonasid-dark);
        color: white;
      }
      .upload-dark button[type="button"]:hover {
        background-color: var(--sonasid-dark);
        opacity: 0.9;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/arrivage/liste">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Logistique de l'arrivage {arrivageId}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations logistiques</CardTitle>
          <CardDescription>Gérez les informations logistiques pour cet arrivage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
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
                <Input value={formData.dateReceptionFacture} disabled />
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
                <Input value={formData.tonnageTotal} disabled />
              </div>
              <div className="space-y-2">
                <Label>Tolérance Tonnage</Label>
                <Input value={formData.toleranceTonnage} disabled />
              </div>
            </FormRow>

            {/* Date Booking */}
            <FormRow>
              <div className="space-y-2">
                <Label>Date Booking</Label>
                <Input value={formData.dateBooking} disabled />
              </div>
            </FormRow>

            {/* Logistics Tabs */}
            <div className="space-y-6 mt-8">
              <div className="flex flex-wrap space-x-2 border-b">
                {[
                  { id: "planning", label: "Planning d'arrivage" },
                  { id: "nomination", label: "Nomination Navire" },
                  { id: "surveillance", label: "Surveillant et qualification" },
                  { id: "autorisation", label: "Autorisation Transfert" },
                  { id: "procedure", label: "Procédure Portuaire" },
                  { id: "dechargement", label: "Déchargement du navire" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-t-lg transition-colors",
                      activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 border rounded-md min-h-[300px]">
                {activeTab === "planning" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Date de départ</Label>
                        <DatePicker date={dateDepart} setDate={setDateDepart} />
                      </div>
                      <div className="space-y-2">
                        <Label>Date d'arrivée</Label>
                        <DatePicker date={dateArrivee} setDate={setDateArrivee} />
                      </div>
                      <div className="space-y-2">
                        <Label>Date d'accostage</Label>
                        <DatePicker date={dateAccostage} setDate={setDateAccostage} />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleAddPlanning}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>

                    <div className="rounded-md border mt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>N°</TableHead>
                            <TableHead>Date de départ</TableHead>
                            <TableHead>Date d'arrivée</TableHead>
                            <TableHead>Date d'accostage</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {planningData.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.id}</TableCell>
                              <TableCell>{item.dateDepart}</TableCell>
                              <TableCell>{item.dateArrivee}</TableCell>
                              <TableCell>{item.dateAccostage}</TableCell>
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
                                    <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {activeTab === "nomination" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Liste des propositions des navires</h3>

                    <div className="rounded-md border mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Navire</TableHead>
                            <TableHead>Date d'arrivée au port de chargement</TableHead>
                            <TableHead>Date de fin de chargement</TableHead>
                            <TableHead>Date de départ</TableHead>
                            <TableHead>Date d'arrivée au port de déchargement</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {naviresData.map((navire) => (
                            <TableRow key={navire.id}>
                              <TableCell className="font-medium">{navire.navire}</TableCell>
                              <TableCell>{navire.dateArriveeChargement}</TableCell>
                              <TableCell>{navire.dateFinChargement}</TableCell>
                              <TableCell>{navire.dateDepart}</TableCell>
                              <TableCell>{navire.dateArriveeDecharge}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleApproveNavire(navire.id)}>
                                      <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                                      Valider
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRejectNavire(navire.id)}>
                                      <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                                      Rejeter
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {activeTab === "surveillance" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Surveillant et qualification</h3>

                    <div className="space-y-6">
                      <FormRow>
                        <div className="space-y-2">
                          <Label>Type surveillant</Label>
                          <Select
                            value={surveillantForm.typeSurveillant}
                            onValueChange={(value) => handleSurveillantSelectChange("typeSurveillant", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                              {typeSurveillantOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Pays</Label>
                          <SearchableSelect
                            options={paysOptions}
                            value={surveillantForm.pays}
                            onChange={(value) => handleSurveillantSelectChange("pays", value)}
                            placeholder="Sélectionner un pays"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Surveillant</Label>
                          <SearchableSelect
                            options={surveillantOptions}
                            value={surveillantForm.surveillant}
                            onChange={(value) => handleSurveillantSelectChange("surveillant", value)}
                            placeholder="Sélectionner un surveillant"
                          />
                        </div>
                      </FormRow>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleAddSurveillant}
                          disabled={
                            !surveillantForm.typeSurveillant || !surveillantForm.pays || !surveillantForm.surveillant
                          }
                        >
                          Enregistrer
                        </Button>
                      </div>

                      <div className="rounded-md border mt-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type surveillant</TableHead>
                              <TableHead>Surveillant</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {surveillantsData.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.surveillant}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleOpenConsultation(item)}>
                                        Consulter
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleOpenQualification(item.id)}>
                                        Qualifier
                                      </DropdownMenuItem>
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
                    </div>

                    {/* Qualification Dialog */}
                    <Dialog open={isQualificationDialogOpen} onOpenChange={setIsQualificationDialogOpen}>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Formulaire de qualification</DialogTitle>
                          <DialogDescription>
                            Remplissez les informations de qualification pour ce surveillant.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label>Date de qualification</Label>
                            <DatePicker
                              date={qualificationForm.dateQualification}
                              setDate={handleQualificationDateChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Commande</Label>
                            <Select
                              value={qualificationForm.commande}
                              onValueChange={(value) => setQualificationForm((prev) => ({ ...prev, commande: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une commande" />
                              </SelectTrigger>
                              <SelectContent>
                                {commandeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="commentaire">Commentaire</Label>
                            <Textarea
                              id="commentaire"
                              name="commentaire"
                              value={qualificationForm.commentaire}
                              onChange={handleQualificationInputChange}
                              placeholder="Commentaires sur la qualification"
                              rows={4}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Pièces jointes</Label>
                            <DocumentUploadSection documentTypes={documentTypesQualification} className="upload-dark" />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsQualificationDialogOpen(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleQualificationSubmit}>Enregistrer</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Consultation Dialog */}
                    <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Détails du surveillant</DialogTitle>
                          <DialogDescription>Informations détaillées sur le surveillant.</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          {selectedSurveillantForConsultation && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm text-muted-foreground">Type</Label>
                                  <p className="font-medium">{selectedSurveillantForConsultation.type}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">Nom</Label>
                                  <p className="font-medium">{selectedSurveillantForConsultation.surveillant}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm text-muted-foreground">Documents</Label>
                                <div className="mt-2 space-y-2">
                                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-5 w-5 text-primary" />
                                      <div>
                                        <p className="font-medium text-sm">Rapport d'inspection</p>
                                        <p className="text-xs text-muted-foreground">rapport-inspection.pdf (1.2 MB)</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <DialogFooter>
                          <Button onClick={() => setIsConsultationDialogOpen(false)}>Fermer</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {activeTab === "autorisation" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Autorisation de transfert des commandes</h3>

                    <div className="space-y-4">
                      <h4 className="text-md font-medium">Liste des commandes</h4>

                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>N° Commande</TableHead>
                              <TableHead>Qualité</TableHead>
                              <TableHead>Quantité</TableHead>
                              <TableHead>Autorisation Transfert</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {commandes.map((commande) => (
                              <TableRow key={commande.id}>
                                <TableCell className="font-medium">{commande.id}</TableCell>
                                <TableCell>{commande.qualite}</TableCell>
                                <TableCell>{commande.quantite}</TableCell>
                                <TableCell>
                                  {commande.autorise ? (
                                    <Badge variant="outline" className="text-green-500 border-green-500">
                                      Autorisé
                                    </Badge>
                                  ) : (
                                    <Button
                                      size="sm"
                                      className="bg-dark text-white hover:bg-dark/90"
                                      onClick={() => handleOpenAutoriserDialog(commande.id)}
                                    >
                                      Autoriser
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Autoriser Dialog */}
                    <AlertDialog open={isAutoriserDialogOpen} onOpenChange={setIsAutoriserDialogOpen}>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer l'autorisation</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir autoriser le transfert de cette commande ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={handleAutoriserCommande}>Confirmer</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}

                {activeTab === "procedure" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Procédure Portuaire</h3>

                    <div className="space-y-6">
                      <FormRow>
                        <div className="space-y-2">
                          <Label htmlFor="numeroDUM">N° D.U.M.</Label>
                          <Input
                            id="numeroDUM"
                            name="numeroDUM"
                            value={procedureForm.numeroDUM}
                            onChange={handleProcedureInputChange}
                            placeholder="Ex: DUM-2025-12345"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date D.U.M.</Label>
                          <DatePicker
                            date={procedureForm.dateDUM}
                            setDate={(date) => handleProcedureDateChange("dateDUM", date)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tauxCharge">Taux Charge</Label>
                          <Input
                            id="tauxCharge"
                            name="tauxCharge"
                            value={procedureForm.tauxCharge}
                            onChange={handleProcedureInputChange}
                            placeholder="Ex: 5000 tonnes/jour"
                          />
                        </div>
                      </FormRow>

                      <FormRow>
                        <div className="space-y-2">
                          <Label>Date Notice of Readiness</Label>
                          <DatePicker
                            date={procedureForm.dateNOR}
                            setDate={(date) => handleProcedureDateChange("dateNOR", date)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="heureNOR">Heure Notice of Readiness</Label>
                          <Input
                            id="heureNOR"
                            name="heureNOR"
                            type="time"
                            value={procedureForm.heureNOR}
                            onChange={handleProcedureInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date d'accostage du navire</Label>
                          <DatePicker
                            date={procedureForm.dateAccostageNavire}
                            setDate={(date) => handleProcedureDateChange("dateAccostageNavire", date)}
                          />
                        </div>
                      </FormRow>

                      <div className="space-y-4">
                        <h4 className="text-md font-medium">Pièces jointes</h4>
                        <DocumentUploadSection documentTypes={documentTypesProcedure} className="upload-dark" />
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button onClick={handleSaveProcedure} className="bg-dark text-white hover:bg-dark/90">
                          Enregistrer
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "dechargement" && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
                      >
                        <Calendar className="h-4 w-4" />
                        Consulter le planning de déchargement
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
                        onClick={() => setIsIncidentDialogOpen(true)}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Signaler un incident
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
                      >
                        <Ship className="h-4 w-4" />
                        Consulter la situation: Démurrage/Despatch
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      <div className="space-y-2">
                        <Label>Date de début de déchargement</Label>
                        <DatePicker
                          date={dechargementForm.dateDebut}
                          setDate={(date) => handleDechargementDateChange("dateDebut", date)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date de fin de déchargement</Label>
                        <DatePicker
                          date={dechargementForm.dateFin}
                          setDate={(date) => handleDechargementDateChange("dateFin", date)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={handleSaveDechargement}>Enregistrer</Button>
                      </div>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h5 className="text-md font-medium">Suivi de déchargement</h5>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <DatePicker date={suiviDechargementForm.date} setDate={handleSuiviDechargementDateChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantiteDechargee">Quantité déchargée</Label>
                          <Input
                            id="quantiteDechargee"
                            name="quantiteDechargee"
                            value={suiviDechargementForm.quantiteDechargee}
                            onChange={handleSuiviDechargementInputChange}
                            placeholder="Ex: 300T"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantiteRestante">Quantité restante</Label>
                          <Input
                            id="quantiteRestante"
                            name="quantiteRestante"
                            value={suiviDechargementForm.quantiteRestante}
                            onChange={handleSuiviDechargementInputChange}
                            placeholder="Ex: 1700T"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={handleAddSuiviDechargement}
                            disabled={
                              !suiviDechargementForm.date ||
                              !suiviDechargementForm.quantiteDechargee ||
                              !suiviDechargementForm.quantiteRestante
                            }
                          >
                            Enregistrer
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md border mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Quantité déchargée</TableHead>
                              <TableHead>Quantité restante</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {suiviDechargement.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.quantiteDechargee}</TableCell>
                                <TableCell>{item.quantiteRestante}</TableCell>
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
                                      <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incident Dialog */}
      <Dialog open={isIncidentDialogOpen} onOpenChange={setIsIncidentDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Signaler un incident</DialogTitle>
            <DialogDescription>Veuillez remplir les informations concernant l'incident.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Type d'incident</Label>
              <Select value={incidentForm.type} onValueChange={handleIncidentSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type d'incident" />
                </SelectTrigger>
                <SelectContent>
                  {typeIncidentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker date={incidentForm.date} setDate={handleIncidentDateChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heureSurvenue">Heure de survenue</Label>
                <Input
                  id="heureSurvenue"
                  name="heureSurvenue"
                  type="time"
                  value={incidentForm.heureSurvenue}
                  onChange={handleIncidentInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heureResolution">Heure de résolution</Label>
                <Input
                  id="heureResolution"
                  name="heureResolution"
                  type="time"
                  value={incidentForm.heureResolution}
                  onChange={handleIncidentInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commentaire">Commentaire</Label>
              <Textarea
                id="commentaire"
                name="commentaire"
                value={incidentForm.commentaire}
                onChange={handleIncidentInputChange}
                placeholder="Description détaillée de l'incident"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIncidentDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitIncident}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

