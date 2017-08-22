const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user',
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

User.sync().then(() => {
    return User.create({
        firstName: 'John',
        lastName: 'Hancock',
        email: 'john.hancock@gmail.com',
        password: 'jh'
    });
});

module.exports = User;