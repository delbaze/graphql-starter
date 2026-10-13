import { config } from './config.js';
import { startServer } from './server.js';

const { url } = await startServer(config.port);
console.log(`Serveur GraphQL pret sur ${url}`);
