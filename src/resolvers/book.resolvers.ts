import { GraphQLError } from 'graphql';
import type { Resolvers } from '../generated/graphql.js';

export const bookResolvers: Resolvers = {
  Query: {
    books: (_parent, { genre }, { dataSources }) => dataSources.books.findAll(genre),
    book: (_parent, { id }, { dataSources, token }) => dataSources.books.findById(id) ?? null,
  },

  Mutation: {
    addBook: (_parent, { input }, { dataSources }) => {
      if (!dataSources.authors.findById(input.authorId)) {
        throw new GraphQLError(`Auteur ${input.authorId} introuvable`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      return dataSources.books.create({
        title: input.title,
        year: input.year ?? null,
        genre: input.genre,
        authorId: input.authorId,
      });
    },
    deleteBook: (_parent, { id }, { dataSources }) => dataSources.books.delete(id),
  },

  Book: {
    author: (book, _args, { dataSources }) => {
      const author = dataSources.authors.findById(book.authorId);
      if (!author) {
        throw new GraphQLError(`Auteur ${book.authorId} introuvable`);
      }
      return author;
    },
  },
};
