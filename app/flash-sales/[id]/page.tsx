import { notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Clock, Star, ChevronLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { db } from "@/lib/db"; // Import Prisma client

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  remaining: number;
  cashOnDelivery: boolean;
  vendorId: string;
  description: string;
}

// Function to fetch a product from the database
async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await db.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return null;
    }

    // Transform the Prisma product to match your Product interface
    const transformedProduct: Product = {
      id: product.id,
      title: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image ?? "/placeholder.svg",
      remaining: product.stock,
      cashOnDelivery: product.cashOnDelivery,
      vendorId: product.vendorId,
      description: product.description,
    };

    return transformedProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Function to fetch similar products from the database
async function getSimilarProducts(vendorId: string, productId: string): Promise<Product[]> {
  try {
    const similarProducts = await db.product.findMany({
      where: {
        vendorId: vendorId,
        id: { not: productId },
      },
      take: 4,
    });

    // Transform the Prisma products to match your Product interface
    const transformedProducts: Product[] = similarProducts.map((product) => ({
      id: product.id,
      title: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image ?? "/placeholder.svg",
      remaining: product.stock,
      cashOnDelivery: product.cashOnDelivery,
      vendorId: product.vendorId,
      description: product.description,
    }));

    return transformedProducts;
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const discount = calculateDiscount(product.originalPrice, product.price);
  const fakeRating = 4.5; // Fake rating

  const similarProducts = await getSimilarProducts(product.vendorId, product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <Link href="/flash-sales" className="flex items-center text-sm mb-4 text-blue-600 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
          <Badge className="absolute top-2 right-2 bg-[#FFCB2D] text-black font-bold">
            -{discount}%
          </Badge>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < fakeRating ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({fakeRating.toFixed(1)})</span>
            </div>
            <div className="flex items-center text-orange-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{product.remaining} restants</span>
            </div>
          </div>

          <div className="mb-6">
            <span className="font-bold text-2xl">{formatPrice(product.price)}</span>
            <span className="ml-2 text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          {product.cashOnDelivery && (
            <Badge className="mb-6 bg-white text-black border border-[#FFCB2D]">
              Paiement à la livraison
            </Badge>
          )}

          <p className="mb-6 text-gray-700">{product.description}</p>
         <Link href="/flash-sales">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
            // onClick={handleBuyNow} // To be implemented
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            voirs 
          </Button>
          </Link>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <section className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Ne manquez pas cette offre incroyable!</h2>
          <p className="text-gray-700 mb-4">
            Profitez de notre offre exclusive et achetez maintenant pour bénéficier d'une réduction de {discount}%!
          </p>
          <Link href="/flash-sales">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full">
            <CheckCircle className="h-4 w-4 mr-2" />
            Acheter Maintenant
          </Button>
          </Link>
        </div>
        <div className="relative w-32 h-32 ml-4">
          <Image
            src="/cta-image.webp" // Replace with your CTA image
            alt="Offre spéciale"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Similar Products Section */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">Produits similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarProducts.map((similarProduct) => (
            <Link
              href={`/flash-sales/${similarProduct.id}`}
              key={similarProduct.id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={similarProduct.image || "/placeholder.svg"}
                  alt={similarProduct.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{similarProduct.title}</h3>
                <p className="text-gray-700">{formatPrice(similarProduct.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
