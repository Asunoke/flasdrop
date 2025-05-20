import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const query = searchParams.get("query")
    const minPrice = searchParams.get("minPrice")
      ? Number.parseFloat(searchParams.get("minPrice") as string)
      : undefined
    const maxPrice = searchParams.get("maxPrice")
      ? Number.parseFloat(searchParams.get("maxPrice") as string)
      : undefined

    // Build the where clause based on filters
    const where: any = {
      active: true,
    }

    if (query) {
      where.name = {
        contains: query,
        mode: "insensitive",
      }
    }

    if (minPrice !== undefined) {
      where.price = {
        ...where.price,
        gte: minPrice,
      }
    }

    if (maxPrice !== undefined) {
      where.price = {
        ...where.price,
        lte: maxPrice,
      }
    }

    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        price: true,
        originalPrice: true,
        image: true,
        stock: true,
        cashOnDelivery: true,
        vendor: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
