const Sequelize = require("sequelize")
const db = require("../database/db")
const Configuracion = require("./Configuracion")
const Producto = require("./Producto")


const Usan = db.sequelize.define('Usan', {
    idUsan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
},
 { timestamps: false });

Configuracion.belongsToMany(Producto, { through: Usan });
Producto.belongsToMany(Configuracion, { through: Usan });

module.exports = Usan