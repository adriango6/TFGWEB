<template>
<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #F03A53;">
    <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
        <ul class="navbar-nav" style="font-weight: 900;">
            <li class="nav-item active">
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li v-if="auth==''" class="nav-item active">
                <router-link class="nav-link" to="/register">Regístrese</router-link>
            </li>
            <li v-if="auth!=''" class="nav-item active">
                <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
            
            <li v-if="auth!=''" class="nav-item active">
                <router-link class="nav-link" to="/productos">Productos</router-link>
            </li>
            <li v-if="auth!=''" class="nav-item active">
                <router-link class="nav-link" to="/configuraciones">Configuraciones</router-link>
            </li>
            <li v-if="auth==''" class="nav-item active">
                <router-link class="nav-link" to="/login">Inicie Sesión</router-link>
            </li>
            <li v-if="auth!=''" class="nav-item active">
                <a class="nav-link" href="" v-on:click="logout">Logout</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
import EventBus from './EventBus'

EventBus.$on('logged-in', test => {
    console.log(test)
})

export default{
    data() {
        return {
            auth:'',
            user:''
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('usertoken')
        }
    },

    mounted() {
        EventBus.$on('logged-in', status =>{
            this.auth = status
        })
    }
}
</script>