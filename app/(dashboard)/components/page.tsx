"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Bell, Check, ChevronDown, FileText, Info, Package, Truck, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { TruckStatusBadge } from "@/components/truck-status-badge"
import { StatusCard } from "@/components/status-card"
import { SuccessAlert } from "@/components/success-alert"
import { DataTable } from "@/components/data-table/data-table"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { ChartCard } from "@/components/dashboard/chart-card"
import { DateRangePicker } from "@/components/forms/date-range-picker"
import { SearchInput } from "@/components/forms/search-input"
import { FilterDropdown } from "@/components/forms/filter-dropdown"
import { Modal } from "@/components/ui/modal"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { StatusBadge } from "@/components/status/status-badge"
import { StatusIndicator } from "@/components/status/status-indicator"
import { Timeline, TimelineItem } from "@/components/timeline/timeline"
import { FileUpload } from "@/components/file-upload/file-upload"
import { DatePicker } from "@/components/ui/date-picker"
import { SearchableSelect, type Option } from "@/components/forms/searchable-select"
import { MultiSelect } from "@/components/forms/multi-select"

// Sample data for the DataTable
const data = [
  {
    id: "INV001",
    status: "pending",
    client: "Acme Corp",
    amount: 250.0,
    date: "2025-01-01",
  },
  {
    id: "INV002",
    status: "processing",
    client: "Globex Inc",
    amount: 150.0,
    date: "2025-01-05",
  },
  {
    id: "INV003",
    status: "success",
    client: "Stark Industries",
    amount: 350.0,
    date: "2025-01-10",
  },
]

// Sample columns for the DataTable
const columns = [
  {
    accessorKey: "id",
    header: "Référence",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => {
      return <div>{row.getValue("amount")} MAD</div>
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <StatusBadge
          status={status === "success" ? "success" : status === "processing" ? "warning" : "pending"}
          text={status === "success" ? "Complété" : status === "processing" ? "En cours" : "En attente"}
        />
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]

// Sample options for selects
const countryOptions: Option[] = [
  { value: "ma", label: "Maroc" },
  { value: "fr", label: "France" },
  { value: "es", label: "Espagne" },
  { value: "de", label: "Allemagne" },
  { value: "it", label: "Italie" },
  { value: "uk", label: "Royaume-Uni" },
  { value: "us", label: "États-Unis" },
  { value: "ca", label: "Canada" },
  { value: "br", label: "Brésil" },
  { value: "jp", label: "Japon" },
]

const categoryOptions: Option[] = [
  { value: "electronics", label: "Électronique" },
  { value: "clothing", label: "Vêtements" },
  { value: "food", label: "Alimentation" },
  { value: "furniture", label: "Mobilier" },
  { value: "books", label: "Livres" },
  { value: "sports", label: "Sports" },
  { value: "toys", label: "Jouets" },
  { value: "health", label: "Santé" },
  { value: "beauty", label: "Beauté" },
  { value: "automotive", label: "Automobile" },
]

export default function ComponentsPage() {
  const { toast } = useToast()
  const [showToast, setShowToast] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filterGroups = [
    {
      label: "Statut",
      options: [
        { label: "Tous", value: "all", onClick: () => console.log("All") },
        { label: "En attente", value: "pending", onClick: () => console.log("Pending") },
        { label: "En cours", value: "processing", onClick: () => console.log("Processing") },
        { label: "Terminé", value: "completed", onClick: () => console.log("Completed") },
      ],
    },
    {
      label: "Date",
      options: [
        { label: "Aujourd'hui", value: "today", onClick: () => console.log("Today") },
        { label: "Cette semaine", value: "week", onClick: () => console.log("Week") },
        { label: "Ce mois", value: "month", onClick: () => console.log("Month") },
      ],
    },
  ]

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Component Library</h2>
        <Button
          onClick={() => {
            toast({
              title: "Toast Example",
              description: "This is a toast notification example",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
          }}
        >
          Show Toast
        </Button>
      </div>

      <Tabs defaultValue="buttons">
        <TabsList className="mb-4">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Form Controls</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Badges</TabsTrigger>
          <TabsTrigger value="data">Data & Tables</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="modals">Modals & Dialogs</TabsTrigger>
          <TabsTrigger value="status">Status & Timeline</TabsTrigger>
          <TabsTrigger value="uploads">File Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Button components in various styles and states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Button Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon" className="h-8 w-8">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Button States</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="outline">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    With Icon
                  </Button>
                  <Button>
                    Loading
                    <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Input components for collecting user data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Text Inputs</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input id="default-input" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled Input</Label>
                    <Input id="disabled-input" placeholder="Disabled" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="with-icon">Input with Icon</Label>
                    <div className="relative">
                      <Input id="with-icon" placeholder="Search..." className="pl-10" />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textarea">Textarea</Label>
                    <Textarea id="textarea" placeholder="Enter multiple lines of text..." />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Date Inputs</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Single Date Picker</Label>
                    <DatePicker date={selectedDate} setDate={setSelectedDate} />
                    {selectedDate && (
                      <p className="text-sm text-muted-foreground mt-2">Selected date: {format(selectedDate, "PPP")}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Date Range Picker</Label>
                    <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                    {dateRange?.from && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected range: {dateRange.from ? format(dateRange.from, "PPP") : ""}
                        {dateRange.to ? ` - ${format(dateRange.to, "PPP")}` : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Advanced Select Inputs</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Searchable Select</Label>
                    <SearchableSelect
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      placeholder="Sélectionner un pays"
                    />
                    {selectedCountry && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {countryOptions.find((o) => o.value === selectedCountry)?.label}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Multi-Select</Label>
                    <MultiSelect
                      options={categoryOptions}
                      selected={selectedCategories}
                      onChange={setSelectedCategories}
                      placeholder="Sélectionner des catégories"
                    />
                    {selectedCategories.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {selectedCategories.length} categories
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Search & Filter</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Search Input</Label>
                    <SearchInput placeholder="Rechercher un élément..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Filter Dropdown</Label>
                    <FilterDropdown groups={filterGroups} className="ml-0" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Select & Checkboxes</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="select">Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checkbox1" />
                      <Label htmlFor="checkbox1">Checkbox 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checkbox2" checked />
                      <Label htmlFor="checkbox2">Checkbox 2 (checked)</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Radio & Switch</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="option1" />
                      <Label htmlFor="option1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="option2" />
                      <Label htmlFor="option2">Option 2</Label>
                    </div>
                  </RadioGroup>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="switch1" />
                      <Label htmlFor="switch1">Switch</Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slider">Slider</Label>
                      <Slider id="slider" defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content of the card.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>

            <StatusCard
              title="Status Card Example"
              value="24"
              icon={Bell}
              description="This is a status card component"
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Compact Card</CardTitle>
                <CardDescription>A more compact card layout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Badges</CardTitle>
              <CardDescription>Components for displaying status information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Alerts</h3>
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>This is an informational alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <X className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>This is an error alert message.</AlertDescription>
                  </Alert>
                  <SuccessAlert title="Success" description="This is a success alert message." />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Status Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <TruckStatusBadge status="waiting" />
                  <TruckStatusBadge status="in-transit" />
                  <TruckStatusBadge status="loaded" />
                  <TruckStatusBadge status="departed" />
                  <TruckStatusBadge status="delayed" />
                  <TruckStatusBadge status="issue" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Table</CardTitle>
              <CardDescription>Advanced table with sorting, filtering, and pagination</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={data}
                searchPlaceholder="Rechercher une référence..."
                searchColumn="id"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Components</CardTitle>
              <CardDescription>Components for building dashboards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Stat Cards</h3>
                <StatsGrid columns={4}>
                  <StatCard
                    title="Camions en attente"
                    value={12}
                    icon={Truck}
                    trend={{ value: "+2", direction: "up", label: "par rapport à hier" }}
                    iconColor="text-blue-500"
                    bgColor="bg-blue-100"
                  />
                  <StatCard
                    title="Tonnage"
                    value="1,250 T"
                    icon={Package}
                    trend={{ value: "-50T", direction: "down", label: "par rapport à hier" }}
                    iconColor="text-amber-500"
                    bgColor="bg-amber-100"
                  />
                  <StatCard
                    title="Temps moyen"
                    value="103 min"
                    icon={Bell}
                    trend={{ value: "Identique", direction: "neutral", label: "à hier" }}
                    iconColor="text-green-500"
                    bgColor="bg-green-100"
                  />
                  <StatCard
                    title="Commandes"
                    value={18}
                    icon={FileText}
                    trend={{ value: "+2", direction: "up", label: "par rapport à hier" }}
                    iconColor="text-purple-500"
                    bgColor="bg-purple-100"
                  />
                </StatsGrid>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Chart Card</h3>
                <ChartCard title="Exemple de graphique" description="Carte pour afficher des graphiques" height={200}>
                  <div className="flex items-center justify-center h-full bg-muted/30 rounded-md">
                    <p className="text-muted-foreground">Contenu du graphique ici</p>
                  </div>
                </ChartCard>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modals & Dialogs</CardTitle>
              <CardDescription>Components for displaying modals and dialogs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Modal</h3>
                <Button onClick={() => setIsModalOpen(true)}>Ouvrir Modal</Button>
                <Modal
                  title="Exemple de Modal"
                  description="Ceci est un exemple de modal pour afficher du contenu"
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  footer={
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>Confirmer</Button>
                    </div>
                  }
                >
                  <div className="py-4">
                    <p>Contenu du modal ici. Vous pouvez ajouter n'importe quel contenu.</p>
                  </div>
                </Modal>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Confirmation Dialog</h3>
                <Button variant="destructive" onClick={() => setIsConfirmOpen(true)}>
                  Supprimer
                </Button>
                <ConfirmationDialog
                  title="Êtes-vous sûr de vouloir supprimer?"
                  description="Cette action est irréversible. L'élément sera définitivement supprimé."
                  open={isConfirmOpen}
                  onOpenChange={setIsConfirmOpen}
                  onConfirm={() => {
                    toast({
                      title: "Élément supprimé",
                      description: "L'élément a été supprimé avec succès",
                    })
                  }}
                  confirmText="Supprimer"
                  cancelText="Annuler"
                  variant="destructive"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status & Timeline</CardTitle>
              <CardDescription>Components for displaying status and timeline information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Status Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="success" text="Complété" />
                  <StatusBadge status="warning" text="En cours" />
                  <StatusBadge status="error" text="Erreur" />
                  <StatusBadge status="info" text="Information" />
                  <StatusBadge status="pending" text="En attente" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Status Indicators</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StatusIndicator status="online" />
                    <span className="text-sm">En ligne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIndicator status="offline" />
                    <span className="text-sm">Hors ligne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIndicator status="away" />
                    <span className="text-sm">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIndicator status="busy" pulse />
                    <span className="text-sm">Occupé</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Timeline</h3>
                <Timeline>
                  <TimelineItem
                    title="Création de l'arrivage"
                    time="15/01/2025"
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    content={<p className="text-sm text-muted-foreground">Arrivage créé par John Doe</p>}
                  />
                  <TimelineItem
                    title="Mise à jour du statut"
                    time="18/01/2025"
                    icon={<Check className="h-5 w-5 text-primary" />}
                    content={
                      <p className="text-sm text-muted-foreground">
                        Statut modifié de "Planifié" à "En cours" par Jane Smith
                      </p>
                    }
                  />
                  <TimelineItem
                    title="Document ajouté"
                    time="20/01/2025"
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    content={
                      <p className="text-sm text-muted-foreground">Document "Facture Proforma" ajouté par John Doe</p>
                    }
                    isLast
                  />
                </Timeline>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Uploads</CardTitle>
              <CardDescription>Components for uploading files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">File Upload</h3>
                <FileUpload
                  label="PDF, JPG ou PNG"
                  description="Glissez-déposez ou cliquez pour télécharger"
                  accept="image/*,application/pdf"
                  maxSize={5}
                  onChange={setSelectedFile}
                />
                {selectedFile && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Fichier sélectionné: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showToast && (
        <ToastProvider>
          <Toast>
            <div className="flex gap-2">
              <ToastTitle>Toast Notification</ToastTitle>
              <ToastClose />
            </div>
            <ToastDescription>This is a toast notification example.</ToastDescription>
            <ToastAction altText="Try again">Try again</ToastAction>
          </Toast>
          <ToastViewport />
        </ToastProvider>
      )}
    </div>
  )
}

