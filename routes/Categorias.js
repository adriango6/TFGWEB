const express = require("express")
const categ = express.Router()
const cors = require("cors")


const categoria = require("../models/Categoria")
categ.use(cors())

process.env.SECRET_KEY = 'secret'

categ.get("/categorias", (req, res)=> {
    categoria.findAll(
        
    )
    .then(todos => {
        res.send(todos)
    })    
    
    .catch(err => {
        res.send('error: ' + err)
    })
})
module.exports = categ