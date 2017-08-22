module.exports = (Sequelize, database) => {
    const History = database.define('history',
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

    return History;
};