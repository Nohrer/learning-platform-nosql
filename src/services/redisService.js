// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En utilisant des clés efficaces et des stratégies de cache appropriées
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des clés uniques et des noms significatifs

// Fonctions utilitaires pour Redis
async function cacheData(client, key, data, ttl) {
  try {
    await client.setEx(key, ttl, JSON.stringify(data));
    console.log('Données mises en cache avec succès.');
  } catch (error) {
    console.error('Erreur lors de la mise en cache des données :', error);
  }
}

async function getData(client, key) {
  try {
    return await client.get(key);
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis Redis :', error);
    return null;
  }
}

async function deleteData(client, key) {
  try {
    await client.del(key);
    console.log(`Clé supprimée : ${key}`);
  } catch (error) {
    console.error('Erreur lors de la suppression de la clé Redis :', error);
  }
}

module.exports = {
  cacheData,
  getData,
  deleteData,
};
