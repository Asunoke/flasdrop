import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

// 💡 Force l'exécution côté serveur (évite l'erreur DYNAMIC_SERVER_USAGE)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 📦 Récupère l'utilisateur courant avec ta fonction perso
    const user = await getCurrentUser()

    // 🔐 Vérifie que c'est bien un vendeur connecté
    if (!user || user.role !== "VENDOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 🛒 Récupère les produits du vendeur
    const products = await db.product.findMany({
      where: {
        vendorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // ✅ Envoie les données
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching vendor products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
