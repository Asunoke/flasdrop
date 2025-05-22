import Link from "next/link"
import { BarChart3, Package, Settings, ShoppingCart, Store, Users } from "lucide-react"

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 flex-col bg-orange-600 text-white md:flex">
      <div className="flex h-14 items-center border-b border-white/10 px-4 font-semibold">
        <Store className="mr-2 h-5 w-5" />
        <span>FlashDrop Admin</span>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Principal</div>
        <Link href="/admin" className="flex items-center bg-white/10 px-4 py-2 text-sm font-medium text-white">
          <BarChart3 className="mr-3 h-4 w-4" />
          Tableau de bord
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          <ShoppingCart className="mr-3 h-4 w-4" />
          Commandes
        </Link>
        <Link
          href="/admin/vendors"
          className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          <Store className="mr-3 h-4 w-4" />
          Vendeurs
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          <Package className="mr-3 h-4 w-4" />
          Produits
        </Link>
        <Link
          href="/admin/customers"
          className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          <Users className="mr-3 h-4 w-4" />
          Clients
        </Link>

        <div className="mt-6 px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Paramètres</div>
        <Link
          href="/admin/settings"
          className="flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          <Settings className="mr-3 h-4 w-4" />
          Paramètres
        </Link>
      </nav>
    </aside>
  )
}
