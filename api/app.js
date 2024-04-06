// Setup Express, JWT, Sequelize and dotenv
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-access-token, x-refresh-token');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
  
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

// CHILD ROUTE
const childRoutes = require('./routes/child.route');
app.use('/child', childRoutes);

// TICKET ROUTE
const ticketRoutes = require('./routes/ticket.route');
app.use('/ticket', ticketRoutes);

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

// DELIVERY ROUTE
const deliveryRoutes = require('./routes/delivery.route');
app.use('/delivery', deliveryRoutes);

// DELIVERY_DRIVERS ROUTE
const deliveryDriverRoutes = require('./routes/deliveryDriver.route');
app.use('/deliveryDrivers', deliveryDriverRoutes)

// DELIVERY_LISTING ROUTE
const deliveryPointRoutes = require('./routes/deliveryPoint.route');
app.use('/deliveryPoint', deliveryPointRoutes)

// EVENT LISTING ROUTE
const eventListingRoute = require('./routes/eventListing.route');
app.use('/eventListing', eventListingRoute);

// TRAINING ROUTE
const trainingRoute = require('./routes/training.route');
app.use('/training', trainingRoute);

// TRAINING LISTING ROUTE
const trainingListingRoute = require('./routes/trainingListing.route');
app.use('/traininglisting', trainingListingRoute);

// Setup default route
app.use((req, res) => {
    res.status(404).json({"Error": "Not found"});
});