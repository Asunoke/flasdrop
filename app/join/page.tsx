import { Metadata } from "next";
import { Briefcase, Rocket, Users, Globe, Award, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Carrières - FlashDrop Market",
  description: "Rejoignez l'équipe FlashDrop Market et participez à la révolution du e-commerce au Mali.",
};

export default function CareersPage() {
  const jobOpenings = [
    {
      id: 1,
      title: "Développeur Full-Stack",
      department: "Technologie",
      type: "Temps plein",
      location: "Bamako (Hybride)",
    },
    {
      id: 2,
      title: "Responsable Marketing Digital",
      department: "Marketing",
      type: "Temps plein",
      location: "Bamako",
    },
    {
      id: 3,
      title: "Spécialiste Support Client",
      department: "Service Client",
      type: "Temps plein",
      location: "Bamako",
    },
    {
      id: 4,
      title: "Chargé de Partenariats",
      department: "Business Development",
      type: "CDD",
      location: "Bamako",
    },
  ];

  const perks = [
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Travail Flexible",
      description: "Modalités de travail hybrides selon le poste",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Formation Continue",
      description: "Développez vos compétences avec notre programme de formation",
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-purple-600" />,
      title: "Impact Social",
      description: "Contribuez au développement du commerce digital au Mali",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/fdm.webp"
            alt="Équipe FlashDrop Market"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center bg-purple-600 p-3 rounded-full mb-6">
              <Briefcase className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Construisez l'avenir du e-commerce au Mali</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Rejoignez notre équipe passionnée et participez à la révolution des ventes flash en Afrique.
            </p>
            <div className="mt-8">
              <Link href="#open-positions">
                <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg font-medium">
                  Voir nos offres
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600">
              Ce qui nous unit et guide nos actions quotidiennes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Nous repoussons les limites pour créer des solutions adaptées au marché malien.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">
                Nous croyons en la force du collectif et de l'intelligence partagée.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impact</h3>
              <p className="text-gray-600">
                Notre travail doit améliorer concrètement la vie des commerçants et consommateurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-0">
        <div className="container mx-auto px-0">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src="/vision.png"
              alt="Équipe FlashDrop Market"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Nos Avantages</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {perks.map((perk, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    {perk.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{perk.title}</h3>
                  <p className="text-gray-600">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="open-positions" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Postes Ouverts</h2>
              <p className="text-xl text-gray-600">
                Rejoignez notre équipe en pleine croissance
              </p>
            </div>
            
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{job.department}</span>
                        <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{job.type}</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{job.location}</span>
                      </div>
                    </div>
                    <Link href="https://wa.me/22385239219">
                      <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                        Postuler
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Vous ne trouvez pas votre poste idéal mais souhaitez nous rejoindre ?
              </p>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                  Contactez-nous spontanément
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Culture d'Entreprise</h2>
            <p className="text-xl text-gray-600 mb-8">
              Chez FlashDrop Market, nous cultivons un environnement où chacun peut s'épanouir
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Apprentissage Continu</h3>
                <p className="text-gray-600">
                  Nous investissons dans la formation de nos équipes et encourageons la montée en compétences à travers des ateliers, conférences et programmes de mentorat.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Équilibre Vie Pro-Vie Perso</h3>
                <p className="text-gray-600">
                  Des horaires flexibles, du télétravail occasionnel et des politiques adaptées pour que vous puissiez donner le meilleur de vous-même au travail comme à la maison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à nous rejoindre ?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Faites partie de l'aventure FlashDrop Market et contribuez à transformer le commerce au Mali.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                  Voir les offres
                </Button>
              </Link>
             
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
   <Footer />
    </div>
  );
}