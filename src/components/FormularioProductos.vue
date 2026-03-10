<template>
  <div class="container">
    <h1>Formulario Productos</h1>

    <form id="formulario-estudiantes" @submit.prevent="guardar">
      <div class="form-group">
        <label for="id_producto">Codigo</label>
        <input type="text" id="id_producto" name="id_producto" required v-model="Id_Producto">
      </div>

      <div class="form-group">
        <label for="color">Color</label>
        <input type="text" id="color" name="color" required v-model="color">
      </div>

      <div class="form-group">
        <label for="descripcion">Descripcion</label>
        <input type="text" id="descripcion" name="descripcion" required v-model="descripcion">
      </div>

      <div class="form-group">
        <label for="dimension">Dimension</label>
        <input type="text" id="dimension" name="dimension" required v-model="dimension">
      </div>

      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" required v-model="name">
      </div>

      <div class="form-group">
        <label for="precio">Precio</label>
        <input type="text" id="precio" name="precio" required v-model="precio">
      </div>

      <div class="form-group">
        <label for="stock">Stock</label>
        <input type="text" id="stock" name="stock" required v-model="stock">
      </div>

      <button type="submit">Guardar</button><br>
      <button type="button" @click="eliminar">Eliminar</button><br>
      <button type="button" @click="actualizar">Actualizar</button><br>
      <button type="button" @click="consultar">Consultar</button><br>

      <input type="reset" />
    </form>
  </div>
</template>

<script>
    import axios from "axios";

    export default{

        data(){

            return{

                Id_Producto: "",
                color: "",
                descripcion: "",
                dimension: "",
                name: "",
                precio: "",
                stock: "",

            };

        },

        methods:{

          guardar() {
              axios.post("https://modulo3-production-d9e8.up.railway.app/api/productos", {
                  Id_Producto: this.Id_Producto,
                  color: this.color,
                  descripcion: this.descripcion,
                  dimension: this.dimension,
                  name: this.name,
                  precio: this.precio,
                  stock: this.stock,
              })
              .then((response) => {
                  console.log("estudiante registrado con éxito", response.data);
                  alert("El estudiante se registro correctamente");
                  
                  // Limpiar los campos del formulario tras el éxito
                  this.Id_Producto = "";
                  this.color = "";
                  this.descripcion = "";
                  this.dimension = "";
                  this.name = "";
                  this.precio = "";
                  this.stock = "";

                  this.$emit("actualizar-tabla"); // Emitir un evento para actualizar la tabla de estudiantes
          
              })
              .catch((error) => {
                  console.error("error al registrar el estudiante", error);
                    alert("El registro fallo");
              });
          },

          consultar(){
            axios.get("http://localhost:8081/api/productos/"+this.Id_Producto)
            .then((response)=>{

                this.color= response.data.color;
                this.descripcion= response.data.descripcion;
                this.dimension= response.data.dimension;
                this.name= response.data.name;
                this.precio= response.data.precio;
                this.stock= response.data.stock;

            })
            .catch((error)=>{
                console.error("error al consultar el producto",error);
            });
          } ,

          actualizar(){

            axios.put("http://localhost:8081/api/productos/actualizar/"+this.Id_Producto,{

                Id_Producto:this.Id_Producto,
                color:this.color,
                descripcion:this.descripcion,
                dimension:this.dimension,
                name:this.name,
                precio:this.precio,
                stock:this.stock,

            })
            .then((response)=>{

                console.log("producto actualizado con exito", response.data);
                alert("producto actualizado con exito");
                 this.$emit("actualizar-tabla");

            })
            .catch((error)=>{

                console.error("error al actualizar producto", error);

            });

          },

          eliminar(){

            axios.delete("http://localhost:8081/api/productos/"+this.Id_Producto)
            .then(()=>{

                alert("producto eliminado con exito");
                this.Id_Producto="";
                this.color="";
                this.descripcion="";
                this.dimension="";
                this.name="";
                this.precio="";
                this.stock="";

                this.$emit("actualizar-tabla");

            })
            .catch((error)=>{
              console.error("error al eliminar producto", error);
            });

          }

        }

    }

</script>