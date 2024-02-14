// Setup Express, JWT, Sequelize and dotenv
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log('La connexion à la base de données a été établie avec succès.');
    const port = 3000;
    app.listen(port, () => {
      console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
    });
  }).catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });

// USER ROUTE
const userRoutes = require('./routes/user.routes');
const registerRoutes = require('./routes/register.routes');
const loginRoutes = require('./routes/login.routes');
app.use('/user', userRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// TRUCK ROUTE
const truckRoutes = require('./routes/truck.routes');
app.use('/truck', truckRoutes);

// PRODUCT ROUTE
const productRoutes = require('./routes/product.routes');
app.use('/product', productRoutes);

// WAREHOUSE ROUTE
const warehouseRoutes = require('./routes/warehouse.routes');
app.use('/warehouse', warehouseRoutes);


// MARAUDE ROUTE
const maraudeRoute = require('./routes/maraude.route');
app.use('/maraude', maraudeRoute);

// Setup default route
app.use('/', (req, res) => {
    res.send("Welcome to the API!");
});