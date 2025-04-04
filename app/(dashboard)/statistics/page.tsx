"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Clock, Filter, RefreshCw, Truck, TruckIcon } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusCard } from "@/components/status-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for charts
const volumeData = [
  { day: "Lun", local: 15, import: 8, intersite: 5, coproduit: 3, consommable: 2 },
  { day: "Mar", local: 12, import: 10, intersite: 6, coproduit: 4, consommable: 3 },
  { day: "Mer", local: 18, import: 7, intersite: 4, coproduit: 5, consommable: 2 },
  { day: "Jeu", local: 14, import: 9, intersite: 7, coproduit: 3, consommable: 4 },
  { day: "Ven", local: 16, import: 11, intersite: 5, coproduit: 4, consommable: 3 },
  { day: "Sam", local: 10, import: 6, intersite: 3, coproduit: 2, consommable: 1 },
  { day: "Dim", local: 8, import: 4, intersite: 2, coproduit: 1, consommable: 1 },
]

const timeData = [
  { step: "Entrée", current: 15, previous: 12 },
  { step: "Débâchage", current: 25, previous: 30 },
  { step: "PàB Entrée", current: 10, previous: 12 },
  { step: "Déchargement", current: 45, previous: 40 },
  { step: "PàB Sortie", current: 8, previous: 10 },
]

const flowDistribution = [
  { name: "Local", value: 45, color: "#3b82f6" },
  { name: "Import", value: 25, color: "#f59e0b" },
  { name: "Inter-sites", value: 15, color: "#10b981" },
  { name: "Co-produits", value: 10, color: "#8b5cf6" },
  { name: "Consommables", value: 5, color: "#ec4899" },
]

export default function StatisticsPage() {
  const [period, setPeriod] = useState("today")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Statistiques Principales</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="yesterday">Hier</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Camions sur site"
          value={26}
          icon={Truck}
          description="+4 par rapport à hier"
          iconColor="text-blue-500"
          bgColor="bg-blue-100"
          trend="up"
        />
        <StatusCard
          title="Tonnage transféré"
          value="1,250 T"
          icon={TruckIcon}
          description="-50T par rapport à hier"
          iconColor="text-amber-500"
          bgColor="bg-amber-100"
          trend="down"
        />
        <StatusCard
          title="Temps de séjour moyen"
          value="103 min"
          icon={Clock}
          description="Identique à hier"
          iconColor="text-green-500"
          bgColor="bg-green-100"
          trend="neutral"
        />
        <StatusCard
          title="Camions sortis"
          value={18}
          icon={Calendar}
          description="+2 par rapport à hier"
          iconColor="text-purple-500"
          bgColor="bg-purple-100"
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Volume par type de flux</CardTitle>
            <CardDescription>Nombre de camions par jour et par type de flux</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="local" name="Local" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="import" name="Import" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="intersite" name="Inter-sites" stackId="a" fill="#10b981" />
                  <Bar dataKey="coproduit" name="Co-produits" stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="consommable" name="Consommables" stackId="a" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Répartition par flux</CardTitle>
            <CardDescription>Distribution des camions par type de flux</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={flowDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {flowDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {flowDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temps moyen par étape</CardTitle>
          <CardDescription>Comparaison avec la période précédente (en minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="step" type="category" width={100} />
                <RechartsTooltip />
                <Bar dataKey="current" name="Période actuelle" fill="#fc5421" />
                <Bar dataKey="previous" name="Période précédente" fill="#35363b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tendances de volume</CardTitle>
                <CardDescription>Évolution du nombre de camions sur les 30 derniers jours</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Type de flux</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Tous les flux</DropdownMenuItem>
                  <DropdownMenuItem>Local</DropdownMenuItem>
                  <DropdownMenuItem>Import</DropdownMenuItem>
                  <DropdownMenuItem>Inter-sites</DropdownMenuItem>
                  <DropdownMenuItem>Co-produits</DropdownMenuItem>
                  <DropdownMenuItem>Consommables</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "01/03", count: 20 },
                    { date: "05/03", count: 25 },
                    { date: "10/03", count: 22 },
                    { date: "15/03", count: 30 },
                    { date: "20/03", count: 28 },
                    { date: "25/03", count: 35 },
                    { date: "30/03", count: 32 },
                  ]}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="count" stroke="#fc5421" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tendances de temps</CardTitle>
                <CardDescription>Évolution du temps de séjour moyen sur les 30 derniers jours</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Étape</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Temps total</DropdownMenuItem>
                  <DropdownMenuItem>Entrée</DropdownMenuItem>
                  <DropdownMenuItem>Débâchage</DropdownMenuItem>
                  <DropdownMenuItem>PàB Entrée</DropdownMenuItem>
                  <DropdownMenuItem>Déchargement</DropdownMenuItem>
                  <DropdownMenuItem>PàB Sortie</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "01/03", time: 95 },
                    { date: "05/03", time: 100 },
                    { date: "10/03", time: 90 },
                    { date: "15/03", time: 110 },
                    { date: "20/03", time: 105 },
                    { date: "25/03", time: 115 },
                    { date: "30/03", time: 103 },
                  ]}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="time" stroke="#35363b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

