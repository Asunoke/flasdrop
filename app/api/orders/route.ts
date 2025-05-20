import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { OrderSchema } from "@/lib/validations"
import { getCurrentUser } from "@/lib/session"

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const vendorId = searchParams.get("vendorId")

    // Build the where clause based on filters and user role
    const where: any = {}

    if (status) {
      where.status = status
    }

    // Filter orders based on user role
    if (user.role === "VENDOR") {
      where.vendorId = user.id
    } else if (user.role === "USER") {
      where.userId = user.id
    } else if (user.role === "ADMIN") {
      // Admin can see all orders
      if (vendorId) {
        where.vendorId = vendorId
      }
    }

    const orders = await db.order.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    })

    // Format orders for the frontend
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      customer: {
        name: order.user?.name || "Client anonyme",
        phone: order.user?.phone || "N/A",
      },
      productName: order.productName,
      date: order.createdAt.toISOString(),
      amount: order.totalPrice,
      status: order.status,
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    const json = await req.json()

    // Generate a unique order ID with prefix ORD-
    const orderId = `ORD-${Math.floor(Math.random() * 10000)}`

    const validatedData = OrderSchema.parse({
      ...json,
      id: orderId,
      userId: user?.id, // Optional: link to user if logged in
    })

    const order = await db.order.create({
      data: validatedData,
    })

    // Update product stock
    await db.product.update({
      where: { id: json.productId },
      data: {
        stock: {
          decrement: 1,
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
