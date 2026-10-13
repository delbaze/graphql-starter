import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolvers/index.js';
import { createContext, type Context } from './context.js';

export async function startServer(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    // Arret propre : on laisse les requetes en cours se terminer.
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Une route REST classique cohabite sans probleme avec GraphQL.
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, { context: createContext }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  return { url: `http://localhost:${port}/graphql` };
}
