import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Charge tous les fichiers .graphql de ce dossier.
// Ajouter un domaine = ajouter un fichier .graphql, rien a modifier ici.
const schemaDir = dirname(fileURLToPath(import.meta.url));

export const typeDefs: string[] = readdirSync(schemaDir)
  .filter((file) => file.endsWith('.graphql'))
  .sort()
  .map((file) => readFileSync(join(schemaDir, file), 'utf8'));
