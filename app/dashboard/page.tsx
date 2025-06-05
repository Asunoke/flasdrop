import { BarChart3, Package, ShoppingCart, Users, MessageCircle, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard-header"
import ProductsTable from "@/components/products-table"
import RecentOrders from "@/components/recent-orders"
import { getCurrentUser } from "@/lib/session"
import { getVendorStats } from "@/lib/actions"
import { formatPrice } from "@/lib/utils"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "VENDOR") {
    redirect("/")
  }

  const stats = await getVendorStats(user.id)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <DashboardHeader />

      <div className="flex flex-1">
       

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <Link href="https://chat.whatsapp.com/CWSsYPNp8AC4bEn65NtyH2" target="_blank">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Support
                </Button>
              </Link>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Ventes Totales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSales)}</div>
                  <p className="text-xs text-green-500">+12.5% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.orders.total}</div>
                  <p className="text-xs text-green-500">+8.2% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Produits Actifs</CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.productCount}</div>
                  <p className="text-xs text-gray-500">
                    {stats.productCount > 0 ? "Produits en vente" : "Aucun produit"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Taux de Conversion</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
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
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Produits en Vente Flash</CardTitle>
                  <CardDescription>Gérez vos produits actuellement en vente flash</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductsTable />
                </CardContent>
              </Card>
            </div>

            {/* Recent orders */}
            <div className="mt-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Commandes Récentes</CardTitle>
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