// Question: Pourquoi créer des services séparés ?
// Réponse:  Pour séparer les responsabilités et faciliter la gestion et la maintenance du code

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  return await collection.findOne({ _id: ObjectId(id) });
  
}

// Export des services
module.exports = {
  findOneById,
  // TODO: Exporter les fonctions utilitaires
};