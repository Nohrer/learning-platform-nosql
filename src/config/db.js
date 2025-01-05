// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : pour séparer les responsabilités et faciliter la gestion des connexions et faciliter la maintenance
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Entourer les connexions par un try/catch et fermer les connexions dans un bloc finally

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {

  try {
    mongoClient = new MongoClient(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.DB_NAME);
    console.log('Connexion MongoDB réussie.');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
}
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.REDIS_URI });
    redisClient.on('error', (err) => console.error('Erreur Redis :', err));
    await redisClient.connect();
    console.log('Connexion Redis réussie.');
  } catch (error) {
    console.error('Erreur lors de la connexion à Redis :', error);
}
}


async function closeConnections() {
  try {
    if (mongoClient) await mongoClient.close();
    if (redisClient) await redisClient.quit();
    console.log('Connexions fermées proprement.');
  } catch (error) {
    console.error('Erreur lors de la fermeture des connexions :', error);
  }
}

module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  mongoClient,
  redisClient,
  db,
};
