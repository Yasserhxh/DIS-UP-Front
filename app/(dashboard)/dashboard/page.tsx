"use client"

import { Clock, Package, Truck, TruckIcon } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { StatusCard } from "@/components/status-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TruckStatusBadge } from "@/components/truck-status-badge"

// Sample data for charts
const activityData = [
  { hour: "06:00", waiting: 4, transit: 2, loaded: 1, departed: 3 },
  { hour: "08:00", waiting: 6, transit: 3, loaded: 2, departed: 5 },
  { hour: "10:00", waiting: 10, transit: 5, loaded: 3, departed: 8 },
  { hour: "12:00", waiting: 12, transit: 8, loaded: 5, departed: 10 },
  { hour: "14:00", waiting: 8, transit: 10, loaded: 6, departed: 12 },
  { hour: "16:00", waiting: 6, transit: 7, loaded: 4, departed: 15 },
  { hour: "18:00", waiting: 4, transit: 4, loaded: 2, departed: 18 },
]

const waitingTimeData = [
  { day: "Lun", time: 35 },
  { day: "Mar", time: 28 },
  { day: "Mer", time: 42 },
  { day: "Jeu", time: 30 },
  { day: "Ven", time: 45 },
  { day: "Sam", time: 25 },
  { day: "Dim", time: 20 },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Camions en attente"
          value={12}
          icon={Clock}
          description="+2 par rapport à hier"
          iconColor="text-blue-500"
          bgColor="bg-blue-100"
          trend="up"
        />
        <StatusCard
          title="Camions en transit"
          value={8}
          icon={Truck}
          description="-1 par rapport à hier"
          iconColor="text-amber-500"
          bgColor="bg-amber-100"
          trend="down"
        />
        <StatusCard
          title="Camions chargés"
          value={5}
          icon={Package}
          description="Identique à hier"
          iconColor="text-green-500"
          bgColor="bg-green-100"
          trend="neutral"
        />
        <StatusCard
          title="Camions partis"
          value={15}
          icon={TruckIcon}
          description="+3 par rapport à hier"
          iconColor="text-purple-500"
          bgColor="bg-purple-100"
          trend="up"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité des camions</CardTitle>
            <CardDescription>Activité horaire des camions pour aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Bar dataKey="waiting" name="En attente" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="transit" name="En transit" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="loaded" name="Chargés" stackId="a" fill="#10b981" />
                  <Bar dataKey="departed" name="Partis" stackId="a" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Temps d'attente moyen</CardTitle>
            <CardDescription>Temps moyen d'attente des camions (minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waitingTimeData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Line type="monotone" dataKey="time" stroke="#FC5421" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Localisation des camions</CardTitle>
            <CardDescription>Localisation des camions en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] relative bg-slate-100 rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="bg-white/80 p-4 rounded-md shadow-md">
                  <p className="font-medium text-slate-800">Carte de localisation</p>
                  <p className="text-sm text-slate-600">Données de localisation en temps réel</p>
                </div>
              </div>
              <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-amber-500 animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité récente des camions</CardTitle>
            <CardDescription>Dernières mises à jour de statut des camions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="waiting">En attente</TabsTrigger>
                <TabsTrigger value="in-transit">En transit</TabsTrigger>
                <TabsTrigger value="loaded">Chargés</TabsTrigger>
                <TabsTrigger value="departed">Partis</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="space-y-4">
                  {[
                    { id: "T-1234", status: "waiting", time: "10:30", location: "Porte A" },
                    { id: "T-5678", status: "in-transit", time: "10:15", location: "Route 66" },
                    { id: "T-9012", status: "loaded", time: "10:00", location: "Quai 3" },
                    { id: "T-3456", status: "departed", time: "09:45", location: "Porte de sortie" },
                    { id: "T-7890", status: "delayed", time: "09:30", location: "Autoroute 95" },
                    { id: "T-2345", status: "issue", time: "09:15", location: "Zone de maintenance" },
                  ].map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-sm text-muted-foreground">{truck.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <TruckStatusBadge status={truck.status as any} />
                        <p className="text-sm text-muted-foreground">{truck.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="waiting" className="space-y-4">
                <div className="space-y-4">
                  {[
                    { id: "T-1234", status: "waiting", time: "10:30", location: "Porte A" },
                    { id: "T-4567", status: "waiting", time: "11:15", location: "Porte B" },
                    { id: "T-7890", status: "waiting", time: "12:00", location: "Porte C" },
                  ].map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-sm text-muted-foreground">{truck.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <TruckStatusBadge status={truck.status as any} />
                        <p className="text-sm text-muted-foreground">{truck.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="in-transit" className="space-y-4">
                <div className="space-y-4">
                  {[
                    { id: "T-5678", status: "in-transit", time: "10:15", location: "Route 66" },
                    { id: "T-8901", status: "in-transit", time: "11:30", location: "Autoroute 95" },
                  ].map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-sm text-muted-foreground">{truck.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <TruckStatusBadge status={truck.status as any} />
                        <p className="text-sm text-muted-foreground">{truck.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="loaded" className="space-y-4">
                <div className="space-y-4">
                  {[
                    { id: "T-9012", status: "loaded", time: "10:00", location: "Quai 3" },
                    { id: "T-2345", status: "loaded", time: "10:45", location: "Quai 5" },
                  ].map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-sm text-muted-foreground">{truck.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <TruckStatusBadge status={truck.status as any} />
                        <p className="text-sm text-muted-foreground">{truck.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="departed" className="space-y-4">
                <div className="space-y-4">
                  {[
                    { id: "T-3456", status: "departed", time: "09:45", location: "Porte de sortie" },
                    { id: "T-6789", status: "departed", time: "09:30", location: "Porte de sortie" },
                    { id: "T-0123", status: "departed", time: "09:15", location: "Porte de sortie" },
                  ].map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{truck.id}</p>
                          <p className="text-sm text-muted-foreground">{truck.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <TruckStatusBadge status={truck.status as any} />
                        <p className="text-sm text-muted-foreground">{truck.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

