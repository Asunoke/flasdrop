import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { ProductSchema } from "@/lib/validations"
import { getCurrentUser } from "@/lib/session"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        vendor: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const product = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!product || (user.role !== "ADMIN" && product.vendorId !== user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()

    const validatedData = ProductSchema.parse({
      ...json,
      vendorId: product.vendorId,
    })

    const updatedProduct = await db.product.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const product = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!product || (user.role !== "ADMIN" && product.vendorId !== user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await db.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
