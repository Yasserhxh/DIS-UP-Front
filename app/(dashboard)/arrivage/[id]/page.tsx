"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArrivageDetailsPage() {
  const params = useParams()
  const arrivageId = params.id as string
  const [activeTab, setActiveTab] = useState("approvisionnement")

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
          <CardTitle>Informations détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="approvisionnement" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="approvisionnement">Approvisionnement</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
              <TabsTrigger value="qualification">Qualification</TabsTrigger>
            </TabsList>

            <TabsContent value="approvisionnement" className="p-4 border rounded-md min-h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Contenu de l'onglet Approvisionnement à venir
              </div>
            </TabsContent>

            <TabsContent value="finance" className="p-4 border rounded-md min-h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Contenu de l'onglet Finance à venir
              </div>
            </TabsContent>

            <TabsContent value="supply-chain" className="p-4 border rounded-md min-h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Contenu de l'onglet Supply Chain à venir
              </div>
            </TabsContent>

            <TabsContent value="qualification" className="p-4 border rounded-md min-h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Contenu de l'onglet Qualification à venir
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

