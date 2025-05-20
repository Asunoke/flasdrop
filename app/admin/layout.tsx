import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FlashDrop Market - Administration",
  description: "Panneau d'administration de FlashDrop Market",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
