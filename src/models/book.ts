import type { Genre } from '../generated/graphql.js';

// Cote serveur, un livre reference son auteur par authorId.
// C'est le field resolver Book.author qui fait le lien.
export interface BookModel {
  id: string;
  title: string;
  year: number | null;
  genre: Genre;
  authorId: string;
  publisherId?: string;
}
