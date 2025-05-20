import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FlashDrop Market - Dashboard Vendeur",
  description: "Gérez vos produits et vos ventes sur FlashDrop Market",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
