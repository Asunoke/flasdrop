import { getAllProducts } from "@/lib/products"
import FlashSaleCard from "@/components/flash-sale-card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ProductsGridProps {
  query?: string
  minPrice?: number
  maxPrice?: number
  vendorId?: string
}

export default async function ProductsGrid({ query, minPrice, maxPrice, vendorId }: ProductsGridProps) {
  const products = await getAllProducts({ query, minPrice, maxPrice, vendorId })

  if (products.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Aucun produit trouvé</AlertTitle>
        <AlertDescription>
          Aucun produit ne correspond à vos critères de recherche. Veuillez essayer avec d&apos;autres filtres.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <FlashSaleCard
          key={product.id}
          title={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.image || "/placeholder.svg?height=300&width=300"}
          remaining={product.stock}
          cashOnDelivery={product.cashOnDelivery}
        />
      ))}
    </div>
  )
}
