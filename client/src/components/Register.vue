<template>
    <div id="bg">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="register(), show()" id="bg2">
                    <h1 class ="h3 mb-3 font-weight-normal">Rellene los campos</h1>
                    <p class="text-success">{{error}}</p>
                    <div class="form-group">
                        <label for="Nombre">Nombre</label>
                        <input type="Nombre" v-model="Nombre" class="form-control" name="Nombre" placeholder="Enter Nombre" required="true">
                    </div>
                    <div class="form-group">
                        <label for="Apellidos">Apellidos</label>
                        <input type="Apellidos" v-model="Apellidos" class="form-control" name="Apellidos" placeholder="Enter Apellidos" required="true">
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="Password" v-model="Password" class="form-control" name="Password" placeholder="Enter Password" required="true" minlength="4">
                    </div>
                    <div class="form-group">
                        <label for="Correo">Correo</label>
                        <input type="email" v-model="Correo" class="form-control" name="Correo" placeholder="Enter Correo" required="true">
                    </div>
                    <div>
                    <div>
                    <button class="btn btn-lg btn-primary btn-block btn-danger" type="submit">Registrarse</button>
                    </div>
                    <div v-if="error.length == 0" >
                    <modal name="registrado" :width="250" :height="150">
                            <h3 class="text-center" style="padding:10px; color: black">ENHORABUENA!</h3>                                
                        <div class="text-center" style="color: black;">
                            <p>Usuario Creado!</p>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-outline-success" onclick="location.href='http://localhost:8080/#/login'">Aceptar</button>
                        </div>
                    </modal>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <img src="../assets/Captura.png" class="rounded float-right" alt="responsive image"> -->
    </div>

</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
import VModal from 'vue-js-modal'

export default {
    data(){
        return{
            Nombre:'',
            Apellidos:'',
            Correo: '',
            Password:'',
            Tipo: 1,
            Baneo: 0,
            error:''
        }
    },

    methods: {
        register(){
            axios.post('/users/register',
            {
                Nombre: this.Nombre,
                Apellidos: this.Apellidos,
                Correo: this.Correo,
                Password: this.Password,
                Tipo: this.Tipo,
                Baneo: this.Baneo
            }).then(res=> {
                this.error= res.data.error
                if(res.data.error.length == 0){
                this.Nombre=''
                this.Apellidos=''
                this.Correo=''
                this.Password=''
                this.Tipo=''
                this.Baneo=''
                router.push({name: 'Login'})
                }
            }).catch(err => {
                console.log(err)
            })
            
        },
        show(){
            this.$modal.show('registrado')
        } 
        

        
    },
}
</script>
<style scoped>
#bg2{
    margin-top: 50px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2 );
    border-radius: 25px;
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