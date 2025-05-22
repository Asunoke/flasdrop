import { getAllProducts } from "@/lib/products"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, Edit, Trash } from "lucide-react"

export default async function AdminProductsTable() {
  const products = await getAllProducts()

  return (
    <div className="rounded-md border">
      {products.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-lg font-medium">Aucun produit trouvé</p>
          <p className="text-sm text-gray-500 mt-1">
            Aucun produit n&apos;est actuellement disponible dans la base de données.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-4 py-3">Produit</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Réduction</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Vendeur</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
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
                  <td className="px-4 py-3">{product.vendor.name}</td>
                  <td className="px-4 py-3">
                    {product.active ? (
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    ) : (
                      <Badge variant="outline">Inactif</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
