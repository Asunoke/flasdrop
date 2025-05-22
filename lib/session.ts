import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getCurrentUser() {
  // S'assurer que getServerSession est bien attendu
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return null
  }

  // Rechercher l'utilisateur dans la base de données
  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    return null
  }

  return user
}
