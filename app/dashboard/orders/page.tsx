import { ShoppingCart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard-header"
import RecentOrders from "@/components/recent-orders"

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar - This would be a shared component in a real app */}
        <aside className="hidden w-64 flex-col bg-orange-600 text-white md:flex">
          <div className="flex h-14 items-center border-b border-white/10 px-4 font-semibold">
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span>FlashDrop Vendeur</span>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Principal</div>
            <a
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Tableau de bord
            </a>
            <a
              href="/dashboard/products"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Produits
            </a>
            <a
              href="/dashboard/orders"
              className="flex items-center bg-white/10 px-4 py-2 text-sm font-medium text-white"
            >
              Commandes
            </a>
            <a
              href="/dashboard/customers"
              className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
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
            <h1 className="mb-6 text-2xl font-bold">Gestion des Commandes</h1>

            {/* Orders table */}
            <Card>
              <CardHeader>
                <CardTitle>Toutes les Commandes</CardTitle>
                <CardDescription>Suivez et gérez toutes vos commandes</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
