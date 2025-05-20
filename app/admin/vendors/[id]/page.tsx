import { ArrowLeft, Mail, MapPin, Phone, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import VendorOrdersTable from "@/components/vendor-orders-table"
import VendorProductsTable from "@/components/vendor-products-table"

// Sample vendor data (in a real app, this would be fetched based on the ID)
const vendor = {
  id: 1,
  name: "Tech Mali",
  phone: "85239219",
  email: "techmali@example.com",
  address: "Bamako, Hamdallaye ACI 2000",
  description: "Spécialiste en produits électroniques et gadgets technologiques.",
  joinDate: "2024-01-15",
  productsCount: 15,
  ordersCount: 48,
  totalSales: 1245000,
}

export default function VendorDetailsPage() {
  // Format price in FCFA
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <Button variant="ghost" className="mb-2" asChild>
                <a href="/admin/vendors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux vendeurs
                </a>
              </Button>
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
            </div>

            {/* Vendor details */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du Vendeur</CardTitle>
                  <CardDescription>Détails et coordonnées du vendeur</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Téléphone</h3>
                      <p>{vendor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p>{vendor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Adresse</h3>
                      <p>{vendor.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShoppingBag className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p>{vendor.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>Performance du vendeur</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date d&apos;inscription</h3>
                    <p className="text-lg font-medium">{formatDate(vendor.joinDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nombre de produits</h3>
                    <p className="text-lg font-medium">{vendor.productsCount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Commandes traitées</h3>
                    <p className="text-lg font-medium">{vendor.ordersCount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ventes totales</h3>
                    <p className="text-lg font-bold">{formatPrice(vendor.totalSales)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vendor products */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Produits du Vendeur</CardTitle>
                  <CardDescription>Liste des produits proposés par {vendor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <VendorProductsTable vendorId={vendor.id} />
                </CardContent>
              </Card>
            </div>

            {/* Vendor orders */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commandes du Vendeur</CardTitle>
                  <CardDescription>Historique des commandes pour {vendor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <VendorOrdersTable vendorId={vendor.id} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
