import Link from "next/link"
import { Bell, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardHeader() {
  return (
    <header className="hidden w-64 flex-col bg-gray-900 text-white md:flex">
      <Button variant="ghost" size="icon" className="mr-2 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <Link href="/" className="mr-6 flex items-center">
        <span className="text-lg font-bold">FlashDrop</span>
      </Link>

      <div className="relative hidden md:flex md:grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="search"
          placeholder="Rechercher..."
          className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuItem>Aide</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
