import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const order = await db.order.findUnique({
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
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if user has permission to view this order
    if (user.role !== "ADMIN" && order.vendorId !== user.id && order.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const { status } = json

    if (!["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const order = await db.order.update({
      where: { id: params.id },
      data: { status },
      include: {
        vendor: true,
      },
    })

    // Update vendor stats based on order status
    if (status === "COMPLETED") {
      await db.vendor.update({
        where: { id: order.vendorId },
        data: {
          totalSales: {
            increment: order.totalPrice,
          },
          completedOrders: {
            increment: 1,
          },
        },
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
