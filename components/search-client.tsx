"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FlashSaleCard from "@/components/flash-sale-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  stock: number
  cashOnDelivery: boolean
  vendorId: string
}

interface SearchClientProps {
  initialQuery?: string
  initialMinPrice?: number
  initialMaxPrice?: number
}

export function SearchClient({ initialQuery = "", initialMinPrice, initialMaxPrice }: SearchClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(initialQuery)
  const [minPrice, setMinPrice] = useState(initialMinPrice?.toString() || "")
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice?.toString() || "")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch products when search params change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        // Build query string
        const params = new URLSearchParams()

        if (initialQuery) {
          params.set("query", initialQuery)
        }

        if (initialMinPrice) {
          params.set("minPrice", initialMinPrice.toString())
        }

        if (initialMaxPrice) {
          params.set("maxPrice", initialMaxPrice.toString())
        }

        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Erreur lors de la recherche de produits")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError("Une erreur est survenue lors de la recherche de produits")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [initialQuery, initialMinPrice, initialMaxPrice])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query string
    const params = new URLSearchParams()

    if (query) {
      params.set("query", query)
    }

    if (minPrice) {
      params.set("minPrice", minPrice)
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice)
    }

    // Navigate with the search params
    router.push(`/flash-sales?${params.toString()}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher par nom..."
            className="pl-8 bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full md:w-48">
            <Input
              type="number"
              placeholder="Prix min (FCFA)"
              className="bg-white"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Input
              type="number"
              placeholder="Prix max (FCFA)"
              className="bg-white"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg">
            Filtrer
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-8">Chargement des produits...</div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : products.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aucun produit trouvé</AlertTitle>
          <AlertDescription>
            Aucun produit ne correspond à vos critères de recherche. Veuillez essayer avec d&apos;autres filtres.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
          ))}
        </div>
      )}
    </div>
  )
}
