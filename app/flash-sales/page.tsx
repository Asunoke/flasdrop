import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

import { SearchClient } from "@/components/search-client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Ventes Flash | FlashDrop Market",
  description:
    "Découvrez toutes nos ventes flash avec des réductions importantes. Profitez de prix imbattables sur une large gamme de produits.",
  keywords: "ventes flash, promotions, réductions, Mali, e-commerce, achats en ligne",
  openGraph: {
    title: "Ventes Flash | FlashDrop Market",
    description: "Découvrez toutes nos ventes flash avec des réductions importantes",
    type: "website",
    url: "https://flashdrop.ml/flash-sales",
    images: [
      {
        url: "https://flashdrop.ml/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlashDrop Market - Ventes Flash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ventes Flash | FlashDrop Market",
    description: "Découvrez toutes nos ventes flash avec des réductions importantes",
    images: ["https://flashdrop.ml/og-image.jpg"],
  },
}

export default async function FlashSalesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await searchParams
  const query = typeof params.query === "string" ? params.query : undefined
  const minPrice = typeof params.minPrice === "string" ? params.minPrice : undefined
  const maxPrice = typeof params.maxPrice === "string" ? params.maxPrice : undefined

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Flash Sales Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start mb-8">
              <Link href="/" className="flex items-center text-purple-600 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Toutes les Ventes Flash</h1>
              <p className="mt-2 text-gray-500">
                Découvrez toutes nos offres exclusives à durée limitée avec des réductions importantes
              </p>
            </div>

            {/* Client-side search and products display */}
            <SearchClient
              initialQuery={query}
              initialMinPrice={minPrice ? Number.parseInt(minPrice) : undefined}
              initialMaxPrice={maxPrice ? Number.parseInt(maxPrice) : undefined}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer  />
    </div>
  )
}
