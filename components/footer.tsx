import Link from "next/link"
import { ShoppingBag } from "lucide-react"

interface FooterProps {
  simplified?: boolean
}

export function Footer({ simplified = false }: FooterProps) {
  if (simplified) {
    return (
      <footer className="w-full border-t bg-orange-600 text-white py-6">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <p>© 2025 FlashDrop Market. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="w-full border-t bg-orange-600 text-white py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <ShoppingBag className="h-6 w-6" />
              <span>FlashDrop Market</span>
            </Link>
            <p className="text-sm text-gray-200">La plateforme de ventes flash 100% malienne</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/flash-sales" className="hover:underline">
                  Ventes Flash
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:underline">
                  Devenir vendeur
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Conditions d&apos;utilisation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="mailto:support@flashdrop.ml" className="hover:underline">
                  support@flashdrop.ml
                </Link>
              </li>
              <li>
                <Link href="tel:+22385239219" className="hover:underline">
                  +223 85 23 92 19
                </Link>
              </li>
              <li>
                <span>Bamako, Mali</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 border-t border-white/20 pt-6 text-center text-sm">
          <p>© 2025 FlashDrop Market. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
