"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

// Order type
interface Order {
  id: string
  customer: {
    name: string
    phone: string
  }
  productName: string
  date: string
  amount: number
  status: string
}

interface RecentOrdersProps {
  vendorId?: string
}

export default function RecentOrders({ vendorId }: RecentOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = vendorId ? `/api/orders?vendorId=${vendorId}` : "/api/orders"
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [vendorId])

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
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" /> Livré
          </Badge>
        )
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center">
            <Clock className="mr-1 h-3 w-3" /> En attente
          </Badge>
        )
      case "PROCESSING":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center">
            <Clock className="mr-1 h-3 w-3" /> En traitement
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center">
            <XCircle className="mr-1 h-3 w-3" /> Annulé
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Chargement des commandes...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium">Aucune commande trouvée</p>
        <p className="text-sm text-gray-500 mt-1">
          Vous n'avez pas encore reçu de commandes. Elles apparaîtront ici lorsque des clients achèteront vos produits.
        </p>
      </div>
    )
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
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div>{order.customer.name}</div>
                  <div className="text-xs text-gray-500">{order.customer.phone}</div>
                </td>
                <td className="px-4 py-3">{order.productName}</td>
                <td className="px-4 py-3">{formatDate(order.date)}</td>
                <td className="px-4 py-3 font-medium">{formatPrice(order.amount)}</td>
                <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
