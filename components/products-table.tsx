"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions"

// Product type
interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  stock: number
  image?: string
  active: boolean
  cashOnDelivery: boolean
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    stock: "",
    image: "",
    active: true,
    cashOnDelivery: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/vendor")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  // Format price in FCFA
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  // Toggle product active status
  const toggleProductStatus = async (id: string, active: boolean) => {
    const product = products.find((p) => p.id === id)
    if (!product) return

    try {
      const formData = new FormData()
      formData.append("name", product.name)
      formData.append("description", product.description)
      formData.append("price", product.price.toString())
      formData.append("originalPrice", product.originalPrice.toString())
      formData.append("stock", product.stock.toString())
      formData.append("image", product.image || "")
      formData.append("active", active ? "on" : "")
      formData.append("cashOnDelivery", product.cashOnDelivery ? "on" : "")

      const result = await updateProduct(id, formData)

      if (result.success) {
        setProducts(products.map((p) => (p.id === id ? { ...p, active } : p)))
        toast({
          title: "Succès",
          description: `Le produit a été ${active ? "activé" : "désactivé"}`,
        })
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut du produit",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating product status:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut du produit",
        variant: "destructive",
      })
    }
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle checkbox change
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      stock: "",
      image: "",
      active: true,
      cashOnDelivery: false,
    })
  }

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      stock: product.stock.toString(),
      image: product.image || "",
      active: product.active,
      cashOnDelivery: product.cashOnDelivery,
    })
    setIsEditing(true)
  }

  // Open delete dialog
  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleting(true)
  }

  // Handle create product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("description", formData.description)
      formDataObj.append("price", formData.price)
      formDataObj.append("originalPrice", formData.originalPrice)
      formDataObj.append("stock", formData.stock)
      formDataObj.append("image", formData.image)
      formDataObj.append("active", formData.active ? "on" : "")
      formDataObj.append("cashOnDelivery", formData.cashOnDelivery ? "on" : "")

      const result = await createProduct(formDataObj)

      if (result.success) {
        toast({
          title: "Succès",
          description: "Le produit a été créé avec succès",
        })
        resetForm()
        router.refresh()
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de créer le produit",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer le produit",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }
  const [isUpdating, setIsUpdating] = useState(false)
const [isDeletingLoading, setIsDeletingLoading] = useState(false)

  // Handle update product
  // Handle update product - Version améliorée
const handleUpdateProduct = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!currentProduct) return
  setIsUpdating(true)

  try {
    const formDataObj = new FormData()
    formDataObj.append("name", formData.name)
    formDataObj.append("description", formData.description)
    formDataObj.append("price", formData.price)
    formDataObj.append("originalPrice", formData.originalPrice)
    formDataObj.append("stock", formData.stock)
    formDataObj.append("image", formData.image)
    formDataObj.append("active", formData.active ? "on" : "")
    formDataObj.append("cashOnDelivery", formData.cashOnDelivery ? "on" : "")

    const result = await updateProduct(currentProduct.id, formDataObj)

    if (!result.success) {
      throw new Error(result.error || "Échec de la mise à jour")
    }

    toast({
      title: "Succès",
      description: "Produit mis à jour avec succès",
    })
    
    // Actualiser les données
    router.refresh()
    setIsEditing(false)
  } catch (error) {
  let errorMessage = "Erreur lors de la mise a jour"
  
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  toast({
    title: "Erreur",
    description: errorMessage,
    variant: "destructive",
  })

  } finally {
    setIsUpdating(false)
  }
}

// Handle delete product - Version améliorée
const handleDeleteProduct = async () => {
  if (!currentProduct) return
  setIsDeletingLoading(true)

  try {
    const result = await deleteProduct(currentProduct.id)

    if (!result.success) {
      throw new Error(result.error || "Échec de la suppression")
    }

    toast({
      title: "Succès",
      description: "Produit supprimé avec succès",
    })
    
    // Actualiser les données
    setProducts(products.filter(p => p.id !== currentProduct.id))
    setIsDeleting(false)
  } catch (error) {
  let errorMessage = "Erreur lors de la suppression"
  
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  toast({
    title: "Erreur",
    description: errorMessage,
    variant: "destructive",
  })
}finally {
    setIsDeletingLoading(false)
  }
}

  if (isLoading) {
    return <div className="text-center py-8">Chargement des produits...</div>
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#FFCB2D] text-black hover:bg-[#e6b728]">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous pour créer un nouveau produit.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateProduct}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Prix (FCFA)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="originalPrice" className="text-right">
                    Prix original (FCFA)
                  </Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="/placeholder.svg?height=300&width=300"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Actif</Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => handleCheckboxChange("active", checked as boolean)}
                    />
                    <label
                      htmlFor="active"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Produit actif
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Paiement à la livraison</Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox
                      id="cashOnDelivery"
                      checked={formData.cashOnDelivery}
                      onCheckedChange={(checked) => handleCheckboxChange("cashOnDelivery", checked as boolean)}
                    />
                    <label
                      htmlFor="cashOnDelivery"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accepter le paiement à la livraison
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Création en cours..." : "Créer le produit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-medium">Aucun produit trouvé</p>
              <p className="text-sm text-gray-500 mt-1">
                Vous n'avez pas encore ajouté de produits. Cliquez sur "Ajouter un Produit" pour commencer.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                  <th className="px-4 py-3">Produit</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Paiement à la livraison</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500">ID: {product.id}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{formatPrice(product.price)}</div>
                      <div className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{product.stock}</div>
                    </td>
                    <td className="px-4 py-3">
                      {product.cashOnDelivery ? (
                        <Badge className="bg-green-100 text-green-800">Oui</Badge>
                      ) : (
                        <Badge variant="outline">Non</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={product.active}
                          onCheckedChange={(checked) => toggleProductStatus(product.id, checked)}
                        />
                        <span className="text-sm">{product.active ? "Actif" : "Inactif"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(product)}>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(product)}>
                            <Trash className="mr-2 h-4 w-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
            <DialogDescription>Modifiez les informations du produit ci-dessous.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Prix (FCFA)
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-originalPrice" className="text-right">
                  Prix original (FCFA)
                </Label>
                <Input
                  id="edit-originalPrice"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="/placeholder.svg?height=300&width=300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Actif</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="edit-active"
                    checked={formData.active}
                    onCheckedChange={(checked) => handleCheckboxChange("active", checked as boolean)}
                  />
                  <label
                    htmlFor="edit-active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Produit actif
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Paiement à la livraison</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="edit-cashOnDelivery"
                    checked={formData.cashOnDelivery}
                    onCheckedChange={(checked) => handleCheckboxChange("cashOnDelivery", checked as boolean)}
                  />
                  <label
                    htmlFor="edit-cashOnDelivery"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accepter le paiement à la livraison
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isUpdating}>
  {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
             </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct} disabled={isDeletingLoading}>
  {isDeletingLoading ? "Suppression en cours..." : "Supprimer"}
           </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
