// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur contient la logique métier tandis qu'une route définit les points d'accès à l'API
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour faciliter la gestion et la maintenance du code

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  
  try {
    const course = req.body;
    const result = await mongoService.insertOne(db.db.collection('courses'), course);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du cours.' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  // TODO: Exporter les fonctions du contrôleur
};