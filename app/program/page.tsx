import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Package, ShoppingBag, Smartphone, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "FlashDrop Market - Ventes Flash au Mali",
  description:
    "Découvrez des offres exclusives limitées dans le temps. Prix chocs, paiement mobile et livraison rapide partout au Mali.",
  keywords: ["ventes flash", "e-commerce", "Mali", "achats en ligne", "promotions", "réductions"],
}


export default function SellerProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-orange-600 text-white py-6 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">Programme Vendeurs FlashDrop</h1>
          <p className="text-sm mt-2 md:mt-0">Version 1 — Bientôt Disponible</p>
        </div>
      </header>

     <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Programme Vendeur
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
              Vendez rapidement, écoulez vos stocks et augmentez vos revenus.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
               <Link href="https://wa.me/22385239219" target="_blank">
  <Button className="bg-[#FFCB2D] text-black hover:bg-[#e6b728]">Contacter sur WhatsApp</Button>
</Link>


                  <Link href="/">
                    <Button variant="outline" className="border-white text-black hover:bg-white/10">
                      Devenir Vendeur
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/boy.webp?height=400&width=400"
                  alt="FlashDrop Market"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
       

 

       <section className="w-full py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">🎯 Fonctionnalités de la V1</h2>
                      <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Simple, rapide et efficace - FlashDrop connecte vendeurs et acheteurs à travers tout le Mali
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <Card className="border-none shadow-lg">
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="bg-orange-600 p-3 rounded-full mb-4">
                          <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Trouvez des Offres</h3>
                        <p className="text-gray-500">
                          Participer à des ventes flash régulières
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="bg-orange-600 p-3 rounded-full mb-4">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Payez Facilement</h3>
                        <p className="text-gray-500">
                        Recevez vos paiements instantanément via Orange Money ou Moov Money.

                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="bg-orange-600 p-3 rounded-full mb-4">
                          <Truck className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Envoyez Rapidement</h3>
                        <p className="text-gray-500">
                         Vos clients sont livrés automatiquement, sans effort de votre part.r
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>
 
      {/* Pricing Section */}
      <section className="py-16 bg-orange-50 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">💼 Choisissez votre plan</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold text-orange-500 mb-2">Free</h4>
              <p className="mb-4">Commencez gratuitement</p>
              <ul className="list-disc list-inside text-left mb-4 space-y-1">
                <li>Accès à la plateforme</li>
                <li>Ventes flash incluses</li>
                <li>Commission : 10% sur chaque vente</li>
              </ul>
              <p className="text-sm text-gray-500">Sans engagement</p>
            </div>
            <div className="bg-white border-2 border-orange-500 p-8 rounded-xl shadow-md">
              <h4 className="text-xl font-bold text-orange-700 mb-2">Premium</h4>
              <p className="mb-4">10 000 FCFA / mois</p>
              <ul className="list-disc list-inside text-left mb-4 space-y-1">
                <li>Visibilité boostée</li>
                <li>Support prioritaire</li>
                <li>Commission réduite : 5% sur chaque vente</li>
                <li>Accès anticipé aux ventes</li>
                <li>Accès à un conseiller commercial FlashDrop</li>
              </ul>
              <p className="text-sm text-gray-600">Annulable à tout moment</p>
            </div>
          </div>
        </div>
      </section>
 </main>
      {/* Call to Action */}
      <section className="text-center py-12 px-6">
        <h3 className="text-xl font-semibold mb-2">📢 Le lancement officiel approche</h3>
        <p className="mb-4">Rejoignez-nous dès maintenant pour faire partie des premiers vendeurs FlashDrop.</p>
<p className="text-center text-sm text-gray-600 mt-6">
  Plus de 120 vendeurs nous ont déjà rejoints !
</p>

        <Link href="/">
                    <Button variant="outline" className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-al">
                      Rejoindre la liste d’attente
                    </Button>
                  </Link>
      </section>
    </div>
  
    
  );
}