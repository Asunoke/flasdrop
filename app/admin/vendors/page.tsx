import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import VendorsTable from "@/components/admin-vendors-table"

export default function AdminVendorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-2xl font-bold">Gestion des Vendeurs</h1>

            {/* Vendors table */}
            <Card>
              <CardHeader>
                <CardTitle>Tous les Vendeurs</CardTitle>
                <CardDescription>Gérez et suivez tous les vendeurs de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <VendorsTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
