const Sequelize = require('sequelize');
const config = require('./config/config');

const database = new Sequelize(config);

database
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Init models
let User = require('./models/user.js')(Sequelize, database);
let History = require('./models/history.js')(Sequelize, database);
let Ville = require('./models/ville.js')(Sequelize, database);

// Set associations
History.belongsTo(User);

// Create tables
User
    .sync()
    .then(() => {
        console.log("User database created !");
    })
    .catch((error) => {
        console.error("Failed to create User database !");
    });

History
    .sync()
    .then(() => {
        console.log("History database created !");
    })
    .catch((error) => {
        console.error("Failed to create History database !");
    });

Ville
    .sync()
    .then(() => {
        console.log("Ville database created !");
    })
    .catch((error) => {
        console.error("Failed to create Ville database !");
    });

module.exports = {
    user: User,
    history: History,
    ville:Ville
};