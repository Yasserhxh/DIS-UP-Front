"use client"

import { useState } from "react"
import { AlertTriangle, Clock, RefreshCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Parking data
const parkingLines = [
  {
    id: "A",
    capacity: 8,
    occupied: 6,
    trucks: [
      {
        id: "T-1234",
        arrival: "08:30",
        supplier: "Fournisseur A",
        material: "Ferraille locale",
        order: "CMD-001",
        quality: "Standard",
      },
      {
        id: "T-5678",
        arrival: "09:15",
        supplier: "Fournisseur B",
        material: "Ferraille importée",
        order: "CMD-002",
        quality: "Premium",
      },
      {
        id: "T-9012",
        arrival: "09:45",
        supplier: "Fournisseur C",
        material: "Ferraille locale",
        order: "CMD-003",
        quality: "Standard",
      },
      {
        id: "T-3456",
        arrival: "10:15",
        supplier: "Fournisseur D",
        material: "Co-produits",
        order: "CMD-004",
        quality: "Standard",
      },
      {
        id: "T-7890",
        arrival: "10:45",
        supplier: "Fournisseur E",
        material: "Consommables",
        order: "CMD-005",
        quality: "Standard",
      },
      {
        id: "T-2345",
        arrival: "11:15",
        supplier: "Fournisseur F",
        material: "Ferraille locale",
        order: "CMD-006",
        quality: "Premium",
      },
    ],
  },
  {
    id: "B",
    capacity: 6,
    occupied: 4,
    trucks: [
      {
        id: "T-6789",
        arrival: "08:45",
        supplier: "Fournisseur G",
        material: "Inter-sites",
        order: "CMD-007",
        quality: "Standard",
      },
      {
        id: "T-0123",
        arrival: "09:30",
        supplier: "Fournisseur H",
        material: "Ferraille importée",
        order: "CMD-008",
        quality: "Premium",
      },
      {
        id: "T-4567",
        arrival: "10:00",
        supplier: "Fournisseur I",
        material: "Ferraille locale",
        order: "CMD-009",
        quality: "Standard",
      },
      {
        id: "T-8901",
        arrival: "10:30",
        supplier: "Fournisseur J",
        material: "Ferraille importée",
        order: "CMD-010",
        quality: "Standard",
      },
    ],
  },
  {
    id: "C",
    capacity: 5,
    occupied: 2,
    trucks: [
      {
        id: "T-2468",
        arrival: "09:00",
        supplier: "Fournisseur K",
        material: "Ferraille locale",
        order: "CMD-011",
        quality: "Standard",
      },
      {
        id: "T-1357",
        arrival: "09:45",
        supplier: "Fournisseur L",
        material: "Co-produits",
        order: "CMD-012",
        quality: "Premium",
      },
    ],
  },
]

export default function ParkingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLine, setSelectedLine] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  // Filter trucks based on search query and selected line
  const filteredTrucks = parkingLines.flatMap((line) =>
    selectedLine === null || selectedLine === line.id
      ? line.trucks.filter(
          (truck) =>
            truck.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filter === "all" || truck.material.toLowerCase().includes(filter.toLowerCase())),
        )
      : [],
  )

  const totalCapacity = parkingLines.reduce((acc, line) => acc + line.capacity, 0)
  const totalOccupied = parkingLines.reduce((acc, line) => acc + line.occupied, 0)
  const occupancyPercentage = Math.round((totalOccupied / totalCapacity) * 100)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion du Parking</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les matériaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les matériaux</SelectItem>
              <SelectItem value="ferraille locale">Ferraille locale</SelectItem>
              <SelectItem value="ferraille importée">Ferraille importée</SelectItem>
              <SelectItem value="inter-sites">Inter-sites</SelectItem>
              <SelectItem value="co-produits">Co-produits</SelectItem>
              <SelectItem value="consommables">Consommables</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Occupation totale</CardTitle>
            <CardDescription>État d'occupation du parking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalOccupied}/{totalCapacity}
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Taux d'occupation</span>
                <span className="text-sm text-muted-foreground">{occupancyPercentage}%</span>
              </div>
              <Progress value={occupancyPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {parkingLines.map((line) => (
          <Card
            key={line.id}
            className={`cursor-pointer ${selectedLine === line.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedLine(selectedLine === line.id ? null : line.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle>Ligne {line.id}</CardTitle>
              <CardDescription>Capacité: {line.capacity} camions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {line.occupied}/{line.capacity}
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Occupation</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((line.occupied / line.capacity) * 100)}%
                  </span>
                </div>
                <Progress value={(line.occupied / line.capacity) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Liste des camions</CardTitle>
              <CardDescription>
                {selectedLine ? `Camions stationnés dans la ligne ${selectedLine}` : "Tous les camions stationnés"}
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par matricule..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Ligne</TableHead>
                  <TableHead>Arrivée</TableHead>
                  <TableHead className="hidden md:table-cell">Commande</TableHead>
                  <TableHead className="hidden md:table-cell">Fournisseur</TableHead>
                  <TableHead>Matériau</TableHead>
                  <TableHead>Qualité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrucks.length > 0 ? (
                  filteredTrucks.map((truck) => {
                    const line = parkingLines.find((l) => l.trucks.some((t) => t.id === truck.id))
                    return (
                      <TableRow key={truck.id}>
                        <TableCell className="font-medium">{truck.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Ligne {line?.id}</Badge>
                        </TableCell>
                        <TableCell>{truck.arrival}</TableCell>
                        <TableCell className="hidden md:table-cell">{truck.order}</TableCell>
                        <TableCell className="hidden md:table-cell">{truck.supplier}</TableCell>
                        <TableCell>{truck.material}</TableCell>
                        <TableCell>
                          <Badge variant={truck.quality === "Premium" ? "default" : "secondary"}>{truck.quality}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Aucun camion trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Occupation par matériau</CardTitle>
            <CardDescription>Répartition des camions par type de matériau</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ferraille locale", count: 5, total: 12 },
                { name: "Ferraille importée", count: 3, total: 8 },
                { name: "Inter-sites", count: 1, total: 4 },
                { name: "Co-produits", count: 2, total: 5 },
                { name: "Consommables", count: 1, total: 3 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count}/{item.total}
                    </span>
                  </div>
                  <Progress value={(item.count / item.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes de stationnement</CardTitle>
            <CardDescription>Camions avec temps de stationnement prolongé</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded-md bg-amber-50">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">T-1234</p>
                    <p className="text-xs text-muted-foreground">Ligne A - Arrivé à 08:30</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-600">+2h30</p>
                  <Button size="sm" variant="outline" className="mt-1">
                    Vérifier
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 border rounded-md bg-red-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="font-medium">T-6789</p>
                    <p className="text-xs text-muted-foreground">Ligne B - Arrivé à 08:45</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">+3h15</p>
                  <Button size="sm" variant="destructive" className="mt-1">
                    Intervenir
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

