import { Metadata } from "next";
import { CheckCircle, Shield, FileText, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Conditions d'Utilisation - FlashDrop Market",
  description: "Lisez nos conditions générales d'utilisation pour utiliser notre plateforme de ventes flash au Mali.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">

        <Header />
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center bg-white/20 p-3 rounded-full mb-6">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Conditions d'Utilisation</h1>
            <p className="text-xl text-orange-100">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm">
            <p className="text-lg text-gray-600">
              Bienvenue sur FlashDrop Market, la plateforme malienne de ventes flash unique. En utilisant notre service, vous acceptez les conditions suivantes.
            </p>
          </section>

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto mb-8 scrollbar-hide">
            <div className="flex space-x-2">
              {['Général', 'Vendeurs', 'Acheteurs', 'Paiements', 'Données'].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${index === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <div className="flex items-start mb-6">
                <div className="bg-purple-600 p-2 rounded-full mr-4">
                  <Shield className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">1. Acceptation des Conditions</h2>
              </div>
              <div className="ml-12 space-y-4 text-gray-600">
                <p>
                  En accédant et en utilisant FlashDrop Market, vous acceptez d'être lié par ces conditions d'utilisation, 
                  toutes les lois et réglementations applicables, et vous convenez que vous êtes responsable de la conformité 
                  avec toutes les lois locales applicables.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800">
                    Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-start mb-6">
                <div className="bg-purple-600 p-2 rounded-full mr-4">
                  <ShoppingBag className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">2. Comptes Utilisateurs</h2>
              </div>
              <div className="ml-12 space-y-4 text-gray-600">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Vous devez avoir au moins 18 ans pour créer un compte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Vous êtes responsable de maintenir la confidentialité de votre compte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Toutes les activités qui se produisent sous votre compte sont de votre responsabilité</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-start mb-6">
                <div className="bg-purple-600 p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">3. Ventes Flash</h2>
              </div>
              <div className="ml-12 space-y-4 text-gray-600">
                <p>
                  Les ventes flash sur FlashDrop Market sont des événements promotionnels limités dans le temps. 
                  Les produits en vente flash sont disponibles jusqu'à épuisement des stocks ou jusqu'à la fin de la période promotionnelle.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-black-800 mb-2">Politique de Retour :</h3>
                  <p>
                    Les articles achetés lors de ventes flash ne peuvent être retournés que s'ils sont défectueux ou ne correspondent pas à leur description.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-start mb-6">
                <div className="bg-purple-600 p-2 rounded-full mr-4">
                  <Shield className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">4. Responsabilités</h2>
              </div>
              <div className="ml-12 space-y-4 text-gray-600">
                <p>
                  FlashDrop Market agit comme une plateforme mettant en relation acheteurs et vendeurs. Nous ne sommes pas responsables :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>De la qualité des produits vendus par les vendeurs</li>
                  <li>Des retards de livraison indépendants de notre volonté</li>
                  <li>Des litiges entre acheteurs et vendeurs</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-start mb-6">
                <div className="bg-purple-600 p-2 rounded-full mr-4">
                  <FileText className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">5. Modifications des Conditions</h2>
              </div>
              <div className="ml-12 space-y-4 text-gray-600">
                <p>
                  Nous nous réservons le droit, à notre seule discrétion, de modifier ou remplacer ces conditions à tout moment. 
                  Nous vous informerons des changements majeurs par email ou via une notification sur notre plateforme.
                </p>
                <p>
                  En continuant à utiliser FlashDrop Market après ces modifications, vous acceptez d'être lié par les conditions révisées.
                </p>
              </div>
            </section>
          </div>

          {/* Acceptance Section */}
          <section className="mt-16 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Vous avez des questions ?</h3>
                <p className="text-gray-600">Contactez notre équipe pour toute clarification nécessaire</p>
              </div>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-bg-purple-900 px-6 py-3">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
     

      <Footer />
    </div>
  );
}