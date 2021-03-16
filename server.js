var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))

var Users = require("./routes/users")
var Products = require("./routes/productos")
var Categ = require("./routes/categorias")
var Configs = require("./routes/configuraciones")
app.use("/users", Users)
app.use("/productos", Products)
app.use("/categorias", Categ)
app.use("/configuraciones", Configs)


app.listen(port, ()=>{
    console.log("Server is running on port: " + port)
})