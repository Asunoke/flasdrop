import { BarChart3, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard-header"
import ProductsTable from "@/components/products-table"
import RecentOrders from "@/components/recent-orders"
import { getCurrentUser } from "@/lib/session"
import { getVendorStats } from "@/lib/actions"
import { formatPrice } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "VENDOR") {
    redirect("/")
  }

  const stats = await getVendorStats(user.id)

  // Le reste du code reste inchangé
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col bg-orange-600 text-white md:flex">
          <div className="flex h-14 items-center border-b border-white/10 px-4 font-semibold">
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span>FlashDrop Vendeur</span>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Principal</div>
            <a href="/dashboard" className="flex items-center bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <BarChart3 className="mr-3 h-4 w-4" />
              Tableau de bord
            </a>
            <a
              href="/dashboard/products"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              <Package className="mr-3 h-4 w-4" />
              Produits
            </a>
            <a
              href="/dashboard/orders"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              <ShoppingCart className="mr-3 h-4 w-4" />
              Commandes
            </a>
            <a
              href="/dashboard/customers"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              <Users className="mr-3 h-4 w-4" />
              Clients
            </a>

            <div className="mt-6 px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
              Paramètres
            </div>
            <a
              href="/dashboard/profile"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Profil
            </a>
            <a
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Paramètres
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-2xl font-bold">Tableau de bord</h1>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(stats.totalSales)}</div>
                  <p className="text-xs text-green-500">+12.5% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.orders.total}</div>
                  <p className="text-xs text-green-500">+8.2% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Produits Actifs</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.productCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.productCount > 0 ? "Produits en vente" : "Aucun produit"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.orders.total > 0
                      ? `${Math.round((stats.orders.completed / stats.orders.total) * 100)}%`
                      : "0%"}
                  </div>
                  <p className="text-xs text-green-500">+2.3% depuis le mois dernier</p>
                </CardContent>
              </Card>
            </div>

            {/* Products table */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Produits en Vente Flash</CardTitle>
                  <CardDescription>Gérez vos produits actuellement en vente flash</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductsTable />
                </CardContent>
              </Card>
            </div>

            {/* Recent orders */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commandes Récentes</CardTitle>
                  <CardDescription>
                    {stats.orders.total > 0
                      ? `Vous avez reçu ${stats.orders.total} commandes`
                      : "Aucune commande reçue pour le moment"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentOrders vendorId={user.id} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
