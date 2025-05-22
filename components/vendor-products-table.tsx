import { Badge } from "@/components/ui/badge"

// Sample products data for a specific vendor
const vendorProducts = [
  {
    id: 1,
    name: "Smartphone Samsung Galaxy A54",
    price: 149000,
    originalPrice: 199000,
    stock: 5,
    active: true,
    flashSale: true,
    cashOnDelivery: true,
  },
  {
    id: 2,
    name: "Montre Connectée Fitness",
    price: 28000,
    originalPrice: 40000,
    stock: 8,
    active: true,
    flashSale: true,
    cashOnDelivery: true,
  },
  {
    id: 3,
    name: "Tablette Android 10 pouces",
    price: 85000,
    originalPrice: 110000,
    stock: 3,
    active: true,
    flashSale: false,
    cashOnDelivery: false,
  },
  {
    id: 4,
    name: "Chargeur sans fil",
    price: 12000,
    originalPrice: 15000,
    stock: 15,
    active: true,
    flashSale: false,
    cashOnDelivery: true,
  },
  {
    id: 5,
    name: "Batterie externe 20000mAh",
    price: 18000,
    originalPrice: 25000,
    stock: 10,
    active: true,
    flashSale: false,
    cashOnDelivery: true,
  },
]

interface VendorProductsTableProps {
  vendorId: number
}

export default function VendorProductsTable({ vendorId }: VendorProductsTableProps) {
  // Format price in FCFA
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  // Calculate discount percentage
  const calculateDiscount = (originalPrice: number, price: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Réduction</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Vente Flash</th>
              <th className="px-4 py-3">Paiement à la livraison</th>
            </tr>
          </thead>
          <tbody>
            {vendorProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-gray-500">ID: {product.id}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{formatPrice(product.price)}</div>
                  <div className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge className="bg-[#FFCB2D] text-black">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </Badge>
                </td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  {product.flashSale ? (
                    <Badge className="bg-green-100 text-green-800">Oui</Badge>
                  ) : (
                    <Badge variant="outline">Non</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {product.cashOnDelivery ? (
                    <Badge className="bg-green-100 text-green-800">Oui</Badge>
                  ) : (
                    <Badge variant="outline">Non</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
