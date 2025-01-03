// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : les variables d'environnement sont essentielles pour le bon fonctionnement de l'application
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : L'application ne pourra pas démarrer correctement et affichera une erreur

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  const envVariables = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (envVariables.length > 0) {
    throw new Error(
      `Les variables d'environnement suivantes sont manquantes : ${envVariables.join(', ')}`
    );
  }
}

try {
  validateEnv();
} catch (error) {
  console.error(error.message);
  process.exit(1); // Arrêter l'application si des variables manquent
}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};