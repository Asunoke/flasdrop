// app/api/products/vendor/route.ts
export const dynamic = "force-dynamic";


import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "VENDOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const products = await db.product.findMany({
      where: {
        vendorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching vendor products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
