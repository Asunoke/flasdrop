"use client"

import Link from "next/link"

import { Suspense } from "react"


import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F3F4F6]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
            <Suspense fallback={<div>Chargement...</div>}>
     <LoginForm />
    </Suspense>
            
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Pas encore membre?{" "}
            <Link href="/register" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
