"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  initialQuery?: string
  initialMinPrice?: number
  initialMaxPrice?: number
}

export function SearchForm({ initialQuery = "", initialMinPrice, initialMaxPrice }: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [minPrice, setMinPrice] = useState<string>(initialMinPrice?.toString() || "")
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice?.toString() || "")

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
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
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
  )
}
