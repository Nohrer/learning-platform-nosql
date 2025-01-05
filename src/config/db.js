// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : pour séparer les responsabilités et faciliter la gestion des connexions et faciliter la maintenance
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Entourer les connexions par un try/catch et fermer les connexions dans un bloc finally

require('dotenv').config();
const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'learning-platform';

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(mongoURI);  // Removed deprecated options
    await mongoClient.connect();
    console.log('MongoDB connected successfully');
    db = mongoClient.db(dbName);  // Make sure to set the db variable here
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB:', error);
    process.exit(1);
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
    process.exit(1);  // Exit process if Redis connection fails
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
  db,
};
