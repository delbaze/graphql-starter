import type { Resolvers } from '../generated/graphql.js';
import { authorResolvers } from './author.resolvers.js';
import { bookResolvers } from './book.resolvers.js';
import { publicationResolvers } from './publication.resolvers.js';
import { publisherResolvers } from './publisher.resolvers.js';

// Apollo Server accepte un tableau de resolvers et les fusionne.
// Ajouter un domaine = creer son fichier *.resolvers.ts et l'ajouter ici.
export const resolvers: Resolvers[] = [authorResolvers, bookResolvers, publisherResolvers, publicationResolvers];
