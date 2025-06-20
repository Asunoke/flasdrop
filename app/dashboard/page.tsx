import { BarChart3, Package, ShoppingCart, Users, MessageCircle, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { getVendorStats } from "@/lib/actions"
import { formatPrice } from "@/lib/utils"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import ProductsTable from "@/components/products-table"
import RecentOrders from "@/components/recent-orders"

interface VendorStats {
  totalSales: number
  completedOrders: number
  productCount: number
  orders: {
    total: number
    pending: number
    processing: number
    completed: number
    cancelled: number
  }
  recentOrders: Array<{
    id: string
    status: string
    createdAt: Date
    user: {
      name: string
      phone: string
    }
  }>
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "VENDOR") {
    redirect("/")
  }

  const { stats: vendorStats } = await getVendorStats(user.id)

  if (!vendorStats) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <DashboardHeader />
        <div className="flex flex-1">
          <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              </div>
              <div className="mt-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Erreur</CardTitle>
                    <CardDescription>
                      Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer plus tard.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <DashboardHeader />

      <div className="flex flex-1">
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
                  <div>
                    <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                    <CardDescription className="text-2xl font-bold">
                      {formatPrice(vendorStats.totalSales)}
                    </CardDescription>
                  </div>
                  <div className="text-3xl font-bold text-green-500">+</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-500">+2.3% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium">Commandes complétées</CardTitle>
                    <CardDescription className="text-2xl font-bold">
                      {vendorStats.completedOrders}
                    </CardDescription>
                  </div>
                  <div className="text-3xl font-bold text-blue-500">✓</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-blue-500">+1.8% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium">Produits</CardTitle>
                    <CardDescription className="text-2xl font-bold">
                      {vendorStats.productCount}
                    </CardDescription>
                  </div>
                  <div className="text-3xl font-bold text-purple-500">📦</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-purple-500">+3.5% depuis le mois dernier</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium">Commandes en cours</CardTitle>
                    <CardDescription className="text-2xl font-bold">
                      {vendorStats.orders.pending + vendorStats.orders.processing}
                    </CardDescription>
                  </div>
                  <div className="text-3xl font-bold text-yellow-500">⏳</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-yellow-500">-0.5% depuis le mois dernier</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent orders */}
            <div className="mt-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Commandes Récentes</CardTitle>
                  <CardDescription>
                    {vendorStats.orders.total > 0
                      ? `Vous avez reçu ${vendorStats.orders.total} commandes`
                      : "Aucune commande reçue pour le moment"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentOrders vendorId={user.id} />
                </CardContent>
              </Card>
            </div>

            {/* Products table */}
            <div className="mt-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>Gestion des Produits</CardTitle>
                  <CardDescription>Gérez vos produits actuellement en vente flash</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductsTable />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

