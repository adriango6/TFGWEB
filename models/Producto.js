const Sequelize = require("sequelize")
const db = require("../database/db")


const Producto = db.sequelize.define(
    'producto',
    {
        idProductos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        NombreProd: {
            type: Sequelize.STRING   
        },
        Marca: {
            type: Sequelize.STRING
        },
        Precio: {
            type: Sequelize.FLOAT
        },
        idCategoria: {
            type: Sequelize.INTEGER
        }
    } 
    ,
    {
        timestamps: false
    }
)


module.exports = Producto


