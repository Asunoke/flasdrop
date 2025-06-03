import Head from 'next/head';
import Image from 'next/image';
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>À propos - FlashDrop Market</title>
        <meta name="description" content="Découvrez FlashDrop Market, la plateforme malienne de vente flash créée par Tenoble Software pour faciliter le commerce au Mali" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
             FlashDrop Market est une plateforme de vente en ligne spécialisée dans les ventes flash et les bonnes affaires,
              conçue pour offrir aux consommateurs maliens (et africains) une expérience d'achat simple, rapide et économique.
               <span className="font-semibold text-blue-600">Tenoble Software</span> et détenue par 
               <span className="font-semibold text-blue-600">Tenoble Group Holdings</span>. 
              Notre mission est de connecter les commerçants locaux et les clients grâce à un écosystème digital fluide,
               où les meilleurs produits sont proposés à des prix imbattables, disponibles en livraison rapide ou en retrait.
               <span className="font-semibold text-blue-900">🚀 Pourquoi FlashDrop ?</span>
                 Parce que chaque offre est une opportunité éclair ! Nous sélectionnons pour vous des promotions exclusives
                valables pendant un temps limité, afin de vous permettre de profiter au maximum de votre budget.
                <span className="font-semibold text-blue-900">📦 Livraison fiable, expérience fluide</span>
                  Notre équipe de livreurs dynamiques, identifiables à leur tenue FlashDrop, vous garantit une livraison sécurisée,
                 rapide et avec le sourire. Que vous soyez à Bamako ou en région, nous faisons de votre satisfaction une priorité.
                <span className="font-semibold text-blue-900">🤝 Un engagement local</span>
                  FlashDrop Market soutient les commerçants maliens en leur offrant une vitrine digitale moderne,
                 un système de gestion simple, et une audience en pleine croissance.
            </p>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/pcc.webp"
                alt="Équipe FlashDrop Market"
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Notre Vision</h3>
              <p className="text-gray-600 mb-4">
                Chez FlashDrop Market, nous croyons en un Mali où le commerce numérique est accessible à tous, simple et sécurisé. Nous construisons l'écosystème commercial de demain.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Faciliter les transactions commerciales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Promouvoir les produits maliens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Créer des opportunités économiques</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/vision.png"
                alt="Vision FlashDrop Market"
                width={600}
                height={400}
                layout="responsive"
              />
            </div>
          </div>
        </section>

        <section className="mb-16 bg-blue-50 rounded-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nos Chiffres Clés</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Vendeurs actifs</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">5M+ fcfa</div>
              <div className="text-gray-600">Transactions</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
              <div className="text-gray-600">Support continu</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-gray-600">Villes couvertes</div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">L'Équipe Derrière FlashDrop</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/tenoble softwares.webp"
                  alt="Fondateur"
                  width={128}
                  height={128}
                />
              </div>
              <h4 className="text-xl font-semibold mb-1">Tenoble Software</h4>
              <p className="text-blue-600 mb-3">Créateur de la plateforme</p>
              <p className="text-gray-600">L'innovation technologique au service du commerce malien</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/tgh.png"
                  alt="CEO"
                  width={128}
                  height={128}
                />
              </div>
              <h4 className="text-xl font-semibold mb-1">Tenoble Group Holdings</h4>
              <p className="text-blue-600 mb-3">Groupe détenteur</p>
              <p className="text-gray-600">Investissant dans l'avenir numérique du Mali</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/tghh.webp"
                  alt="Équipe"
                  width={128}
                  height={128}
                />
              </div>
              <h4 className="text-xl font-semibold mb-1">Notre Communauté</h4>
              <p className="text-blue-600 mb-3">Vendeurs & Acheteurs</p>
              <p className="text-gray-600">Le cœur battant de FlashDrop Market</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 text-white rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">Prêt à rejoindre l'aventure ?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Que vous soyez vendeur ou acheteur, FlashDrop Market est la plateforme qu'il vous faut pour le commerce au Mali.
          </p>
          <div className="space-x-4">
            <a 
              href="/register" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              S'inscrire maintenant
            </a>
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-800 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>

     
       <Footer />
    </>
  );
}