module.exports = (Sequelize, database) => {
    const Ville = database.define('ville',
        {
            EU_circo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            code_region: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nom_region: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cheflieu_region: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numero_departement: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nom_departement: {
                type: Sequelize.STRING,
                allowNull: false
            },
            prefecture: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numero_circonscription: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nom_commune: {
                type: Sequelize.STRING,
                allowNull: false
            },
            codes_postaux: {
                type: Sequelize.STRING,
                allowNull: false
            },
            code_insee: {
                type: Sequelize.STRING,
                allowNull: false
            },
            latitude: {
                type: Sequelize.STRING,
                allowNull: false
            },
            longitude: {
                type: Sequelize.STRING,
                allowNull: false
            },
            eloignement: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true
        }
    );

    return Ville;
};