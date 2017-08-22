module.exports = (Sequelize, database) => {
    const User = database.define('user',
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

    return User;
};