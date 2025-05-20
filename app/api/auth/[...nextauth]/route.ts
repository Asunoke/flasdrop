import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

// Assurez-vous que le handler est correctement exporté
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
