import type { Request } from "express";
import { AuthorsDataSource } from "./datasources/authors.js";
import { BooksDataSource } from "./datasources/books.js";
import { seedAuthors, seedBooks, seedPublications, seedPublishers } from "./data/seed.js";
import { PublishersDataSource } from "./datasources/publisher.js";
import { PublicationsDataSource } from "./datasources/publications.js";

// Les data sources en memoire sont creees une seule fois (sinon les donnees
// seraient reinitialisees a chaque requete).
const authors = new AuthorsDataSource(structuredClone(seedAuthors));
const books = new BooksDataSource(structuredClone(seedBooks));
const publishers = new PublishersDataSource(structuredClone(seedPublishers));
const publications = new PublicationsDataSource(structuredClone(seedPublications));

// Le contexte est construit a chaque requete et transmis a tous les resolvers
// (3e argument). C'est l'endroit pour l'authentification, les data sources, etc.
export interface Context {
  token: string | null;
  dataSources: {
    authors: AuthorsDataSource;
    books: BooksDataSource;
    publishers: PublishersDataSource;
    publications: PublicationsDataSource;
  };
}

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<Context> {
  console.log("test", req.headers);
  // ici j'aurais pu aller chercher l'utilsiateur si le token était bon
  return {
    token: req.headers.authorization ?? null,
    dataSources: { authors, books, publishers, publications },
  };
}
