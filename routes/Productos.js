const express = require("express")
const products = express.Router()
const cors = require("cors")


const producto = require("../models/Producto")
products.use(cors())

process.env.SECRET_KEY = 'secret'

products.get("/productos", (req, res)=> {
    producto.findAll(
        
    )
    .then(todos => {
        res.send(todos)
    })    
    
    .catch(err => {
        res.send('error: ' + err)
    })
})
module.exports = products