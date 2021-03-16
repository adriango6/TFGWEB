const express = require("express")
const configuraciones = express.Router()
const cors = require("cors")


const Conf = require("../models/Configuracion")
const Usuario = require("../models/User")
configuraciones.use(cors())

process.env.SECRET_KEY = 'secret'

configuraciones.post("/nuevo", (req, res)=> {
    console.log(process.env.MAIL)
    Usuario.findOne({
        where: {
            Correo: process.env.MAIL
        }
    }).then(user => {
        console.log(user)
        const confData = {
            NombreConf: req.body.NombreConf,
            GraficaConf: req.body.GraficaConf,
            ProcesadorConf: req.body.ProcesadorConf,
            PlacaBaseConf: req.body.PlacaBaseConf,
            DiscoDuroConf: req.body.DiscoDuroConf,
            FuenteConf: req.body.FuenteConf,
            RamConf: req.body.RamConf,
            idUsuario: user.idUsuario
        }
        Conf.create(confData)
        .then(conf=> {
            res.json({status: conf.NombreConf + 'Configuración Creada'})
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    })
   
})
configuraciones.get("/perfil", (req, res)=> {
    console.log("obteniendoConfiguracipones")
   Usuario.findOne({
        where: {
            Correo: process.env.MAIL
        } 
    })
    .then(user =>{ 
        Conf.findAll({
        where: {
            idUsuario: user.idUsuario
        }
    })
    .then(todos => {
        
        res.send(todos)
    })    
})
    .catch(err => {
        res.send('error: ' + err)
    })
}),
configuraciones.post("/eliminar", (req, res) => {
    Conf.destroy({
        where: {
            idConfig: req.body.idConfig,
        }
    }).then(conf => {
        res.json({ status: conf.idConfig + "" })
       
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ error: err })
    })
})
   

module.exports = configuraciones