<template>
    <div id="bg">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <form v-on:submit.prevent="login(), show()" style="padding-top:25px" id="bg2">
                    <h1 class ="h3 mb-3 font-weight-normal text-center" >Iniciar Sesión</h1>
                    <div class="form-group">
                        <label for="Correo">Correo</label>
                        <input type="Correo" v-model="Correo" class="form-control" name="Correo" placeholder="Enter Correo">
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="Password" v-model="Password" class="form-control" name="Password" placeholder="Enter Password" required>
                    </div>
                    <div>
                    <button class="btn btn-lg btn-primary btn-block btn-danger" type="submit">Logearse</button>
                    </div>
                    <div>
                    <modal name="registrado" :width="250" :height="150">
                            <h3 class="text-center" style="padding:10px; color: black">ERROR!</h3>                                
                        <div class="text-center" style="color: black;">
                            <p>Usuario no Existe!</p>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-outline-success" onclick="location.href=''">Aceptar</button>
                        </div>
                    </modal>
                    </div>
                    <p>¿No puedes iniciar sesión?<br>
                    <a onclick="location.href='http://localhost:8080/#/register'">Crear Cuenta</a></p>
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
            Correo: '',
            Password:'',
            Baneo: 0
        }
    },

    methods: {
        login(){
            axios.post('/users/login',
            {
                Correo: this.Correo,
                Password: this.Password,
                Baneo: this.Baneo
            }).then(res=> {
                localStorage.setItem('usertoken', res.data)
                this.Correo=''
                this.Password=''
                router.push({name: 'Profile'})
            }).catch(err => {
                console.log(err)
            })
            this.emitMethod()
        },
        emitMethod(){
            EventBus.$emit('logged-in', 'loggedin')

        },
         show(){
            this.$modal.show('registrado')
        } 
    }
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