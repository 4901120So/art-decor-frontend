<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ID Pedido</th>
          <th>Dirección</th>
          <th>Fecha Envío</th>
          <th>Estado</th>
          <th>Tracking</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="envio in envios" :key="envio.id">
          <td>{{ envio.id }}</td>
          <td>{{ envio.pedido?.id }}</td>
          <td>{{ envio.direccion }}</td>
          <td>{{ formatFecha(envio.fechaEnvio) }}</td>
          <td>{{ envio.estado }}</td>
          <td>{{ envio.trackingNumber }}</td>
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
      envios: [],
    };
  },

  methods: {
    obtenerEnvios() {
      axios.get("http://localhost:8081/api/envios/listar")
      .then((response) => {
        this.envios = response.data;
      })
      .catch((error) => {
        console.log("Error al obtener envíos:", error);
      });
    },

    formatFecha(fecha) {
      if (!fecha) return "";
      return new Date(fecha).toLocaleString("es-CO");
    },
  },

  mounted() {
    this.obtenerEnvios();
  },
};
</script>
