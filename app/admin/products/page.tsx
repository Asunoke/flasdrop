import type { Metadata } from "next"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import { AdminDeleteAllProducts } from "@/components/admin-delete-all-products"
import ProductsTable from "@/components/admin-products-table"

export const metadata: Metadata = {
  title: "Gestion des Produits | Admin FlashDrop Market",
  description: "Gérez tous les produits de la plateforme FlashDrop Market",
}

export default function AdminProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Gestion des Produits</h1>
              <AdminDeleteAllProducts />
            </div>

            {/* Products table */}
            <Card>
              <CardHeader>
                <CardTitle>Tous les Produits</CardTitle>
                <CardDescription>Gérez tous les produits de la plateforme</CardDescription>
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
