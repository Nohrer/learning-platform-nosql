const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createStudent(req, res) {
    try {
        const student = req.body;
        const result = await mongoService.insertOne(db.db.collection('students'), student);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'étudiant.' });
    }
}
async function getStudent(req, res) {
    try {
        const studentId = req.params.id;
        const cacheKey = `student:${studentId}`;

        // Check if the student is in Redis cache
        const cachedData = await redisService.getData(redisClient, cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // If not in cache, fetch from MongoDB
        const student = await mongoService.findOneById(db.db.collection('students'), studentId);
        if (!student) {
            return res.status(404).json({ error: 'Étudiant non trouvé.' });
        }

        // Cache the result
        await redisService.cacheData(redisClient, cacheKey, student, 3600); // Cache for 1 hour
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'étudiant.' });
    }
}
async function getStudentStats(req, res) {
    try {
        const cacheKey = 'studentStats';

        // Check if stats are in Redis cache
        const cachedStats = await redisService.getData(redisClient, cacheKey);
        if (cachedStats) {
            return res.json(JSON.parse(cachedStats));
        }

        // Compute stats and cache the result
        const stats = await db.db.collection('students').aggregate([
            { $group: { _id: null, count: { $sum: 1 } } },
        ]).toArray();

        await redisService.cacheData(redisClient, cacheKey, stats, 3600); // Cache for 1 hour
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.' });
    }
}

module.exports = {
    createStudent,
    getStudent,
    getStudentStats,
};
