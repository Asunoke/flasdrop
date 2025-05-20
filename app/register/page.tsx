import Link from "next/link"
import type { Metadata } from "next"

import { RegisterForm } from "@/components/register-form"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Inscription | FlashDrop Market",
  description: "Créez un compte sur FlashDrop Market pour accéder à des offres exclusives et des ventes flash.",
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await searchParams
  const role = typeof params.role === "string" ? params.role : undefined

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F3F4F6]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Créer un compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
            <RegisterForm defaultRole={role} />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Déjà membre?{" "}
            <Link href="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
