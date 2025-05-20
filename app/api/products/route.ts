import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { ProductSchema } from "@/lib/validations"
import { getCurrentUser } from "@/lib/session"

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
    const vendorId = searchParams.get("vendorId")

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

    if (vendorId) {
      where.vendorId = vendorId
    }

    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        vendor: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "VENDOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()

    const validatedData = ProductSchema.parse({
      ...json,
      vendorId: user.id,
    })

    const product = await db.product.create({
      data: validatedData,
    })

    return NextResponse.json(product)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
