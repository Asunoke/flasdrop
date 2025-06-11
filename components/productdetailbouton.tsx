import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export function ProductDetailButton({ productId }: { productId: string }) {
  return (
    <Link href={`/flash-sales/${productId}`}>
      <Button variant="outline" size="sm" className="gap-2">
        <Eye className="h-4 w-4" />
        Détails
      </Button>
    </Link>
  )
}