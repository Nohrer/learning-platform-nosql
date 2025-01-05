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
        const cachedCourse = await redisService.get(`course:${req.params.id}`);
        if (cachedCourse) {
             return res.json(JSON.parse(cachedCourse)); 
            } 
        const course = await mongoService.findOneById( db.db.collection('courses'), req.params.id );
        if (!course) { 
            return res.status(404).json({ error: 'Cours non trouvé.' }); 
        } 
        await redisService.set(`course:${req.params.id}`, JSON.stringify(course)); 
        res.json(course); 
        } 
    catch (error) {
         res.status(500).json({ error: 'Erreur lors de la récupération du cours.' });
    }     
}
async function getCourseStats(req, res) {
    try {
        // Example: Fetch aggregated course statistics
        const stats = await db.db.collection('courses').aggregate([
        { $group: { _id: null, count: { $sum: 1 } } },
        ]).toArray();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.' });
    }
}

module.exports = {
    createCourse,
    getCourse,
    getCourseStats,
}
