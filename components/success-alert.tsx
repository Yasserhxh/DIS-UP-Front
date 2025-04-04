import { Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SuccessAlertProps {
  title?: string
  description: string
  className?: string
}

export function SuccessAlert({ title = "Success", description, className }: SuccessAlertProps) {
  return (
    <Alert variant="success" className={className}>
      <Check className="h-4 w-4 text-green-500" />
      <AlertTitle className="text-green-700">{title}</AlertTitle>
      <AlertDescription className="text-green-600">{description}</AlertDescription>
    </Alert>
  )
}

