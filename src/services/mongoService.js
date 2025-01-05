// Question: Pourquoi créer des services séparés ?
// Réponse:  Pour séparer les responsabilités et faciliter la gestion et la maintenance du code

const { ObjectId } = require('mongodb');
const config = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  return await collection.findOne({ _id: ObjectId(id) });
  
}
async function insertOne(collection, data) {
  return await collection.insertOne(data);
}
async function updateOne(collection, id, data) {
  return await collection.updateOne({ _id: ObjectId(id) }, { $set: data });
}

as
// Export des services
module.exports = {
  findOneById,
  insertOne,
  updateOne,
  // TODO: Exporter les fonctions utilitaires
};