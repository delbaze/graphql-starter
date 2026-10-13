import type { CodegenConfig } from '@graphql-codegen/cli';

// Genere les types TypeScript a partir des fichiers .graphql.
// Les "mappers" indiquent a codegen que, cote serveur, un Book est un BookModel
// (avec authorId) et non le type GraphQL complet (avec author).
const config: CodegenConfig = {
  schema: 'src/schema/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        useTypeImports: true,
        enumsAsTypes: true,
        contextType: '../context.js#Context',
        mappers: {
          Author: '../models/author.js#AuthorModel',
          Book: '../models/book.js#BookModel',
          Publisher: '../models/publisher.js#PublisherModel',
          BD: '../models/publication.js#BDModel',
          Roman: '../models/publication.js#RomanModel',
        },
      },
    },
  },
};

export default config;
