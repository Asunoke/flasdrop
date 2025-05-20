import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Package, ShoppingBag, Smartphone, Truck } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FlashSaleCard from "@/components/flash-sale-card"
import CountdownTimer from "@/components/countdown-timer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getLatestProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "FlashDrop Market - Ventes Flash au Mali",
  description:
    "Découvrez des offres exclusives limitées dans le temps. Prix chocs, paiement mobile et livraison rapide partout au Mali.",
  keywords: ["ventes flash", "e-commerce", "Mali", "achats en ligne", "promotions", "réductions"],
}

export default async function Home() {
  const latestProducts = await getLatestProducts(3)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Le Mali vend en direct
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Découvrez des offres exclusives limitées dans le temps. Prix chocs, paiement mobile et livraison
                    rapide.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/flash-sales">
                    <Button className="bg-[#FFCB2D] text-black hover:bg-[#e6b728]">Acheter Maintenant</Button>
                  </Link>
                  <Link href="/program">
                    <Button variant="outline" className="border-white text-black hover:bg-white/10">
                      Devenir Vendeur
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/header1.webp?height=400&width=400"
                  alt="FlashDrop Market"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Active Flash Sales */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-[#F3F4F6]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ventes Flash en Cours</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ne manquez pas ces offres exclusives à durée limitée
                </p>
              </div>
              <div className="w-full max-w-sm">
                <CountdownTimer endTime={Date.now() + 24 * 60 * 60 * 1000} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {latestProducts.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-lg font-medium">Aucun produit trouvé</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Aucun produit n&apos;est actuellement disponible. Revenez bientôt pour découvrir nos offres!
                  </p>
                </div>
              ) : (
                latestProducts.map((product) => (
                  <FlashSaleCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image || "/placeholder.svg?height=300&width=300"}
                    remaining={product.stock}
                    cashOnDelivery={product.cashOnDelivery}
                    vendorId={product.vendorId}
                  />
                ))
              )}
            </div>
            <div className="flex justify-center mt-8">
              <Button className="bg-[#FFCB2D] text-black hover:bg-[#e6b728]" asChild>
                <Link href="/flash-sales">Voir Toutes les Ventes Flash</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment Ça Marche</h2>
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
                    Parcourez notre sélection de ventes flash exclusives avec des réductions importantes
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
                    Utilisez Orange Money ou Moov Money pour un paiement sécurisé et instantané
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-orange-600 p-3 rounded-full mb-4">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Recevez Rapidement</h3>
                  <p className="text-gray-500">
                    Choisissez entre la livraison à domicile ou le retrait en point de vente
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-[#F3F4F6]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/fdone.png?height=400&width=400"
                  alt="Avantages FlashDrop"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pourquoi Choisir FlashDrop?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                    L&apos;alliance parfaite entre bonnes affaires, technologie locale et simplicité d&apos;utilisation
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-[#FFCB2D] p-1 rounded-full">
                      <Package className="h-5 w-5 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Produits Exclusifs</h3>
                      <p className="text-sm text-gray-500">
                        Des offres uniques et limitées dans le temps pour tous les budgets
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-[#FFCB2D] p-1 rounded-full">
                      <Smartphone className="h-5 w-5 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Paiement Mobile Intégré</h3>
                      <p className="text-sm text-gray-500">
                        Payez facilement avec Orange Money ou Moov Money en quelques clics
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-[#FFCB2D] p-1 rounded-full">
                      <MapPin className="h-5 w-5 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Livraison Partout au Mali</h3>
                      <p className="text-sm text-gray-500">
                        Service de livraison rapide ou option de retrait en magasin
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-[#FFCB2D] p-1 rounded-full">
                      <Clock className="h-5 w-5 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Paiement à la Livraison</h3>
                      <p className="text-sm text-gray-500">
                        Option de paiement à la livraison disponible sur certains produits
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Prêt à Découvrir les Meilleures Offres?
                </h2>
                <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Inscrivez-vous maintenant et recevez 5000 FCFA de réduction sur votre premier achat
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/register">
                  <Button className="w-full bg-[#FFCB2D] text-black hover:bg-[#e6b728]">Créer un Compte</Button>
                </Link>
                <p className="text-sm text-gray-200">
                  Déjà inscrit?{" "}
                  <Link href="/login" className="underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
