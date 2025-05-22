import { Eye, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

// Sample vendors data
const vendors = [
  {
    id: 1,
    name: "Tech Mali",
    phone: "85239219",
    email: "techmali@example.com",
    address: "Bamako, Hamdallaye ACI 2000",
    productsCount: 15,
    ordersCount: 48,
    totalSales: 1245000,
  },
  {
    id: 2,
    name: "Audio Center",
    phone: "76543210",
    email: "audiocenter@example.com",
    address: "Bamako, Badalabougou",
    productsCount: 8,
    ordersCount: 32,
    totalSales: 850000,
  },
  {
    id: 3,
    name: "Électro Mali",
    phone: "77889900",
    email: "electromali@example.com",
    address: "Bamako, Magnambougou",
    productsCount: 12,
    ordersCount: 25,
    totalSales: 720000,
  },
  {
    id: 4,
    name: "Fashion Mali",
    phone: "65432198",
    email: "fashionmali@example.com",
    address: "Bamako, Kalaban Coura",
    productsCount: 24,
    ordersCount: 19,
    totalSales: 560000,
  },
  {
    id: 5,
    name: "Home Decor Mali",
    phone: "79876543",
    email: "homedecormali@example.com",
    address: "Bamako, Lafiabougou",
    productsCount: 18,
    ordersCount: 15,
    totalSales: 475000,
  },
]

export default function VendorsTable() {
  // Format price in FCFA
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
              <th className="px-4 py-3">Vendeur</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Produits</th>
              <th className="px-4 py-3">Commandes</th>
              <th className="px-4 py-3">Ventes Totales</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b">
                <td className="px-4 py-3">
                  <div className="font-medium">{vendor.name}</div>
                  <div className="text-xs text-gray-500">{vendor.address}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-1" /> {vendor.phone}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Mail className="h-3 w-3 mr-1" /> {vendor.email}
                  </div>
                </td>
                <td className="px-4 py-3">{vendor.productsCount}</td>
                <td className="px-4 py-3">{vendor.ordersCount}</td>
                <td className="px-4 py-3 font-medium">{formatPrice(vendor.totalSales)}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/admin/vendors/${vendor.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir détails</span>
                    </a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
