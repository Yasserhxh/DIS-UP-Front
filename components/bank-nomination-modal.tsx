"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Modal } from "@/components/ui/modal"
import { cn } from "@/lib/utils"

// Liste des banques marocaines et internationales
const banks = [
  // Banques marocaines
  { value: "attijariwafa", label: "Attijariwafa Bank" },
  { value: "bmce", label: "BMCE Bank (Bank of Africa)" },
  { value: "bcp", label: "Banque Centrale Populaire" },
  { value: "cih", label: "CIH Bank" },
  { value: "sgma", label: "Société Générale Maroc" },
  { value: "cdm", label: "Crédit du Maroc" },
  { value: "cfg", label: "CFG Bank" },
  { value: "albarid", label: "Al Barid Bank" },
  { value: "arabbank", label: "Arab Bank Maroc" },
  { value: "bmci", label: "BMCI (BNP Paribas)" },

  // Banques internationales
  { value: "bnp", label: "BNP Paribas" },
  { value: "socgen", label: "Société Générale" },
  { value: "hsbc", label: "HSBC" },
  { value: "jpmorgan", label: "JP Morgan Chase" },
  { value: "citibank", label: "Citibank" },
  { value: "barclays", label: "Barclays" },
  { value: "deutschebank", label: "Deutsche Bank" },
  { value: "creditsuisse", label: "Credit Suisse" },
  { value: "santander", label: "Santander" },
  { value: "unicredit", label: "UniCredit" },
]

interface BankNominationModalProps {
  isOpen: boolean
  onClose: () => void
  arrivageId: string
}

export function BankNominationModal({ isOpen, onClose, arrivageId }: BankNominationModalProps) {
  const [selectedBank, setSelectedBank] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    // Dans une application réelle, vous enverriez ces données à votre API
    console.log(`Banque nominée pour l'arrivage ${arrivageId}: ${selectedBank}`)

    // Réinitialiser et fermer
    setSelectedBank("")
    onClose()
  }

  return (
    <Modal
      title="Nominer une banque"
      description={`Sélectionnez une banque pour l'arrivage ${arrivageId}`}
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedBank}>
            Confirmer
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Banque
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {selectedBank ? banks.find((bank) => bank.value === selectedBank)?.label : "Sélectionner une banque..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Rechercher une banque..." />
                <CommandList>
                  <CommandEmpty>Aucune banque trouvée.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-auto">
                    {banks.map((bank) => (
                      <CommandItem
                        key={bank.value}
                        value={bank.value}
                        onSelect={(currentValue) => {
                          setSelectedBank(currentValue === selectedBank ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", selectedBank === bank.value ? "opacity-100" : "opacity-0")}
                        />
                        {bank.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Modal>
  )
}

