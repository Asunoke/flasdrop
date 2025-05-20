import { Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import OrdersTable from "@/components/admin-orders-table"
import VendorsTable from "@/components/admin-vendors-table"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-2xl font-bold">Tableau de bord Administrateur</h1>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,850,000 FCFA</div>
                  <p className="text-xs text-green-500">+15.3% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-green-500">+12.5% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Vendeurs</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-green-500">+3 nouveaux ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Produits Actifs</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86</div>
                  <p className="text-xs text-muted-foreground">32 en vente flash</p>
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
                  <OrdersTable />
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
                  <VendorsTable />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
