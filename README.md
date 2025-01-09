# Projet de fin de module NoSQL Naoufal Guendouz

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.

Commençons par l'organisation pratique :

1. Création de votre dépôt :
   - Sur Github.com
   - Créez un nouveau dépôt public
   - Nommez-le "learning-platform-nosql"
   - Ne l'initialisez pas avec un README pour le moment

2. Configuration de votre environnement local :
   ```bash
   # Clonez mon dépôt template (ce dépôt)
   git clone https://github.com/pr-daaif/learning-platform-template
   
   # Renommez le dépôt origin
   cd learning-platform-template
   git remote remove origin
   
   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/[votre-compte]/learning-platform-nosql
   
   # Poussez le code vers votre dépôt
   git push -u origin main
   ```

3. Installation des dépendances :
   ```bash
   npm install
   ```

Je vous propose une structure de code qui suit les bonnes pratiques de développement. Vous trouverez dans le code des commentaires avec des **questions qui vous guideront dans votre réflexion**. Ces questions sont importantes car elles vous aideront à comprendre les choix d'architecture.

#### Aspects professionnels à noter :
- Utilisation des variables d'environnement pour la configuration
- Séparation claire des responsabilités (routes, contrôleurs, services)
- Gestion propre des connexions aux bases de données
- Organisation modulaire du code
- Gestion des erreurs et des cas limites
- Documentation du code

#### Pour le rendu, voici ce que j'attends :
1. Un dépôt public sur Github avec un historique de commits clair
2. Un README.md qui explique :
   - Comment installer et lancer le projet
   - La structure du projet
   - Les choix techniques que vous avez faits
   - Les réponses aux questions posées dans les commentaires
3. Le code complété avec tous les TODOs implémentés

#### Je vous conseille de procéder étape par étape :
1. Commencez par lire et comprendre la structure du projet
2. Répondez aux questions des commentaires dans le README
3. Implémentez progressivement les TODOs
4. Testez chaque fonctionnalité au fur et à mesure
5. Documentez vos choix et vos réflexions en ajoutant des copies d'écrans à votre fichier README.md

###### Bon courage

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

###### Configuration
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

