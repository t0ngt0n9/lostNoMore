const Sequelize = require('sequelize');
const sequelize = require('../database');

const History = sequelize.define('history',
    {
        start: {
            type: Sequelize.STRING,
            allowNull: false
        },
        end: {
            type: Sequelize.STRING,
            allowNull: false
        },
        journey: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

const User = require('./user');
History.belongsTo(User);

History.sync().then(() => {
  return History.create({
    start: "Coucou",
    end: "Voila",
    journey: "Coucou",
    userId: 1
  });
});

module.exports = History;