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

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const cacheKey = `course:${courseId}`;

    // Check if the course is in Redis cache
    const cachedData = await redisService.getData(redisClient, cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from MongoDB
    const course = await mongoService.findOneById(db.db.collection('courses'), courseId);
    if (!course) {
      return res.status(404).json({ error: 'Cours non trouvé.' });
    }

    // Cache the result
    await redisService.cacheData(redisClient, cacheKey, course, 3600); // Cache for 1 hour
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du cours.' });
  }
}


async function getCourseStats(req, res) {
  try {
    const cacheKey = 'courseStats';

    // Check if stats are in Redis cache
    const cachedStats = await redisService.getData(redisClient, cacheKey);
    if (cachedStats) {
      return res.json(JSON.parse(cachedStats));
    }

    // Compute stats and cache the result
    const stats = await db.db.collection('courses').aggregate([
      { $group: { _id: null, count: { $sum: 1 } } },
    ]).toArray();

    await redisService.cacheData(redisClient, cacheKey, stats, 3600); // Cache for 1 hour
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.' });
  }
}


// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
  // TODO: Exporter les fonctions du contrôleur
};