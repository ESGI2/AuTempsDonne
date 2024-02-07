// Setup Express base API
const express = require('express');
const app = express();
const port = 3000;

// Setup dotenv
require('dotenv').config();

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Sequelize
const sequelize = require('./config/db');
sequelize.sync().then(() => {
    console.log('La connexion à la base de données a été établie avec succès.');
    const port = 3000;
    app.listen(port, () => {
      console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
    });
  }).catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });

// Setup routes
const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

// Setup default route
app.use('/', (req, res) => {
    res.send("Bienvenue sur l'API !");
});