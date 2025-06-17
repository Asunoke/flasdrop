"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AuthButtons() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  // Si l'utilisateur est connecté
  if (session?.user) {
    const dashboardLink =
      session.user.role === "VENDOR" || session.user.role === "ADMIN"
        ? session.user.role === "ADMIN"
          ? "/admin"
          : "/dashboard"
        : "/profile"

    return (
      <div className="flex items-center gap-2">
        {/* Version desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={dashboardLink}>
            <Button variant="ghost" className="text-black hover:bg-white/10">
              Tableau de bord
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-black hover:bg-white/10"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {/* Version mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black hover:bg-white/10">
                <User className="h-6 w-6 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={dashboardLink}>Tableau de bord</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas connecté
  return (
    <div className="flex items-center gap-2">
      {/* Version desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" className="text-lg  transition-colors hover:text-primary">
            Se connecter
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg">S'inscrire</Button>
        </Link>
      </div>

      {/* Version mobile */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5 text-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/login">Se connecter</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">S'inscrire</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
