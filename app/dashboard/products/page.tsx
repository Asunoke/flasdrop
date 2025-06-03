import { Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import ProductsTable from "@/components/products-table"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
   

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col bg-gray-900 text-white md:flex">
          <div className="flex h-14 items-center border-b border-gray-700 px-4 font-semibold">
            <Package className="mr-2 h-5 w-5 text-purple-400" />
            <span>FlashDrop Vendeur</span>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Principal</div>
            <a
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Tableau de bord
            </a>
            <a
              href="/dashboard/products"
              className="flex items-center bg-gray-800 px-4 py-2 text-sm font-medium text-white"
            >
              Produits
            </a>
            <a
              href="/dashboard/orders"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Commandes
            </a>
            <a
              href="/dashboard/customers"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Clients
            </a>

            <div className="mt-6 px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Paramètres
            </div>
            <a
              href="/dashboard/profile"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Profil
            </a>
            <a
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Paramètres
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Nouveau Produit
              </Button>
            </div>

            {/* Products table */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Tous les Produits</CardTitle>
                <CardDescription>Gérez tous vos produits et leurs statuts de vente flash</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}