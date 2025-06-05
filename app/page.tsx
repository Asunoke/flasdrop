import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Package, ShoppingBag, Smartphone, Truck } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FlashSaleCard from "@/components/flash-sale-card"
import CountdownTimer from "@/components/countdownTimer"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
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
        <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/hero-bg.png" alt="Hero background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12">
            {/* Left Content */}
            <div className="space-y-6">
              <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm font-medium">
                Meilleurs prix
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                  Prix imbattables
                  <br />
                  sur vos produits
                  <br />
                  préférés
                </h1>

                <p className="text-lg text-white/90 drop-shadow">Achetez plus pour moins cher</p>
              </div>

             <Link href="/flash-sales">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
              >
                Acheter
              </Button>
              </Link>


              <Link href="/program">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3
                   rounded-full text-lg font-bold shadow-lg">Devenir Vendeur</Button>
                </Link>
            </div>

            {/* Right Content - Empty for background image */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

         <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Red Banner - Smartphones */}
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073mv2-88WeGpS2LT69b5EwAObEzjZ8TXbuQ3.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-red-500/60 rounded-3xl"></div>
              <div className="relative z-20">
                <p className="text-white/90 text-sm font-medium mb-2">Offres spéciales</p>
                <h3 className="text-white text-3xl font-bold mb-2">
                  30 % de
                  <br />
                  réduction
                </h3>
                <p className="text-white/90 text-sm mb-6">Sur une sélection de smartphones</p>
                
                 <Link href="/flash-sales" >
                <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-6 py-2 font-medium">
                  Acheter
                </Button>
                </Link>
              </div>
            </div>

            {/* Purple Banner - Headphones */}
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c837a6_d84a631864a442a496670bc2d787c6a0mv2-Tj5rlEWoEqnfvq9xqqRClXdi9oGLas.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-purple-600/60 rounded-3xl"></div>
              <div className="relative z-20">
                <p className="text-white/90 text-sm font-medium mb-2">Nouveau</p>
                <h3 className="text-white text-3xl font-bold mb-2">
                  Emportez
                  <br />
                  votre musique
                  <br />
                  partout
                </h3>
                <p className="text-white/90 text-sm mb-6">Meilleures marques de casques</p>
                 <Link href="/flash-sales" >
                <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-6 py-2 font-medium">
                  Acheter
                </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Livraison à domicile</h4>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Livraison gratuite</h4>
                  <p className="text-gray-500 text-xs">dès le premier d'achat</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Meilleurs prix garantis</h4>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Service disponible 24/7</h4>
                </div>
              </div>
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
                <CountdownTimer />
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
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg" asChild>
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
                <h2 className="text-3xl font-bold tracking-tight">Comment Ça Marche ?</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, rapide et efficace - FlashDrop connecte vendeurs et acheteurs à travers tout le Mali
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-purple-600 p-3 rounded-full mb-4">
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
                  <div className="bg-purple-600 p-3 rounded-full mb-4">
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
                  <div className="bg-purple-600 p-3 rounded-full mb-4">
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
        <section className="w-full py-12 md:py-16 lg:py-20 bg-[#fff]">
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
                    <div className="bg-purple-600 p-1 rounded-full">
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
                    <div className="bg-purple-600 p-1 rounded-full">
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
                    <div className="bg-purple-600 p-1 rounded-full">
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
                    <div className="bg-purple-600 p-1 rounded-full">
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
        <section className="w-full  md:py-24 lg:py-32 bg-muted py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Prêt à Découvrir les Meilleures Offres?
                </h2>
                <p className="max-w-[700px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Inscrivez-vous maintenant et recevez 10% de réduction sur votre premier achat
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg">Créer un Compte</Button>
                </Link>
                <p className="text-sm text-black">
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
