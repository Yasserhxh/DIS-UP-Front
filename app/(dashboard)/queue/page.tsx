"use client"

import type React from "react"

import { useState } from "react"
import { AlertTriangle, ArrowRight, Clock, RefreshCw, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Queue data
const queueData = {
  debachage: [
    {
      id: "T-1234",
      arrival: "08:30",
      waiting: 25,
      priority: "Normale",
      supplier: "Fournisseur A",
      material: "Ferraille locale",
    },
    {
      id: "T-5678",
      arrival: "09:15",
      waiting: 15,
      priority: "Élevée",
      supplier: "Fournisseur B",
      material: "Ferraille importée",
    },
    {
      id: "T-9012",
      arrival: "09:45",
      waiting: 10,
      priority: "Normale",
      supplier: "Fournisseur C",
      material: "Ferraille locale",
    },
  ],
  noLine: [
    {
      id: "T-3456",
      arrival: "08:45",
      waiting: 45,
      priority: "Normale",
      supplier: "Fournisseur D",
      material: "Co-produits",
    },
    {
      id: "T-7890",
      arrival: "09:30",
      waiting: 30,
      priority: "Basse",
      supplier: "Fournisseur E",
      material: "Consommables",
    },
  ],
  pabEntree: [
    {
      id: "T-2345",
      arrival: "10:15",
      waiting: 20,
      priority: "Élevée",
      supplier: "Fournisseur F",
      material: "Ferraille locale",
    },
    {
      id: "T-6789",
      arrival: "10:30",
      waiting: 15,
      priority: "Normale",
      supplier: "Fournisseur G",
      material: "Inter-sites",
    },
    {
      id: "T-0123",
      arrival: "10:45",
      waiting: 5,
      priority: "Normale",
      supplier: "Fournisseur H",
      material: "Ferraille importée",
    },
  ],
  dechargement: [
    {
      id: "T-4567",
      arrival: "09:00",
      waiting: 35,
      priority: "Élevée",
      supplier: "Fournisseur I",
      material: "Ferraille locale",
    },
    {
      id: "T-8901",
      arrival: "09:45",
      waiting: 25,
      priority: "Normale",
      supplier: "Fournisseur J",
      material: "Ferraille importée",
    },
  ],
  pabSortie: [
    {
      id: "T-2468",
      arrival: "11:15",
      waiting: 10,
      priority: "Normale",
      supplier: "Fournisseur K",
      material: "Ferraille locale",
    },
    {
      id: "T-1357",
      arrival: "11:30",
      waiting: 5,
      priority: "Basse",
      supplier: "Fournisseur L",
      material: "Co-produits",
    },
  ],
}

export default function QueuePage() {
  const [filter, setFilter] = useState("all")

  const renderQueueCard = (title: string, data: any[], icon: React.ReactNode) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge>{data.length}</Badge>
        </div>
        <CardDescription>
          Temps d'attente moyen: {Math.round(data.reduce((acc, item) => acc + item.waiting, 0) / data.length)} min
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
          {data.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{item.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.supplier} - {item.material}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{item.waiting} min</span>
                  <Badge
                    variant={
                      item.priority === "Élevée" ? "destructive" : item.priority === "Normale" ? "default" : "outline"
                    }
                  >
                    {item.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                    Détails
                  </Button>
                  <Button size="sm" className="h-7 px-2 text-xs">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    Avancer
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Suivi des Files d'Attente</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les flux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les flux</SelectItem>
              <SelectItem value="local">Ferraille locale</SelectItem>
              <SelectItem value="import">Ferraille importée</SelectItem>
              <SelectItem value="intersite">Inter-sites</SelectItem>
              <SelectItem value="coproduit">Co-produits</SelectItem>
              <SelectItem value="consommable">Consommables</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Occupation globale</CardTitle>
            <CardDescription>Capacité des files d'attente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Débâchage</span>
                  <span className="text-sm text-muted-foreground">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Sans ligne affectée</span>
                  <span className="text-sm text-muted-foreground">2/4</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">PàB Entrée</span>
                  <span className="text-sm text-muted-foreground">3/4</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Déchargement</span>
                  <span className="text-sm text-muted-foreground">2/6</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">PàB Sortie</span>
                  <span className="text-sm text-muted-foreground">2/4</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {renderQueueCard("Attente débâchage", queueData.debachage, <Clock className="h-5 w-5 text-blue-500" />)}
        {renderQueueCard("Sans ligne affectée", queueData.noLine, <AlertTriangle className="h-5 w-5 text-amber-500" />)}
        {renderQueueCard("Attente PàB entrée", queueData.pabEntree, <Truck className="h-5 w-5 text-green-500" />)}
        {renderQueueCard("Attente déchargement", queueData.dechargement, <Truck className="h-5 w-5 text-purple-500" />)}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {renderQueueCard("Attente PàB sortie", queueData.pabSortie, <Truck className="h-5 w-5 text-primary" />)}

        <Card>
          <CardHeader>
            <CardTitle>Alertes de dépassement</CardTitle>
            <CardDescription>Camions avec temps d'attente excessif</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="warning">Tolérance</TabsTrigger>
                <TabsTrigger value="critical">Critique</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md bg-amber-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">T-3456</p>
                      <p className="text-xs text-muted-foreground">Sans ligne affectée - 45 min</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Action
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md bg-red-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">T-4567</p>
                      <p className="text-xs text-muted-foreground">Déchargement - 35 min</p>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive">
                    Urgence
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="warning" className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md bg-amber-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">T-3456</p>
                      <p className="text-xs text-muted-foreground">Sans ligne affectée - 45 min</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Action
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="critical" className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md bg-red-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">T-4567</p>
                      <p className="text-xs text-muted-foreground">Déchargement - 35 min</p>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive">
                    Urgence
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

