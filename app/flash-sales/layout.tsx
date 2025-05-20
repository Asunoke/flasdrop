import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ventes Flash | FlashDrop Market",
  description: "Découvrez toutes nos ventes flash avec des réductions importantes",
}

export default function FlashSalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
