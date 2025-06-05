import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/session-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FlashDrop Market - Ventes Flash au Mali",
    template: "%s | FlashDrop Market",
    
  },
  description:
    "Découvrez des offres exclusives limitées dans le temps. Prix chocs, paiement mobile et livraison rapide partout au Mali.",
  keywords: ["ventes flash", "e-commerce", "Mali", "achats en ligne", "promotions", "réductions"],
  authors: [{ name: "FlashDrop Market" }],
  creator: "FlashDrop Market",
  publisher: "FlashDrop Market",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://flashdrop.ml"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://flashdrop.ml",
    title: "FlashDrop Market - Ventes Flash au Mali",
    description:
      "Découvrez des offres exclusives limitées dans le temps. Prix chocs, paiement mobile et livraison rapide partout au Mali.",
    siteName: "FlashDrop Market",
    images: [
      {
        url: "https://flashdrop.ml/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlashDrop Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlashDrop Market - Ventes Flash au Mali",
    description:
      "Découvrez des offres exclusives limitées dans le temps. Prix chocs, paiement mobile et livraison rapide partout au Mali.",
    images: ["https://flashdrop.ml/og-image.jpg"],
    creator: "@flashdrop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#FF6600",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head />
      
      <body className={inter.className}>
        <link rel="icon" href="/favicon.ico" />
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
