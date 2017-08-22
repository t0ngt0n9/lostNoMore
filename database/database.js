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

// Set associations
History.belongsTo(User);

// Testing
User.sync({force: true}).then(() => {
    return User.create({
        firstName: 'John',
        lastName: 'Hancock',
        email: 'john.hancock@gmail.com',
        password: 'jh'
    });
});

History.sync({force: true}).then(() => {
    return History.create({
        start: "Coucou",
        end: "Voila",
        journey: "Coucou",
        userId: 1
    });
});

module.exports = database;