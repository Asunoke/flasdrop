import type { Metadata } from "next"
import { Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import { getStats } from "@/lib/admin"
import { formatPrice } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Tableau de bord Admin | FlashDrop Market",
  description: "Gérez la plateforme FlashDrop Market",
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Tableau de bord Administratif</h1>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(stats.totalSales)}</div>
                  <p className="text-xs text-green-500">+15.3% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.orders.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.orders.pending} en attente, {stats.orders.completed} complétées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Vendeurs</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.vendorCount}</div>
                  <p className="text-xs text-green-500">+3 nouveaux ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Produits Actifs</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.productCount}</div>
                  <p className="text-xs text-muted-foreground">Produits en vente</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent orders */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commandes Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for OrdersTable component */}
                  <div className="p-4 text-center text-gray-500">Chargement des commandes récentes...</div>
                </CardContent>
              </Card>
            </div>

            {/* Vendors */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendeurs Actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for VendorsTable component */}
                  <div className="p-4 text-center text-gray-500">Chargement des vendeurs actifs...</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
