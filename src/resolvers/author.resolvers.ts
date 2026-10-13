import type { Resolvers } from "../generated/graphql.js";

// Signature d'un resolver : (parent, args, context, info)
export const authorResolvers: Resolvers = {
  Query: {
    authors: (_parent, _args, { dataSources }, infos) =>
      dataSources.authors.findAll(),

    author: (_parent, { id }, { dataSources }) =>
      dataSources.authors.findById(id) ?? null,
  },

  Mutation: {
    addAuthor: (_parent, { name }, { dataSources }) =>
      dataSources.authors.create(name),
  },

  // Field resolver : appele pour chaque Author dont le champ "books" est demande.
  // "author" est le parent, c'est-a-dire l'AuthorModel renvoye par la query.
  Author: {
    books: (author, _args, { dataSources }) =>
      dataSources.books.findByAuthor(author.id),
  },
};
