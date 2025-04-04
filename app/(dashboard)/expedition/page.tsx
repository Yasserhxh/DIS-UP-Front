"use client"

import { useState } from "react"
import { Calendar, Clock, Filter, MoreHorizontal, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TruckStatusBadge } from "@/components/truck-status-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for queue visualization
const queueData = [
  { time: "08:00", waiting: 4, loading: 2 },
  { time: "09:00", waiting: 6, loading: 3 },
  { time: "10:00", waiting: 8, loading: 4 },
  { time: "11:00", waiting: 10, loading: 5 },
  { time: "12:00", waiting: 8, loading: 6 },
  { time: "13:00", waiting: 6, loading: 4 },
  { time: "14:00", waiting: 4, loading: 3 },
  { time: "15:00", waiting: 3, loading: 2 },
  { time: "16:00", waiting: 2, loading: 1 },
]

export default function ExpeditionPage() {
  const [shipments, setShipments] = useState([
    {
      id: "S-1234",
      truck: "T-1234",
      destination: "Entrepôt A",
      departureTime: "10:30",
      status: "waiting",
      priority: "Élevée",
    },
    {
      id: "S-5678",
      truck: "T-5678",
      destination: "Centre de distribution B",
      departureTime: "11:15",
      status: "in-transit",
      priority: "Moyenne",
    },
    {
      id: "S-9012",
      truck: "T-9012",
      destination: "Magasin C",
      departureTime: "12:00",
      status: "loaded",
      priority: "Basse",
    },
    {
      id: "S-3456",
      truck: "T-3456",
      destination: "Usine D",
      departureTime: "12:45",
      status: "departed",
      priority: "Élevée",
    },
    {
      id: "S-7890",
      truck: "T-7890",
      destination: "Entrepôt E",
      departureTime: "13:30",
      status: "delayed",
      priority: "Moyenne",
    },
    {
      id: "S-2345",
      truck: "T-2345",
      destination: "Centre de distribution F",
      departureTime: "14:15",
      status: "issue",
      priority: "Élevée",
    },
  ])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Planification des expéditions</h2>
        <div className="flex items-center gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Vue calendrier
          </Button>
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Chronologie
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expéditions du jour</CardTitle>
            <CardDescription>Total des expéditions prévues pour aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Temps d'attente moyen</CardTitle>
            <CardDescription>Temps moyen d'attente des camions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45 min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Départs à l'heure</CardTitle>
            <CardDescription>Pourcentage de départs à l'heure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Expéditions à venir</CardTitle>
          <CardDescription>Gérer et planifier les expéditions à venir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input type="search" placeholder="Rechercher des expéditions..." className="w-[250px]" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Statut</DropdownMenuItem>
                  <DropdownMenuItem>Priorité</DropdownMenuItem>
                  <DropdownMenuItem>Destination</DropdownMenuItem>
                  <DropdownMenuItem>Heure de départ</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="waiting">En attente</SelectItem>
                  <SelectItem value="in-transit">En transit</SelectItem>
                  <SelectItem value="loaded">Chargés</SelectItem>
                  <SelectItem value="departed">Partis</SelectItem>
                  <SelectItem value="delayed">Retardés</SelectItem>
                  <SelectItem value="issue">Problème</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une expédition
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Expédition</TableHead>
                  <TableHead>ID Camion</TableHead>
                  <TableHead className="hidden md:table-cell">Destination</TableHead>
                  <TableHead>Heure de départ</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.truck}</TableCell>
                    <TableCell className="hidden md:table-cell">{shipment.destination}</TableCell>
                    <TableCell>{shipment.departureTime}</TableCell>
                    <TableCell>
                      <TruckStatusBadge status={shipment.status as any} />
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          shipment.priority === "Élevée"
                            ? "bg-red-100 text-red-800"
                            : shipment.priority === "Moyenne"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {shipment.priority}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem>Modifier l'expédition</DropdownMenuItem>
                          <DropdownMenuItem>Reprogrammer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Annuler l'expédition</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Visualisation de la file d'attente</CardTitle>
          <CardDescription>Représentation visuelle de la file d'attente actuelle des camions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queueData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Bar dataKey="waiting" name="En attente" fill="#3b82f6" />
                <Bar dataKey="loading" name="En chargement" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

