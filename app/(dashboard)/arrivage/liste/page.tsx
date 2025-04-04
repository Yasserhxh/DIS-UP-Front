"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, MoreHorizontal, FileText, Trash2, CreditCard, Truck, ClipboardCheck } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { useToast } from "@/hooks/use-toast"

// Mock data for arrivages
const mockArrivages = [
  {
    id: "ARR-2025-001",
    commandeNumber: "CMD-2025-458",
    fournisseur: "ArcelorMittal",
    dateCreation: "15/01/2025",
    tonnage: 5000,
    statut: "En cours",
    dateArrivee: "25/02/2025",
  },
  {
    id: "ARR-2025-002",
    commandeNumber: "CMD-2025-459",
    fournisseur: "Tata Steel",
    dateCreation: "20/01/2025",
    tonnage: 3500,
    statut: "Planifié",
    dateArrivee: "10/03/2025",
  },
  {
    id: "ARR-2025-003",
    commandeNumber: "CMD-2025-460",
    fournisseur: "POSCO",
    dateCreation: "25/01/2025",
    tonnage: 4200,
    statut: "En transit",
    dateArrivee: "05/03/2025",
  },
  {
    id: "ARR-2025-004",
    commandeNumber: "CMD-2025-461",
    fournisseur: "Nippon Steel",
    dateCreation: "01/02/2025",
    tonnage: 6000,
    statut: "Planifié",
    dateArrivee: "15/03/2025",
  },
  {
    id: "ARR-2025-005",
    commandeNumber: "CMD-2025-462",
    fournisseur: "ArcelorMittal",
    dateCreation: "05/02/2025",
    tonnage: 4800,
    statut: "En cours",
    dateArrivee: "30/03/2025",
  },
]

export default function ListeArrivagesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [arrivages, setArrivages] = useState(mockArrivages)
  const [arrivageToDelete, setArrivageToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Cleanup function to ensure pointer-events are reset when component unmounts
    return () => {
      document.body.style.pointerEvents = ""
    }
  }, [])

  // Filter arrivages based on search query and status filter
  const filteredArrivages = arrivages.filter((arrivage) => {
    const matchesSearch =
      arrivage.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      arrivage.commandeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      arrivage.fournisseur.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || arrivage.statut === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCreateNew = () => {
    router.push("/arrivage/creation")
  }

  const handleDelete = (id: string) => {
    // Reset any lingering pointer-events styles
    document.body.style.pointerEvents = ""

    // Set the arrivage to delete and open the dialog
    setArrivageToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (arrivageToDelete) {
      // In a real app, you would call an API to delete the item
      setArrivages(arrivages.filter((item) => item.id !== arrivageToDelete))

      toast({
        title: "Arrivage supprimé",
        description: `L'arrivage ${arrivageToDelete} a été supprimé avec succès.`,
      })

      // Make sure to close the dialog and reset the state
      setIsDeleteDialogOpen(false)
      setArrivageToDelete(null)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Liste des arrivages</h2>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel arrivage
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Arrivages</CardTitle>
          <CardDescription>Liste des arrivages de ferraille importée</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, commande ou fournisseur..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Planifié">Planifié</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="En transit">En transit</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Arrivage</TableHead>
                  <TableHead>N° Commande</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead className="hidden md:table-cell">Date création</TableHead>
                  <TableHead className="hidden md:table-cell">Tonnage</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden md:table-cell">Date arrivée</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArrivages.length > 0 ? (
                  filteredArrivages.map((arrivage) => (
                    <TableRow key={arrivage.id}>
                      <TableCell className="font-medium">{arrivage.id}</TableCell>
                      <TableCell>{arrivage.commandeNumber}</TableCell>
                      <TableCell>{arrivage.fournisseur}</TableCell>
                      <TableCell className="hidden md:table-cell">{arrivage.dateCreation}</TableCell>
                      <TableCell className="hidden md:table-cell">{arrivage.tonnage} tonnes</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            arrivage.statut === "En cours"
                              ? "default"
                              : arrivage.statut === "En transit"
                                ? "secondary"
                                : arrivage.statut === "Planifié"
                                  ? "outline"
                                  : "success"
                          }
                        >
                          {arrivage.statut}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{arrivage.dateArrivee}</TableCell>
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
                            <DropdownMenuItem onClick={() => router.push(`/arrivage/${arrivage.id}/details`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/arrivage/${arrivage.id}/paiement`)}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Paiement
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/arrivage/${arrivage.id}/logistique`)}>
                              <Truck className="mr-2 h-4 w-4" />
                              Logistique
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-muted-foreground cursor-not-allowed">
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              Qualification
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(arrivage.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucun arrivage trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet arrivage ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'arrivage {arrivageToDelete} sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setArrivageToDelete(null)
                // Ensure we reset the dialog state completely
                setTimeout(() => {
                  document.body.style.pointerEvents = ""
                }, 100)
              }}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

