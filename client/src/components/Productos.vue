
<template>
<div>
  <mdb-datatable
    :data="data"
    striped
    bordered
    fixedHeader
    :display="3"
  />
</div>
</template>
<script>
  import { mdbDatatable, mdbContainer } from 'mdbvue';
  export default {
    components: {
      mdbDatatable,
      mdbContainer
    },
    data() {
      return {
        columns: [],
        rows: []
      };
    },
    computed: {
      data() {
        return {
          columns: this.columns,
          rows: this.rows
        };
      },
    },
    methods: {
      filterData(dataArr, keys) {
        let data = dataArr.map(entry => {
          let filteredEntry = {};
          keys.forEach(key => {
            if (key in entry) {
              filteredEntry[key] = entry[key];
            }
          });
          return filteredEntry;
        });
        return data;
      }
    },
    mounted(){
      fetch('http://localhost:5000/productos/productos')
        .then(res => res.json())
        .then(json => {
          let keys = ["NombreProd", "Marca", "Precio"];
          let entries = this.filterData(json, keys);
          //columns
          this.columns = keys.map(key => {
            return {
              label: key.toUpperCase(),
              field: key,
              sort: 'asc'
            };
          });
          //rows
          entries.map(entry => this.rows.push(entry));
        })
        .catch(err => console.log(err));
    }
  };
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
