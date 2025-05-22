"use client"

import { useState } from "react"
import { CheckCircle, Clock, Eye, Phone, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample orders data with vendor information
const orders = [
  {
    id: "ORD-001",
    customer: "Amadou Diallo",
    customerPhone: "76123456",
    product: "Smartphone Samsung Galaxy A54",
    date: "2025-05-12",
    amount: 149000,
    deliveryFee: 2500,
    status: "completed",
    vendor: {
      name: "Tech Mali",
      phone: "85239219",
      email: "techmali@example.com",
      address: "Bamako, Hamdallaye ACI 2000",
    },
  },
  {
    id: "ORD-002",
    customer: "Fatoumata Touré",
    customerPhone: "79876543",
    product: "Écouteurs Bluetooth Sans Fil",
    date: "2025-05-11",
    amount: 15000,
    deliveryFee: 2500,
    status: "pending",
    vendor: {
      name: "Audio Center",
      phone: "76543210",
      email: "audiocenter@example.com",
      address: "Bamako, Badalabougou",
    },
  },
  {
    id: "ORD-003",
    customer: "Ibrahim Keita",
    customerPhone: "65432198",
    product: "Mixeur Blender Professionnel",
    date: "2025-05-10",
    amount: 35000,
    deliveryFee: 2500,
    status: "processing",
    vendor: {
      name: "Électro Mali",
      phone: "77889900",
      email: "electromali@example.com",
      address: "Bamako, Magnambougou",
    },
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
    vendor: {
      name: "Tech Mali",
      phone: "85239219",
      email: "techmali@example.com",
      address: "Bamako, Hamdallaye ACI 2000",
    },
  },
  {
    id: "ORD-005",
    customer: "Oumar Sissoko",
    customerPhone: "66554433",
    product: "Enceinte Bluetooth Portable",
    date: "2025-05-08",
    amount: 22000,
    deliveryFee: 2500,
    status: "pending",
    vendor: {
      name: "Audio Center",
      phone: "76543210",
      email: "audiocenter@example.com",
      address: "Bamako, Badalabougou",
    },
  },
]

export default function OrdersTable() {
  const [orderList, setOrderList] = useState(orders)
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  // View order details
  const viewOrderDetails = (order: (typeof orders)[0]) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  // Update order status
  const updateOrderStatus = (status: string) => {
    if (selectedOrder) {
      const updatedOrders = orderList.map((order) => (order.id === selectedOrder.id ? { ...order, status } : order))
      setOrderList(updatedOrders)
      setSelectedOrder({ ...selectedOrder, status })
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Produit</th>
                <th className="px-4 py-3">Vendeur</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">
                    <div>{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.customerPhone}</div>
                  </td>
                  <td className="px-4 py-3">{order.product}</td>
                  <td className="px-4 py-3">{order.vendor.name}</td>
                  <td className="px-4 py-3">{formatDate(order.date)}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(order.amount + order.deliveryFee)}</td>
                  <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => viewOrderDetails(order)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir détails</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order details dialog */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Détails de la commande {selectedOrder.id}</DialogTitle>
              <DialogDescription>Commande passée le {formatDate(selectedOrder.date)}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Informations Client</h3>
                  <p className="text-sm">{selectedOrder.customer}</p>
                  <p className="text-sm flex items-center mt-1">
                    <Phone className="h-3 w-3 mr-1" /> {selectedOrder.customerPhone}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Informations Vendeur</h3>
                  <p className="text-sm">{selectedOrder.vendor.name}</p>
                  <p className="text-sm flex items-center mt-1">
                    <Phone className="h-3 w-3 mr-1" /> {selectedOrder.vendor.phone}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Produit</h3>
                <p className="text-sm">{selectedOrder.product}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Prix du produit</h3>
                  <p className="text-sm">{formatPrice(selectedOrder.amount)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Frais de livraison</h3>
                  <p className="text-sm">{formatPrice(selectedOrder.deliveryFee)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Montant total</h3>
                <p className="text-lg font-bold">{formatPrice(selectedOrder.amount + selectedOrder.deliveryFee)}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Statut de la commande</h3>
                <Select defaultValue={selectedOrder.status} onValueChange={updateOrderStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="processing">En traitement</SelectItem>
                    <SelectItem value="completed">Livré</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Adresse du vendeur</h3>
                <p className="text-sm">{selectedOrder.vendor.address}</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Fermer
              </Button>
              <Button className="bg-[#FFCB2D] text-black hover:bg-[#e6b728]">Imprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
