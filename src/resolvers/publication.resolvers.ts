import { GraphQLError } from 'graphql';
import type { Context } from '../context.js';
import type { Resolvers } from '../generated/graphql.js';
import type { PublicationModel } from '../models/publication.js';

// Traduit le discriminant des donnees en nom de type GraphQL
function typeOf(publication: PublicationModel): 'BD' | 'Roman' {
  return publication.kind === 'BD' ? 'BD' : 'Roman';
}

function authorOf(authorId: string, dataSources: Context['dataSources']) {
  const author = dataSources.authors.findById(authorId);
  if (!author) throw new GraphQLError(`Auteur ${authorId} introuvable`);
  return author;
}

export const publicationResolvers: Resolvers = {
  Query: {
    publications: (_parent, _args, { dataSources }) => dataSources.publications.findAll(),
  },

  // Pour chaque objet renvoye, GraphQL demande : "de quel type es-tu ?"
  BDOrRoman: {
    __resolveType: (publication) => typeOf(publication),
  },
  // L'interface est aussi un type abstrait : meme question, meme reponse
  LivreBase: {
    __resolveType: (publication) => typeOf(publication),
  },

  BD: {
    author: (bd, _args, { dataSources }) => authorOf(bd.authorId, dataSources),
  },
  Roman: {
    author: (roman, _args, { dataSources }) => authorOf(roman.authorId, dataSources),
  },
};