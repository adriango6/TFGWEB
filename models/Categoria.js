const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'categorias',
    {
        idCategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        NombreCateg: {
            type: Sequelize.STRING   
        }
    } 
    ,
    {
        timestamps: false
    }
)