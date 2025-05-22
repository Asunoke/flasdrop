import { CheckCircle, Clock, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

// Sample orders data for a specific vendor
const vendorOrders = [
  {
    id: "ORD-001",
    customer: "Amadou Diallo",
    customerPhone: "76123456",
    product: "Smartphone Samsung Galaxy A54",
    date: "2025-05-12",
    amount: 149000,
    deliveryFee: 2500,
    status: "completed",
  },
  {
    id: "ORD-004",
    customer: "Aminata Coulibaly",
    customerPhone: "77889900",
    product: "Montre Connectée Fitness",
    date: "2025-05-09",
    amount: 28000,
    deliveryFee: 2500,
    status: "cancelled",
  },
  {
    id: "ORD-008",
    customer: "Moussa Traoré",
    customerPhone: "65789012",
    product: "Tablette Android 10 pouces",
    date: "2025-05-05",
    amount: 85000,
    deliveryFee: 2500,
    status: "pending",
  },
  {
    id: "ORD-012",
    customer: "Kadiatou Sangaré",
    customerPhone: "79012345",
    product: "Chargeur sans fil",
    date: "2025-05-01",
    amount: 12000,
    deliveryFee: 2500,
    status: "completed",
  },
  {
    id: "ORD-015",
    customer: "Seydou Konaté",
    customerPhone: "76543210",
    product: "Batterie externe 20000mAh",
    date: "2025-04-28",
    amount: 18000,
    deliveryFee: 2500,
    status: "processing",
  },
]

interface VendorOrdersTableProps {
  vendorId: number
}

export default function VendorOrdersTable({ vendorId }: VendorOrdersTableProps) {
  // Format price in FCFA
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" /> Livré
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center">
            <Clock className="mr-1 h-3 w-3" /> En attente
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center">
            <Clock className="mr-1 h-3 w-3" /> En traitement
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center">
            <XCircle className="mr-1 h-3 w-3" /> Annulé
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {vendorOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div>{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.customerPhone}</div>
                </td>
                <td className="px-4 py-3">{order.product}</td>
                <td className="px-4 py-3">{formatDate(order.date)}</td>
                <td className="px-4 py-3 font-medium">{formatPrice(order.amount + order.deliveryFee)}</td>
                <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
