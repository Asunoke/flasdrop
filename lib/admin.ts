import { db } from "@/lib/db"

export async function getStats() {
  try {
    // Get total sales
    const salesResult = await db.order.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: "COMPLETED",
      },
    })
    const totalSales = salesResult._sum.totalPrice || 0

    // Get order counts
    const orderCounts = await db.order.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    })

    // Get vendor count
    const vendorCount = await db.vendor.count()

    // Get product count
    const productCount = await db.product.count({
      where: {
        active: true,
      },
    })

    // Format the order counts
    const orders = {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      cancelled: 0,
    }

    orderCounts.forEach((item) => {
      const status = item.status.toLowerCase() as keyof typeof orders
      orders[status] = item._count.id
      orders.total += item._count.id
    })

    return {
      totalSales,
      orders,
      vendorCount,
      productCount,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalSales: 0,
      orders: {
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        cancelled: 0,
      },
      vendorCount: 0,
      productCount: 0,
    }
  }
}
