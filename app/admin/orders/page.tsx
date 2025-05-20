import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import OrdersTable from "@/components/admin-orders-table"

export default function AdminOrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-2xl font-bold">Gestion des Commandes</h1>

            {/* Orders table */}
            <Card>
              <CardHeader>
                <CardTitle>Toutes les Commandes</CardTitle>
                <CardDescription>Gérez et suivez toutes les commandes de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
