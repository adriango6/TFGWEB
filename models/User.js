const Sequelize = require("sequelize")
const db = require("../database/db")
const Configuracion = require("./Configuracion")

const User = db.sequelize.define(
    'user',
    {
        idUsuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: Sequelize.STRING
        },
        Apellidos: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        },
        Correo: {
            type: Sequelize.STRING
        },
        Tipo: {
            type: Sequelize.INTEGER
        },
        Baneo: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)

//User.hasMany(Configuracion, {as: 'idUsuario'})
module.exports = User
