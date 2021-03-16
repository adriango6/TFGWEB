const Sequelize = require("sequelize")
const db = require("../database/db")
const User = require("./User")

const Configuracion = db.sequelize.define(
    'configuraciones',
    {
        idConfig: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreConf: {
            type: Sequelize.STRING
        },
        GraficaConf: {
            type: Sequelize.STRING
        },
        ProcesadorConf: {
            type: Sequelize.STRING
        },
        PlacaBaseConf: {
            type: Sequelize.STRING
        },
        DiscoDuroConf: {
            type: Sequelize.INTEGER
        },
        FuenteConf: {
            type: Sequelize.STRING
        },
        RamConf: {
            type: Sequelize.STRING
        },
        idUsuario: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)
//Configuracion.hasMany(User, {foreignKey: 'idUsuario', sourceKey: 'idUsuario'})
//Configuracion.belongsTo(User, {foreignKey: 'idUsuario', targetKey: 'idUsuario'})
module.exports = Configuracion