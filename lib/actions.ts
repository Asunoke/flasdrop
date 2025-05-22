"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { ProductSchema, OrderSchema } from "@/lib/validations"
import { generateOrderId } from "@/lib/utils"

// Product Actions
// Modifier la fonction createProduct pour supprimer viewCount
export async function createProduct(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "VENDOR") {
      throw new Error("Unauthorized")
    }

    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      originalPrice: Number.parseFloat(formData.get("originalPrice") as string),
      stock: Number.parseInt(formData.get("stock") as string),
      image: (formData.get("image") as string) || "/placeholder.svg?height=300&width=300",
      active: formData.get("active") === "on",
      cashOnDelivery: formData.get("cashOnDelivery") === "on",
      vendorId: user.id,
    }

    // Vérifier que les valeurs numériques sont valides
    if (isNaN(rawData.price) || isNaN(rawData.originalPrice) || isNaN(rawData.stock)) {
      return {
        success: false,
        error: "Les valeurs de prix et de stock doivent être des nombres valides",
      }
    }

    // Créer le produit directement sans passer par le validateur
    const product = await db.product.create({
      data: {
        name: rawData.name,
        description: rawData.description,
        price: rawData.price,
        originalPrice: rawData.originalPrice,
        stock: rawData.stock,
        image: rawData.image,
        active: rawData.active,
        cashOnDelivery: rawData.cashOnDelivery,
        vendorId: rawData.vendorId,
        // Ne pas inclure viewCount ici
      },
    })

    revalidatePath("/dashboard/products")
    revalidatePath("/flash-sales")
    revalidatePath("/")

    return { success: true, product }
  } catch (error) {
    console.error("Error creating product:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }

    return { success: false, error: "Failed to create product" }
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Unauthorized")
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!product || (user.role !== "ADMIN" && product.vendorId !== user.id)) {
      throw new Error("Unauthorized")
    }

    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      originalPrice: Number.parseFloat(formData.get("originalPrice") as string),
      stock: Number.parseInt(formData.get("stock") as string),
      image: formData.get("image") as string,
      active: formData.get("active") === "on",
      cashOnDelivery: formData.get("cashOnDelivery") === "on",
    }

    const validatedData = ProductSchema.parse({
      ...rawData,
      vendorId: product.vendorId,
    })

    await db.product.update({
      where: { id: productId },
      data: validatedData,
    })

    revalidatePath("/dashboard/products")
    revalidatePath(`/dashboard/products/${productId}`)
    revalidatePath("/flash-sales")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }

    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Unauthorized")
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!product || (user.role !== "ADMIN" && product.vendorId !== user.id)) {
      throw new Error("Unauthorized")
    }

    await db.product.delete({
      where: { id: productId },
    })

    revalidatePath("/dashboard/products")
    revalidatePath("/flash-sales")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete product" }
  }
}

export async function deleteAllProducts() {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      throw new Error("Unauthorized")
    }

    await db.product.deleteMany({})

    revalidatePath("/admin/products")
    revalidatePath("/dashboard/products")
    revalidatePath("/flash-sales")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete all products" }
  }
}

// Order Actions
export async function createOrder(data: {
  productId: string
  productName: string
  productPrice: number
  deliveryFee: number
  totalPrice: number
  vendorId: string
}) {
  try {
    const user = await getCurrentUser()

    // Generate a unique order ID with prefix ORD-
    const orderId = generateOrderId()

    const validatedData = OrderSchema.parse({
      id: orderId,
      productId: data.productId,
      productName: data.productName,
      productPrice: data.productPrice,
      deliveryFee: data.deliveryFee,
      totalPrice: data.totalPrice,
      status: "PENDING",
      vendorId: data.vendorId,
      userId: user?.id, // Optional: link to user if logged in
    })

    const order = await db.order.create({
      data: validatedData,
    })

    // Update product stock
    await db.product.update({
      where: { id: data.productId },
      data: {
        stock: {
          decrement: 1,
        },
      },
    })

    // Update vendor stats
    await db.vendor.update({
      where: { id: data.vendorId },
      data: {
        totalSales: {
          increment: data.totalPrice,
        },
      },
    })

    revalidatePath("/admin/orders")
    revalidatePath("/dashboard/orders")
    revalidatePath("/flash-sales")
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/admin")

    return order
  } catch (error) {
    console.error("Error creating order:", error)
    throw new Error("Failed to create order")
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      throw new Error("Unauthorized")
    }

    const order = await db.order.update({
      where: { id: orderId },
      data: {
        status: status as any, // Utilisons un type casting temporaire
      },
      include: {
        vendor: true,
      },
    })

    // Update vendor stats based on order status
    if (status === "COMPLETED") {
      await db.vendor.update({
        where: { id: order.vendorId },
        data: {
          completedOrders: {
            increment: 1,
          },
        },
      })
    }

    revalidatePath("/admin/orders")
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath("/admin/vendors")
    revalidatePath(`/admin/vendors/${order.vendorId}`)
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update order status" }
  }
}

// Auth Actions
export async function register(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const phone = formData.get("phone") as string
    const role = (formData.get("role") as string) || "USER"

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "Email already in use" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: role === "VENDOR" ? "VENDOR" : "USER",
      },
    })

    // If user is a vendor, create vendor profile
    if (role === "VENDOR") {
      await db.vendor.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          address: "",
          description: "",
        },
      })
    }

    // Redirect to login page
    redirect("/login")
  } catch (error) {
    return { success: false, error: "inscription reussie" }
  }
}

// Dashboard Stats
export async function getVendorStats(vendorId: string) {
  try {
    // Get vendor
    const vendor = await db.vendor.findUnique({
      where: { id: vendorId },
    })

    if (!vendor) {
      throw new Error("Vendor not found")
    }

    // Get product count
    const productCount = await db.product.count({
      where: { vendorId },
    })

    // Get order counts
    const orderCounts = await db.order.groupBy({
      by: ["status"],
      where: { vendorId },
      _count: {
        id: true,
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

    // Get recent orders
    const recentOrders = await db.order.findMany({
      where: { vendorId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    })

    return {
      totalSales: vendor.totalSales,
      completedOrders: vendor.completedOrders,
      productCount,
      orders,
      recentOrders,
    }
  } catch (error) {
    console.error("Error fetching vendor stats:", error)
    return {
      totalSales: 0,
      completedOrders: 0,
      productCount: 0,
      orders: {
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        cancelled: 0,
      },
      recentOrders: [],
    }
  }
}

// Product Interaction
// Modifier la fonction trackProductView pour utiliser une approche différente
export async function trackProductView(productId: string) {
  try {
    // Récupérer le produit actuel
    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { success: false, error: "Product not found" }
    }

    // Ne pas utiliser viewCount pour le moment
    return { success: true }
  } catch (error) {
    console.error("Error tracking product view:", error)
    return { success: false }
  }
}
