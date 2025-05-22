import { db } from "@/lib/db"

interface ProductFilters {
  query?: string
  minPrice?: number
  maxPrice?: number
  vendorId?: string
}

export async function getAllProducts(filters: ProductFilters = {}) {
  try {
    const { query, minPrice, maxPrice, vendorId } = filters

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

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getLatestProducts(limit = 3) {
  try {
    const products = await db.product.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        vendor: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    })

    return products
  } catch (error) {
    console.error("Error fetching latest products:", error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    })

    return product
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

export async function getVendorProducts(vendorId: string) {
  try {
    const products = await db.product.findMany({
      where: {
        vendorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return products
  } catch (error) {
    console.error(`Error fetching products for vendor ${vendorId}:`, error)
    return []
  }
}

export async function deleteAllProducts() {
  try {
    await db.product.deleteMany({})
    return { success: true }
  } catch (error) {
    console.error("Error deleting all products:", error)
    return { success: false, error }
  }
}
