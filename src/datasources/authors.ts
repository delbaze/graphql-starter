import type { AuthorModel } from '../models/author.js';

// Acces aux donnees des auteurs (ici en memoire).
// Pour passer a une vraie base, seule cette classe change : les resolvers restent identiques.
export class AuthorsDataSource {
  private nextId: number;

  constructor(private readonly authors: AuthorModel[]) {
    this.nextId = authors.length + 1;
  }

  findAll(): AuthorModel[] {
    return this.authors;
  }

  findById(id: string): AuthorModel | undefined {
    return this.authors.find((author) => author.id === id);
  }

  create(name: string): AuthorModel {
    const author: AuthorModel = { id: String(this.nextId++), name };
    this.authors.push(author);
    return author;
  }
}
