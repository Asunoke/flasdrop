

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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container py-12 md:py-166">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div>
              <h4 className="text-xl font-bold mb-4">FlashDrop Market</h4>
              <p className="text-gray-400">
                La plateforme malienne de ventes flash unique, créée pour faciliter le commerce et le business au Mali.
              </p>
            </div>
           <div>
              <h4 className="text-xl font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">À propos</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
          <div >
            <h4 className="text-xl font-bold mb-4">Informations</h4>
            <ul className="space-y-2">
            <li><a href="/join" className="text-gray-400 hover:text-white">Nous rejoindre</a></li>
            <li><a href="/program" className="text-gray-400 hover:text-white">Devenir vendeur</a></li>
            <li><a href="/terms" className="text-gray-400 hover:text-white"> Conditions d&apos;utilisation</a></li>
            </ul>
          </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Bamako, Mali</li>
                <li>flashdropmarket@gmail.com</li>
                <li>+223 91 97 30 41</li>
              </ul>
            </div>
        
        </div>
         <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tenoble sotfwares. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
