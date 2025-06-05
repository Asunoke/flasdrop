"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { register } from "@/lib/actions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  phone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 caractères",
  }),
  role: z.enum(["USER", "VENDOR"]),
})

interface RegisterFormProps {
  defaultRole?: string
}

export function RegisterForm({ defaultRole }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: (defaultRole === "vendor" ? "VENDOR" : "USER") as "USER" | "VENDOR",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("password", values.password)
      formData.append("phone", values.phone)
      formData.append("role", values.role)

      const result = await register(formData)

      if (!result.success) {
        toast({
          title: "INFO",
          description: result.error || "Une erreur est survenue lors de l'inscription",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      })

      // Redirect based on role
      if (values.role === "VENDOR") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "INFO",
        description: " l'inscription a reussi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+223 70 00 00 00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de compte</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type de compte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">Client</SelectItem>
                 
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-purple-600 text-black hover:bg-purple-700" disabled={isLoading}>
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  )
}
