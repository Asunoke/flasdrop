"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ShoppingCart, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createOrder, trackProductView } from "@/lib/actions"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { ProductDetailButton } from "@/components/productdetailbouton"

interface FlashSaleCardProps {
  id: string
  title: string
  price: number
  originalPrice: number
  image: string
  remaining: number
  cashOnDelivery: boolean
  vendorId: string
}

export default function FlashSaleCard({
  id,
  title,
  price,
  originalPrice,
  image,
  remaining,
  cashOnDelivery,
  vendorId,
}: FlashSaleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const discount = calculateDiscount(originalPrice, price)

  // Track product view when component mounts
  useEffect(() => {
    trackProductView(id)
  }, [id])

  // Create order and redirect to WhatsApp
  const handleBuyNow = async () => {
    try {
      setIsLoading(true)
      const phoneNumber = "85239219" // Default contact number
      const deliveryFee = 2500
      const totalPrice = price + deliveryFee

      // Create order in the database
      const order = await createOrder({
        productId: id,
        productName: title,
        productPrice: price,
        deliveryFee: deliveryFee,
        totalPrice: totalPrice,
        vendorId: vendorId,
      })

      // Show success toast
      toast({
        title: "Commande créée",
        description: `Commande ${order.id} créée avec succès. Redirection vers WhatsApp...`,
      })

      // Create WhatsApp message with product details
      const message = encodeURIComponent(
        `Bonjour, je souhaite acheter le produit suivant:\n\n` +
          `*Produit:* ${title}\n` +
          `*Prix:* ${formatPrice(price)}\n` +
          `*Frais de livraison:* ${formatPrice(deliveryFee)}\n` +
          `*Prix total:* ${formatPrice(totalPrice)}\n` +
          `*Numéro de commande:* ${order.id}\n\n` +
          `Merci!`,
      )

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")

      // Refresh the page to update the product count
      router.refresh()
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la commande.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Badge className="absolute top-2 right-2 bg-[#FFCB2D] text-black font-bold">-{discount}%</Badge>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        </div>
        {cashOnDelivery && (
          <Badge className="absolute bottom-2 left-2 bg-white text-black border border-[#FFCB2D]">
            Paiement à la livraison
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 h-14">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="font-bold text-lg">{formatPrice(price)}</span>
            <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
          </div>
          <div className="flex items-center text-orange-600">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{remaining} restants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
          onClick={handleBuyNow}
          disabled={isLoading}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? "Traitement..." : "Acheter Maintenant"}
        </Button>
          <ProductDetailButton productId={id} />
      </CardFooter>
    </Card>
  )
}
