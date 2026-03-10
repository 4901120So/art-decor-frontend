<template>
  <div class="container">
    <h1>Formulario Usuarios</h1>

    <form @submit.prevent="guardar">
      <div class="form-group">
        <label for="id_usuario">ID Usuario</label>
        <input type="text" id="id_usuario" required v-model="Id_Usuario">
      </div>

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" required v-model="nombre">
      </div>

      <div class="form-group">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" required v-model="apellido">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" required v-model="email">
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input type="text" id="telefono" required v-model="telefono">
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

export default {
  data() {
    return {
      Id_Usuario: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
    };
  },

  methods: {
    guardar() {
      axios.post("https://modulo3-production-d9e8.up.railway.app/api/usuarios", {
        Id_Usuario: this.Id_Usuario,
        nombre:     this.nombre,
        apellido:   this.apellido,
        email:      this.email,
        telefono:   this.telefono,
      })
      .then((response) => {
        console.log("usuario registrado con éxito", response.data);
        alert("El usuario se registró correctamente");
        this.Id_Usuario = "";
        this.nombre     = "";
        this.apellido   = "";
        this.email      = "";
        this.telefono   = "";
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al registrar el usuario", error);
        alert("El registro falló");
      });
    },

    consultar() {
      axios.get("https://modulo3-production-d9e8.up.railway.app/api/usuarios/" + this.Id_Usuario)
      .then((response) => {
        this.nombre   = response.data.nombre;
        this.apellido = response.data.apellido;
        this.email    = response.data.email;
        this.telefono = response.data.telefono;
      })
      .catch((error) => {
        console.error("error al consultar el usuario", error);
      });
    },

    actualizar() {
      axios.put("https://modulo3-production-d9e8.up.railway.app/api/usuarios/actualizar/" + this.Id_Usuario, {
        Id_Usuario: this.Id_Usuario,
        nombre:     this.nombre,
        apellido:   this.apellido,
        email:      this.email,
        telefono:   this.telefono,
      })
      .then((response) => {
        console.log("usuario actualizado con éxito", response.data);
        alert("Usuario actualizado con éxito");
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al actualizar usuario", error);
      });
    },

    eliminar() {
      axios.delete("https://modulo3-production-d9e8.up.railway.app/api/usuarios/" + this.Id_Usuario)
      .then(() => {
        alert("Usuario eliminado con éxito");
        this.Id_Usuario = "";
        this.nombre     = "";
        this.apellido   = "";
        this.email      = "";
        this.telefono   = "";
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al eliminar usuario", error);
      });
    },
  },
};
</script>
