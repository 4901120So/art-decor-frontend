<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID Usuario</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.Id_Usuario">
          <td>{{ usuario.Id_Usuario }}</td>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellido }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.telefono }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
    };
  },

  methods: {
    obtenerUsuarios() {
      axios.get("https://modulo3-production-d9e8.up.railway.app/api/usuarios/listar")
      .then((response) => {
        this.usuarios = response.data;
      })
      .catch((error) => {
        console.log("Error al obtener usuarios:", error);
      });
    },
  },

  mounted() {
    this.obtenerUsuarios();
  },
};
</script>
