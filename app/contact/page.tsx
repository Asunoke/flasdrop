import Head from 'next/head';
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contactez-nous - FlashDropMarket</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12 text-center">
        <section className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contactez-nous</h2>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <p className="mb-6 text-gray-600">
              Cliquez sur le bouton ci-dessous pour nous envoyer un email directement depuis votre client de messagerie.
            </p>
            
            <a 
              href="mailto:flashdropmarket@gmail.com?subject=Contact%20depuis%20le%20site" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
            
            <p className="mt-6 text-gray-500">
              Ou copiez notre adresse : flashdropmarket@gmail.com
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
            <Footer />
    </>
  );
}