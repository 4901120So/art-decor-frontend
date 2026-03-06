<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Color</th>
          <th>Descripcion</th>
          <th>Dimension</th>
          <th>Name</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in estudiantes" :key="estudiante.Id_Producto">
          <td>{{ estudiante.Id_Producto }}</td>
          <td>{{ estudiante.color }}</td>
          <td>{{ estudiante.descripcion }}</td>
          <td>{{ estudiante.dimension }}</td>
          <td>{{ estudiante.name }}</td>
          <td>{{ estudiante.precio }}</td>
          <td>{{ estudiante.stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from "axios";

  export default{

    data(){
        return{
            estudiantes:[],
        };
    },
    methods:{
      obtenerProductos(){
        axios.get("http://localhost:8081/api/productos/listar")
        .then((response)=>{
          this.estudiantes=response.data;
        })
        .catch((error)=>{
          console.log('Error al obtener productos:', error);
        });
      }
    },

    mounted(){
      this.obtenerProductos();
    }

  }
</script>