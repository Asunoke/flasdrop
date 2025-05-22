"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { AuthButtons } from "@/components/auth-buttons"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-orange-600 text-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <ShoppingBag className="h-6 w-6" />
          <span>FlashDrop Market</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            Accueil
          </Link>
          <Link href="/flash-sales" className="text-sm font-medium hover:underline">
            Ventes Flash
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Comment ça marche
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Vendeurs
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </nav>
        <AuthButtons />
      </div>
    </header>
  )
}
