# FlashDrop API

API backend pour la gestion des produits et commandes de FlashDrop, une plateforme e-commerce multi-vendeur.

---

## Description

Cette API est développée avec Next.js (App Router) et Prisma ORM, connectée à une base PostgreSQL (Neon DB).  
Elle gère la recherche de produits, l’accès aux produits d’un vendeur, ainsi que les commandes.

---

## Fonctionnalités

- Recherche de produits avec filtres (prix, nom)
- Récupération des produits d’un vendeur authentifié
- Gestion des commandes et statuts (PENDING, PROCESSING, COMPLETED, CANCELLED)
- Authentification basée sur session utilisateur (via `getCurrentUser()`)

---

## Stack technique

- **Framework** : Next.js 15+ (App Router)
- **Base de données** : PostgreSQL (Neon DB)
- **ORM** : Prisma
- **Déploiement** : Vercel
- **Langage** : TypeScript

---

## Installation locale

1. Cloner le repo  
   ```bash
   git clone https://github.com/asunoke/flasdrop.git
   cd flasdrop
Installer les dépendances


npm install
Configurer les variables d’environnement (fichier .env)
Exemple :

.env 
   DATABASE_URL="postgresql://user:password@host:port/dbname"
   NEXTAUTH_SECRET="une_phrase_secrete_pour_auth"
Générer le client Prisma

 
 npx prisma generate
 Appliquer les migrations (si besoin)


Modifier
npx prisma migrate dev
Lancer l’application en mode dev


npm run dev
Routes API principales
Route	Méthode	Description	Auth requise?
/api/search	GET	Recherche de produits avec filtres	Non
/api/products/vendor	GET	Liste des produits du vendeur connecté	Oui (Rôle VENDOR)

## Notes importantes
Les routes API utilisent export const dynamic = 'force-dynamic' pour forcer le rendu dynamique côté serveur.

La fonction getCurrentUser() est utilisée pour récupérer l’utilisateur connecté côté serveur.

Assurez-vous que la variable d’environnement DATABASE_URL est bien configurée dans Vercel pour le déploiement.

Déploiement
Ce projet est prévu pour être déployé sur Vercel.
Poussez votre branche principale et Vercel se charge de builder et déployer automatiquement.

Contribuer
Les contributions sont les bienvenues !
Forkez le repo, créez une branche feature, et faites un pull request.

-**Licence**
MIT License © oumar traore / Tenoble Group Holdings

FlashDrop — Votre marketplace préférée au Mali et en Afrique !
