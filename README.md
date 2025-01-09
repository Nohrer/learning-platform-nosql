# Projet de fin de module NoSQL Naoufal Guendouz

### Installer et Lancer le Projet
#### Cloner le dépot
```shell
git clone https://github.com/Nohrer/learning-platform-nosql.git
cd learning-platform-nosql
```

#### Installer les dépendances
```shell
npm install
```

#### Configuration
Configurer les variables d'environnement présent en ".env"
```javascript
MONGODB_URI=mongodb://localhost:27017/learning-platform
MONGODB_DB_NAME=learning-platform
REDIS_URI=redis://localhost:6379
PORT=3000
```

#### Lancer Le projet
```shell
npm start
```

### Structure du projet

- **src/config**: Contient les fichiers de configuration pour MongoDB et Redis.
- **src/controllers** : Contient les contrôleurs pour les différentes entités (cours, étudiants).
- **src/routes**: Contient les définitions des routes pour les différentes entités.
- **src/services**: Contient les services pour interagir avec MongoDB et Redis.
- **src/app.js**: Point d'entrée de l'application.

### Choix techniques
- **Express.js** : Utilisé pour créer le serveur web et gérer les routes.

- **MongoDB** : Base de données NoSQL pour stocker les données des cours et des étudiants.
- **Redis** : Utilisé pour le caching afin d'améliorer la performance.
- **Architecture MVC** : Séparation des responsabilités entre les modèles, les vues et les contrôleurs pour une meilleure organisation du code.

### Réponce aux Questions:

#### Config
**Pourquoi créer un module séparé pour les connexions aux bases de données ?**
pour séparer les responsabilités et faciliter la gestion des connexions et faciliter la maintenance
**Comment gérer proprement la fermeture des connexions ?**
Entourer les connexions par un try/catch et fermer les connexions dans un bloc finally
**Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
les variables d'environnement sont essentielles pour le bon fonctionnement de l'application
**Que se passe-t-il si une variable requise est manquante ?**
L'application ne pourra pas démarrer correctement et affichera une erreur

#### Controllers
**Quelle est la différence entre un contrôleur et une route ?**
Un contrôleur contient la logique métier tandis qu'une route définit les points d'accès à l'API
**Pourquoi séparer la logique métier des routes ?**
Pour faciliter la gestion et la maintenance du code

#### Routes
**Pourquoi séparer les routes dans différents fichiers ?**
Les routes séparées facilitent la gestion et la maintenance du code
**Comment organiser les routes de manière cohérente ?**
En regroupant les routes par fonctionnalité ou par ressource

#### Services
**Pourquoi créer des services séparés ?**
Pour séparer les responsabilités et faciliter la gestion et la maintenance du code
**Comment gérer efficacement le cache avec Redis ?**
En utilisant des clés efficaces et des stratégies de cache appropriées
**Quelles sont les bonnes pratiques pour les clés Redis ?**
Utiliser des clés uniques et des noms significatifs

#### App
**Comment organiser le point d'entrée de l'application ?**
**Quelle est la meilleure façon de gérer le démarrage de l'application ?**

#### .env
**Quelles sont les informations sensibles à ne jamais commiter ?**
les informations personnelles, les clé d'accés (API,Tokens) et les mots de passe
**Pourquoi utiliser des variables d'environnement ?**
Pour déterminer ou il faut stocker les informations sensibles et pour les protéger

