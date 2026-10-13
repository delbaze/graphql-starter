import type { Genre } from "../generated/graphql.js";
import type { BookModel } from "../models/book.js";

export class BooksDataSource {
  private nextId: number;

  constructor(private readonly books: BookModel[]) {
    this.nextId = books.length + 1;
  }

  findAll(genre?: Genre | null): BookModel[] {
    return genre
      ? this.books.filter((book) => book.genre === genre)
      : this.books;
  }

  findById(id: string): BookModel | undefined {
    return this.books.find((book) => book.id === id);
  }

  findByAuthor(authorId: string): BookModel[] {
    return this.books.filter((book) => book.authorId === authorId);
  }

  create(data: Omit<BookModel, "id">): BookModel {
    const book: BookModel = { id: String(this.nextId++), ...data };
    this.books.push(book);
    return book;
  }

  delete(id: string): boolean {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
  findByPublisher(publisherId: string): BookModel[] {
    return this.books.filter((book) => book.publisherId === publisherId);
  }
}
