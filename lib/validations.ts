import { z } from "zod"

export const ProductSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom du produit doit contenir au moins 3 caractères",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  price: z.number().positive({
    message: "Le prix doit être un nombre positif",
  }),
  originalPrice: z.number().positive({
    message: "Le prix original doit être un nombre positif",
  }),
  stock: z.number().int().nonnegative({
    message: "Le stock doit être un nombre entier positif ou zéro",
  }),
  image: z.string().optional(),
  active: z.boolean(),
  cashOnDelivery: z.boolean(),
  vendorId: z.string(),
  viewCount: z.number().optional(),
})

export const OrderSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  productPrice: z.number().positive(),
  deliveryFee: z.number().nonnegative(),
  totalPrice: z.number().positive(),
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
  vendorId: z.string(),
  userId: z.string().optional(),
})

export const UserSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  phone: z.string().optional(),
  role: z.enum(["USER", "VENDOR", "ADMIN"]),
})

export const VendorSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  phone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 caractères",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  description: z.string().optional(),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(1, {
    message: "Veuillez entrer votre mot de passe",
  }),
})
