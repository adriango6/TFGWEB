<template>
    <div id="bg" class="items-align-center">
        
        <div class="row ">
            <div class="col-md-6 mt-5 mx-auto bg2">
                <h1 class ="h3 mb-3 font-weight-normal" style="color: white">Configure su PC</h1>
                    
                <div class="form-group">
                    <form v-on:submit.prevent="nuevaConfiguracion(), show()">
                    <label for="NombreConf" style="color: white;">Nombre de la configuración</label>
                    <input type="NombreConf" v-model="NombreConf" class="form-control mb-2" name="NombreConf" placeholder="Enter NombreConf" required>
                    
                    <ul class="list-group align-items-center adjust-to-parent" >                       
                        <li class="list-group-item" v-for="(categoria, index) in categorias" :key="index" >
                            {{filtrarProductos(categoria.idCategoria)}}
                            <label for="NombreCateg">{{categoria.NombreCateg}}</label>
                            
                                <div class="form-row">
                                    <div class="col-auto my-1 ">
                                        <select class="custom-select mr-sm-2 " id="inlineFormCustomSelect" v-model="productosSeleccionados[index]" required>
                                            <option disabled :value="null">Seleccione componente...</option>
                                            <option v-for="(producto, index) in productosCategorizados" :key="index">
                                                        {{producto.NombreProd}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                        </li>
                    </ul>
                   <br>
                   <div>
                        <button class="btn btn-lg btn-primary btn-block btn-danger" type="submit">Guardar Configuración</button>
                        <modal name="configurado" :width="250" :height="150">
                                <h3 class="text-center" style="padding:10px">ENHORABUENA!</h3>
                                <div class="text-center">
                                    <p>Configuración creada!</p>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-outline-success" onclick="location.href='http://localhost:8080/#/profile'">Aceptar</button>
                             </div>
                        </modal>
                   </div>
                    </form>
                 </div>   
            </div>
         </div>
         
    </div>
</template>

<!<script>
import axios from 'axios'
import router from '../router'
import VModal from 'vue-js-modal'
import EventBus from './EventBus'

export default {
  data() {         
       return{
            categorias: [],
            productos: [],
            productosCategorizados: [],
            NombreConf: '',
            productosSeleccionados: [],
            creado:''
        }
        
        },
       created(){
            this.listarCategorias()
            this.listarProductos()
            this.productosCategorizados
           
        },
        
        methods: {
            listarCategorias(){
                axios.get('/categorias/categorias')
                    .then(res=> {
                        console.log(res);
                        this.categorias = res.data;
                    })
                    .catch(e =>{
                        console.log(e);
                    })
                
            },
            listarProductos(){
                axios.get('/productos/productos')
                    .then(res=> {
                        console.log(res);
                        this.productos = res.data;
                    })
                    .catch(e =>{
                        console.log(e);
                    })
                
            },
            filtrarProductos(categoriaActual){
                this.productosCategorizados=[]
                for(let i=0;i<this.productos.length; i++){
                    if(this.productos[i].idCategoria===categoriaActual){
                        this.productosCategorizados.push(this.productos[i])
                    }
                }
            },
             nuevaConfiguracion(){
                 console.log(this.productosSeleccionados)
            axios.post('/configuraciones/nuevo',
            {
                NombreConf: this.NombreConf,
                GraficaConf: this.productosSeleccionados[0],
                ProcesadorConf: this.productosSeleccionados[1],
                PlacaBaseConf: this.productosSeleccionados[2],
                DiscoDuroConf: this.productosSeleccionados[3],
                FuenteConf: this.productosSeleccionados[4],
                RamConf: this.productosSeleccionados[5]  
            }).then(res=> {
                this.creado= res.data.status
                //router.push({name: 'Configuraciones'})
                
            }).catch(err => {
                console.log(err)
            })
            
        },
        show(){
            this.$modal.show('configurado')
        } 
        }
  }

</script>
<style scoped>
.bg2{
    margin-top: 50px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7 );
    border-radius: 25px;
}
#bg{
    /* The image used */
    
    background-image: url("../assets/fondo.png");

    /* Full height */
   

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