<template>    
    <div class="container-fluid" id="bg">        
    </div>    
</template>
<style scoped>
#bg{
    /* The image used */
    background-image: url("../assets/fondo.png");

    /* Full height */
    height: calc(100vh - 56px);

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
@media (max-width: 992px) {
  #bg{
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