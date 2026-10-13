# GraphQL Starter : Express + Apollo Server + TypeScript

Projet de depart pour une API GraphQL organisee par domaine : le schema, les
resolvers et l'acces aux donnees sont separes, et les types TypeScript des
resolvers sont generes automatiquement a partir du schema.

## Prerequis

- Node.js 20 ou plus (`node -v` pour verifier)
- Un acces internet au premier lancement de la Sandbox (elle est chargee depuis le CDN d'Apollo)

## Demarrage

1. Installer les dependances :

   ```bash
   npm install
   ```

2. Lancer le serveur en mode developpement :

   ```bash
   npm run dev
   ```

   La console doit afficher : `Serveur GraphQL pret sur http://localhost:4000/graphql`

3. Ouvrir http://localhost:4000/graphql dans le navigateur. Apollo Sandbox s'affiche.

4. Copier une requete du fichier `requests/exemples.graphql` dans l'editeur de
   gauche, puis cliquer sur le bouton d'execution. Le resultat apparait a droite.

5. Verifier aussi la route REST : http://localhost:4000/health doit renvoyer `{"status":"ok"}`.

## Scripts

| Script              | Role                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `npm run dev`       | Genere les types puis lance le serveur avec rechargement auto     |
| `npm start`         | Genere les types puis lance le serveur sans rechargement          |
| `npm run codegen`   | Regenere `src/generated/graphql.ts` a partir des fichiers .graphql |
| `npm run typecheck` | Verifie les types TypeScript de tout le projet                    |

Apres une modification d'un fichier `.graphql`, le serveur redemarre tout seul,
mais les types TypeScript ne sont regeneres qu'avec `npm run codegen`.

## Structure

```
src/
  index.ts                  point d'entree : demarre le serveur
  server.ts                 Express + Apollo Server (middleware /graphql, route /health)
  config.ts                 configuration (port)
  context.ts                contexte partage par tous les resolvers (data sources, token)
  schema/                   le contrat de l'API, en SDL
    base.graphql            types racines Query et Mutation (vides)
    author.graphql          domaine Author (etend Query et Mutation)
    book.graphql            domaine Book (enum, input, etend Query et Mutation)
    index.ts                charge automatiquement tous les .graphql du dossier
  resolvers/                l'implementation du contrat
    author.resolvers.ts
    book.resolvers.ts
    index.ts                liste des resolvers fusionnes par Apollo
  models/                   forme des donnees cote serveur (BookModel a un authorId)
  datasources/              acces aux donnees (en memoire ici)
  data/seed.ts              donnees initiales
  generated/graphql.ts      genere par codegen, ne pas modifier a la main
requests/exemples.graphql   requetes a tester dans la Sandbox
codegen.ts                  configuration de GraphQL Code Generator
```

Le chemin d'une requete : `schema` (ce qu'on peut demander) puis `resolvers`
(comment on y repond) puis `datasources` (ou sont les donnees). Le `context`
fait le lien en donnant aux resolvers l'acces aux data sources.

## Ajouter un domaine

Exemple avec un domaine `Review` :

1. Creer `src/schema/review.graphql` avec le type et un `extend type Query { ... }`
2. Lancer `npm run codegen` : le type `Review` est maintenant disponible en TypeScript
3. Creer `src/models/review.ts` et `src/datasources/reviews.ts`
4. Ajouter la data source dans `src/context.ts` (interface `Context` et `createContext`)
5. Creer `src/resolvers/review.resolvers.ts` et l'ajouter au tableau de `src/resolvers/index.ts`
6. Si le modele differe du type GraphQL, ajouter un mapper dans `codegen.ts` puis relancer `npm run codegen`
