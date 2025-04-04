"use client"

import { useState } from "react"
import { AlertTriangle, Maximize, Minimize, RefreshCw, Search, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MapPage() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.2)
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) setZoomLevel(zoomLevel - 0.2)
  }

  const zones = [
    { id: "parking", name: "Parking", count: 12, color: "bg-slate-200" },
    { id: "debachage", name: "Débâchage", count: 4, color: "bg-blue-100" },
    { id: "pab-entree", name: "PàB Entrée", count: 3, color: "bg-amber-100" },
    { id: "dechargement", name: "Déchargement", count: 5, color: "bg-green-100" },
    { id: "pab-sortie", name: "PàB Sortie", count: 2, color: "bg-purple-100" },
  ]

  const trucks = [
    { id: "T-1234", zone: "parking", status: "normal", position: { top: "20%", left: "30%" } },
    { id: "T-5678", zone: "parking", status: "warning", position: { top: "25%", left: "35%" } },
    { id: "T-9012", zone: "debachage", status: "normal", position: { top: "40%", left: "25%" } },
    { id: "T-3456", zone: "pab-entree", status: "critical", position: { top: "45%", left: "45%" } },
    { id: "T-7890", zone: "dechargement", status: "normal", position: { top: "60%", left: "55%" } },
    { id: "T-2345", zone: "pab-sortie", status: "warning", position: { top: "70%", left: "65%" } },
    { id: "T-6789", zone: "parking", status: "normal", position: { top: "15%", left: "25%" } },
    { id: "T-0123", zone: "dechargement", status: "normal", position: { top: "55%", left: "60%" } },
    { id: "T-4567", zone: "debachage", status: "warning", position: { top: "35%", left: "30%" } },
    { id: "T-8901", zone: "pab-entree", status: "normal", position: { top: "50%", left: "40%" } },
  ]

  const filteredTrucks = selectedZone ? trucks.filter((truck) => truck.zone === selectedZone) : trucks

  const filteredTrucksDetails = trucks.filter((truck) => truck.id.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vue Cartographique</h2>
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => setSelectedZone(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les zones</SelectItem>
              {zones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <Maximize className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <Minimize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {zones.map((zone) => (
          <Card
            key={zone.id}
            className={`cursor-pointer ${selectedZone === zone.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
          >
            <CardHeader className={`${zone.color} py-2 px-4`}>
              <CardTitle className="text-sm font-medium">{zone.name}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold">{zone.count}</div>
              <p className="text-xs text-muted-foreground">Camions</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan du Site</CardTitle>
          <CardDescription>Vue en temps réel des camions sur le site</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="relative h-[600px] border rounded-md overflow-hidden bg-slate-50"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center", transition: "transform 0.3s ease" }}
          >
            {/* Zones */}
            <div className="absolute top-[10%] left-[20%] w-[25%] h-[20%] bg-slate-200 border border-slate-300 rounded-md flex items-center justify-center">
              <span className="font-medium text-slate-700">Zone Parking</span>
            </div>
            <div className="absolute top-[35%] left-[20%] w-[15%] h-[15%] bg-blue-100 border border-blue-200 rounded-md flex items-center justify-center">
              <span className="font-medium text-blue-700">Zone Débâchage</span>
            </div>
            <div className="absolute top-[40%] left-[40%] w-[15%] h-[15%] bg-amber-100 border border-amber-200 rounded-md flex items-center justify-center">
              <span className="font-medium text-amber-700">PàB Entrée</span>
            </div>
            <div className="absolute top-[55%] left-[50%] w-[20%] h-[15%] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
              <span className="font-medium text-green-700">Zone Déchargement</span>
            </div>
            <div className="absolute top-[65%] left-[60%] w-[15%] h-[15%] bg-purple-100 border border-purple-200 rounded-md flex items-center justify-center">
              <span className="font-medium text-purple-700">PàB Sortie</span>
            </div>

            {/* Routes */}
            <div className="absolute top-[30%] left-[30%] w-[5%] h-[10%] bg-gray-300 rotate-45"></div>
            <div className="absolute top-[45%] left-[35%] w-[5%] h-[10%] bg-gray-300 rotate-0"></div>
            <div className="absolute top-[50%] left-[45%] w-[5%] h-[10%] bg-gray-300 rotate-45"></div>
            <div className="absolute top-[60%] left-[55%] w-[5%] h-[10%] bg-gray-300 rotate-90"></div>

            {/* Trucks */}
            <TooltipProvider>
              {filteredTrucks.map((truck) => (
                <Tooltip key={truck.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer
                        ${
                          truck.status === "normal"
                            ? "bg-green-500"
                            : truck.status === "warning"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      style={{ top: truck.position.top, left: truck.position.left }}
                    >
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">{truck.id}</p>
                      <p className="text-xs">Zone: {zones.find((z) => z.id === truck.zone)?.name}</p>
                      <p className="text-xs">
                        Statut:{" "}
                        {truck.status === "normal"
                          ? "Dans les délais"
                          : truck.status === "warning"
                            ? "Dépassement tolérance"
                            : "Dépassement max"}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Détails des Camions</CardTitle>
            <CardDescription>Liste des camions actuellement sur site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par matricule..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
              {filteredTrucksDetails.map((truck) => (
                <div key={truck.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full 
                      ${
                        truck.status === "normal"
                          ? "bg-green-500"
                          : truck.status === "warning"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium">{truck.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{zones.find((z) => z.id === truck.zone)?.name}</Badge>
                    {truck.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {truck.status === "critical" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Actives</CardTitle>
            <CardDescription>Camions avec dépassement de temps</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="warning">
              <TabsList className="mb-4">
                <TabsTrigger value="warning">Tolérance dépassée</TabsTrigger>
                <TabsTrigger value="critical">Maximum dépassé</TabsTrigger>
              </TabsList>
              <TabsContent value="warning" className="space-y-2">
                {trucks
                  .filter((t) => t.status === "warning")
                  .map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between p-2 border rounded-md bg-amber-50">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-xs text-muted-foreground">
                            Zone: {zones.find((z) => z.id === truck.zone)?.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-600">+15 min</p>
                        <Button size="sm" variant="outline" className="mt-1">
                          Action
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="critical" className="space-y-2">
                {trucks
                  .filter((t) => t.status === "critical")
                  .map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between p-2 border rounded-md bg-red-50">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-xs text-muted-foreground">
                            Zone: {zones.find((z) => z.id === truck.zone)?.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600">+45 min</p>
                        <Button size="sm" variant="destructive" className="mt-1">
                          Urgence
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

