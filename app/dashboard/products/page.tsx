"use client";

import Link from "next/link"
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function BientotDisponible() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Bientôt Disponible
      </h1>
      <p className="text-lg md:text-xl max-w-md mb-6 drop-shadow-md">
        Nous travaillons activement pour vous offrir une expérience exceptionnelle. Revenez bientôt !
      </p>
      <Link  href="/dashboard">
      <Button
      
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
      >
        Aller au Dashboard
      </Button>
      </Link>
    </div>
  );
}
