import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Package, ShoppingBag, Smartphone, Truck, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "FlashDrop Market - Programme Vendeurs",
  description: "Rejoignez le programme vendeur FlashDrop Market pour vendre rapidement vos produits au Mali avec notre plateforme de ventes flash.",
  keywords: ["vendeur", "e-commerce Mali", "ventes flash", "programme vendeur", "vendre en ligne Mali"],
}

export default function SellerProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Programme Vendeur FlashDrop
                  </h1>
                  <p className="max-w-[600px] text-orange-100 md:text-xl">
                    Vendez rapidement, écoulez vos stocks et augmentez vos revenus grâce à notre plateforme de ventes flash.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="https://wa.me/22385239219" target="_blank">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Contacter sur WhatsApp
                    </Button>
                  </Link>
                  
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/vendor.webp"
                  alt="Vendeur FlashDrop Market"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  🎯 Fonctionnalités de la Version 1
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Simple, rapide et efficace - FlashDrop connecte vendeurs et acheteurs à travers tout le Mali
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-orange-600 p-3 rounded-full mb-4">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ventes Flash Organisées</h3>
                  <p className="text-gray-500">
                    Participez à des ventes flash thématiques régulières pour maximiser votre visibilité
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-orange-600 p-3 rounded-full mb-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Paiements Mobiles</h3>
                  <p className="text-gray-500">
                    Recevez vos paiements instantanément via Orange Money, Moov Money ou carte bancaire
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-orange-600 p-3 rounded-full mb-4">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Logistique Simplifiée</h3>
                  <p className="text-gray-500">
                    Options de livraison flexible avec nos partenaires ou retrait en point de vente
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 bg-orange-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">💎 Avantages pour les Vendeurs</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Augmentation du Chiffre d'Affaires</h3>
                    <p className="text-gray-600">Vendez en grande quantité pendant les périodes de ventes flash</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Écoulement des Stocks</h3>
                    <p className="text-gray-600">Liquiditez vos invendus rapidement et efficacement</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Nouveaux Clients</h3>
                    <p className="text-gray-600">Touchez des milliers d'acheteurs à travers tout le Mali</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Sans Frais Initiaux</h3>
                    <p className="text-gray-600">Commencez gratuitement, payez seulement sur les ventes réalisées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
              💼 Choisissez votre plan vendeur
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-2xl font-bold text-orange-500 mb-2">Basic</h4>
                <p className="text-4xl font-bold mb-4">0 FCFA</p>
                <p className="mb-6 text-gray-500">Commencez gratuitement</p>
                <ul className="space-y-3 text-left mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Accès à la plateforme</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Participation aux ventes flash</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Commission : 10% par vente</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Commencer gratuitement
                </Button>
              </div>
              <div className="bg-white border-2 border-orange-500 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-bold text-orange-700 mb-2">Premium</h4>
                    <p className="text-4xl font-bold mb-4">10 000 FCFA<span className="text-sm font-normal">/mois</span></p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    POPULAIRE
                  </span>
                </div>
                <p className="mb-6 text-gray-500">Optimisez vos ventes</p>
                <ul className="space-y-3 text-left mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tous les avantages Basic</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Visibilité boostée</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Commission réduite à 5%</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Support prioritaire</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Conseiller dédié</span>
                  </li>
                </ul>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Choisir Premium
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">👥 Témoignages de nos vendeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Aminata D.",
                  role: "Vendeuse de vêtements",
                  content: "Grâce à FlashDrop, j'ai multiplié mes ventes par 3 en un mois. La plateforme est simple et les paiements arrivent directement sur mon Orange Money."
                },
                {
                  name: "Moussa K.",
                  role: "Commerçant électronique",
                  content: "En tant que petit commerçant, c'est la solution idéale pour écouler mes stocks sans faire de publicité coûteuse."
                },
                {
                  name: "Fatouma S.",
                  role: "Artisane",
                  content: "Les ventes flash m'ont permis de me faire connaître dans tout le Mali. Maintenant j'ai des clients réguliers qui me commandent en dehors des promotions."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-orange-100 text-orange-600 h-10 w-10 rounded-full flex items-center justify-center font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full  md:py-24 lg:py-32 bg-muted py-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">🚀 Prêt à booster vos ventes ?</h3>
            <p className="mb-8 text-black max-w-2xl mx-auto">
              Rejoignez dès maintenant la communauté des vendeurs FlashDrop et profitez de notre plateforme en croissance rapide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register-seller">
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  S'inscrire Maintenant
                </Button>
              </Link>
              <Link href="https://wa.me/22385239219" target="_blank">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                  Nous Contacter
                </Button>
              </Link>
            </div>
            <p className="text-center text-orange-200 mt-6 text-sm">
              Déjà plus de 120 vendeurs nous ont rejoints !
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}