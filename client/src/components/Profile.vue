<template>
    <div id="bg">
        <div class="bg2">
            <div class="col-sm-8 mx-auto">
                <h1 class="text-center" style="color: white;">PERFIL</h1>
            </div>
            <table class ="table col-md-6 mx-auto" style="color: white;">
                <tbody>
                    <tr>
                        <td>Nombre</td>
                        <td>{{Nombre}}</td>
                    </tr>
                    <tr>
                        <td>Apellidos</td>
                        <td>{{Apellidos}}</td>
                    </tr>
                    <tr>
                        <td>Correo</td>
                        <td>{{Correo}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bg2">
            <h1>Tus Configuraciones</h1>
            <table class="table" style="color: white;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Gráfica</th>
                        <th>Procesador</th>
                        <th>PlacaBase</th>
                        <th>DiscoDuro</th>
                        <th>Fuente</th>
                        <th>Ram</th>
                        <th>Funciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in configuraciones" :key="index">
                        <td>{{item.NombreConf}}</td>
                        <td>{{item.GraficaConf}}</td>
                        <td>{{item.ProcesadorConf}}</td>
                        <td>{{item.PlacaBaseConf}}</td>
                        <td>{{item.DiscoDuroConf}}</td>
                        <td>{{item.FuenteConf}}</td>
                        <td>{{item.RamConf}}</td>
                        <td><button class="btn btn-primary btn-block btn-danger" @click="eliminarConfiguraciones(item.idConfig)">borrar</button></td>
                    </tr>
                    <tr v-if="configuraciones.length > 0"><button class="btn btn-block btn-secondary" @click="exportPDF">Export PDF</button></tr>
                </tbody>
            </table>
        </div>
        <div class="bg2" v-if="Nombre=='admin'">
            <h1>Usuarios</h1>
            <table class="table" style="color: white;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Funciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in usuariosRegistrados" :key="index">
                        <td>{{item.Nombre}}</td>
                        <td>{{item.Apellidos}}</td>
                        <td>{{item.Correo}}</td>
                        <td><button class="btn btn-primary btn-block btn-danger" @click="eliminarUsuarios(item.idUsuario)">borrar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
import jsPDF from 'jspdf'
import jspdf from 'jspdf-autotable'

export default {
    data () {
        const token = localStorage.usertoken
        const decoded = jwtDecode(token)
        return{
            Nombre: decoded.Nombre,
            Apellidos: decoded.Apellidos,
            Correo: decoded.Correo,
            configuraciones: [],
            categorias: [],
            usuariosRegistrados: [],
            Baneo: 1
           
            

        }
    },
    mounted(){
            this.listarConfiguraciones()
            this.administrador()
            
        },
        methods: {
            listarConfiguraciones(){
                console.log("listando configuraciones")
                axios.get('/configuraciones/perfil')
                    .then(res=> {
                        console.log(res);
                        this.configuraciones = res.data;
                    })
                    .catch(e =>{
                        console.log(e);
                    })
                
            },
            exportPDF() {
                axios.get('/categorias/categorias')
                    .then(res=> {
                        console.log(res);
                        this.categorias = res.data;
                    })
                    .catch(e =>{
                        console.log(e);
                    })
                var array2D = []
                var arrayConf =[]
                console.log(this.configuraciones[0])
                for(let i=0;i<this.configuraciones.length;i++){
                    console.log(i)
                    arrayConf = new Array(this.categorias.length)
                    arrayConf.push(this.configuraciones[i].NombreConf)
                    arrayConf.push(this.configuraciones[i].GraficaConf)
                    arrayConf.push(this.configuraciones[i].ProcesadorConf)
                    arrayConf.push(this.configuraciones[i].PlacaBaseConf)
                    arrayConf.push(this.configuraciones[i].DiscoDuroConf)
                    arrayConf.push(this.configuraciones[i].FuenteConf)
                    arrayConf.push(this.configuraciones[i].RamConf)
                    array2D.push(arrayConf)
                    console.log(this.configuraciones[i].NombreConf)
                }
                
                console.log(array2D)
                    


                console.log(this.configuraciones)
                const doc = new jsPDF()
                doc.autoTable({
                    head: [['Nombre', 'Grafica', 'Procesador', 'PlacaBase', 'DiscoDuro', 'Fuente', 'Ram']],
                    body: array2D
                    
                    })

                    doc.save('tuConfiguracion.pdf')
                
                },
                administrador(){
                        axios.get('/users/usuarios')
                        .then(res=> {
                            console.log(res);
                            this.usuariosRegistrados = res.data;
                        })
                        .catch(e =>{
                            console.log(e);
                        })
                },
                eliminarUsuarios(idUsuario){
                    console.log(idUsuario);
                   axios.post("/users/banear", {
                    idUsuario: idUsuario
                    })
                    .then(res => {
                        idUsuario = res.data
                    }).then(
                           axios.get('/users/borrados')
                    .then(res=> {
                        console.log(res);
                        this.usuariosRegistrados = res.data;
                    })
                    .catch(e =>{
                        console.log(e);
                    })  
                        )
                    .catch(err => {
                    console.log(err);
                    });
                        
                },
                eliminarConfiguraciones(idConfig){
                    axios.post("/configuraciones/eliminar", {
                    idConfig: idConfig
                    })
                    .then(res => {
                        idConfig = res.data
                        
                    }).then(
                           axios.get('/configuraciones/perfil')
                    .then(res=> {
                        console.log(res);
                        this.configuraciones = res.data;
                    })
                    .catch(e =>{
                        console.log(e);
                    })  
                        )
                    .catch(err => {
                    console.log(err);
                    });
                },
                

        }
}
</script>
<style scoped>

.bg2{
   
    border-radius: 25px;
    background-color: rgb(0, 0, 0, 0.7);
    padding: 10px;
}
#bg{
    /* The image used */
    color: white;
    background-image: url("../assets/fondo.png");

    /* Full height */
    height: calc(100vh - 56px);

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.row{
    margin-right: 0px;
    margin-left: 0px;
}
@media (max-width: 992px) {
  #bg{
    color: white;
    /* The image used */
    background-image: url("../assets/fondo.png");

    /* Full height */
    height: calc(100vh - 22px);

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    }
}
</style>