import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("fr-FR", options)
}

export function generateOrderId() {
  return `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`
}

export function calculateDiscount(originalPrice: number, price: number) {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
