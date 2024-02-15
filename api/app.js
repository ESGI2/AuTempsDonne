// Setup Express, JWT, Sequelize and dotenv
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sequelize = require('./config/db');

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const user = {
    id: 1,
    username: 'test',
    role: 'admin'
}

//console.log(generateAccessToken(user));

sequelize.sync().then(() => {
    console.log('La connexion à la base de données a été établie avec succès.');
    const port = 3000;
    app.listen(port, () => {
      console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
    });
  }).catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });

// MIDDLEWARES ROUTES
const authMiddleware = require('./middlewares/authMiddleware');
const generateAccessToken = require("./middlewares/generateToken");

// USER ROUTE
const userRoutes = require('./routes/user.routes');
const registerRoutes = require('./routes/register.routes');
app.use('/user', userRoutes);
app.use('/register', registerRoutes);

// TRUCK ROUTE
const truckRoutes = require('./routes/truck.routes');
app.use('/truck', truckRoutes);

// PRODUCT ROUTE
const productRoutes = require('./routes/product.routes');
app.use('/product', productRoutes);

// WAREHOUSE ROUTE
const warehouseRoutes = require('./routes/warehouse.routes');
app.use('/warehouse', warehouseRoutes);


// ACTIVITY ROUTE
const activityRoute = require('./routes/activity.route');
app.use('/activity', activityRoute);

// MARAUDE ROUTE
const maraudeRoute = require('./routes/maraude.route');
app.use('/maraude', maraudeRoute);

// STOCK ROUTE
const stockRoutes = require('./routes/stock.routes');
app.use('/stock', stockRoutes);

// EVENT ROUTE
const eventRoute = require('./routes/event.route');
app.use('/event', eventRoute);


// Setup default route
app.use('/', (req, res) => {
    res.send("Bienvenue sur l'API !");
});