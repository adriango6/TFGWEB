const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post("/register", (req, res)=> {
    const userData = {
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Password: req.body.Password,
        Correo: req.body.Correo,
        Tipo: req.body.Tipo,
        Baneo: req.body.Baneo
    }

    User.findOne({
        where: {
            Correo: req.body.Correo
        }
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.Password, 10, (err, hash)=>{
                userData.Password = hash
                User.create(userData)
                .then(user=> {
                    res.json({status: user.Correo + ' registered'})
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
        } else {
            res.json({ error: 'El correo ya está en uso'})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})
users.post("/login", (req, res)=> {
    User.findOne({
        where: {
            Correo: req.body.Correo,
            Baneo: req.body.Baneo
        }
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.Password, user.Password)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                process.env.TIPO_USUARIO = user.Tipo
                process.env.MAIL = req.body.Correo
                res.send(token)
            }
        }else{
            res.status(400).json({error: 'El usuario no existe'})
        }
    })
    .catch(err => {
        res.status(400).json({ error: err })
    })
}),
users.get("/usuarios", (req, res)=> {
    User.findAll({
        where: {
            Tipo: 1,
            Baneo: 0
        }
    })
    .then(todos => {
        res.send(todos)
    })    
    
    .catch(err => {
        res.send('error: ' + err)
    })
}),
users.post("/banear", (req, res) => {
    
    User.update({ Baneo: 1 }, { where: {Baneo: 0, idUsuario: req.body.idUsuario} })
    .then(user => {
        res.json({ status: user.correo + "" })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
    })
}),
users.get("/borrados", (req, res)=> {
    User.findAll({
        where: {
            Tipo: 1,
            Baneo: 0
        }
    })
    .then(todos => {
        res.send(todos)
    })    
    
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = users