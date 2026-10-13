import { GraphQLError } from 'graphql';
import type { Resolvers } from '../generated/graphql.js';
import type { PublisherModel } from '../models/publisher.js';

function emptyNameError() {
  return new GraphQLError("Le nom de l'editeur ne peut pas etre vide", {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

export const publisherResolvers: Resolvers = {
  Query: {
    publishers: (_parent, _args, { dataSources }) => dataSources.publishers.findAll(),
    publisher: (_parent, { id }, { dataSources }) => dataSources.publishers.findById(id) ?? null,
  },

  Mutation: {
    addPublisher: (_parent, { input }, { dataSources }) => {
      const name = input.name.trim();
      if (name === '') throw emptyNameError();
      return dataSources.publishers.create({
        name,
        country: input.country ?? null,
        foundedYear: input.foundedYear ?? null,
      });
    },

    updatePublisher: (_parent, { id, input }, { dataSources }) => {
      // Champ absent : inchange. Champ a null : efface (sauf name).
      const changes: Partial<Omit<PublisherModel, 'id'>> = {};
      if (input.name != null) {
        if (input.name.trim() === '') throw emptyNameError();
        changes.name = input.name.trim();
      }
      if (input.country !== undefined) changes.country = input.country;
      if (input.foundedYear !== undefined) changes.foundedYear = input.foundedYear;
      return dataSources.publishers.update(id, changes) ?? null;
    },

    deletePublisher: (_parent, { id }, { dataSources }) => {
      const bookCount = dataSources.books.findByPublisher(id).length;
      if (bookCount > 0) {
        throw new GraphQLError(`Impossible de supprimer : ${bookCount} livre(s) chez cet editeur`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      return dataSources.publishers.delete(id);
    },
  },

  Publisher: {
    books: (publisher, _args, { dataSources }) => dataSources.books.findByPublisher(publisher.id),
  },

  Book: {
    publisher: (book, _args, { dataSources }) =>
      book.publisherId ? (dataSources.publishers.findById(book.publisherId) ?? null) : null,
  },
};