<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Fecha Creación</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.cliente?.username ?? pedido.cliente?.id }}</td>
          <td>{{ pedido.estado }}</td>
          <td>{{ pedido.total }}</td>
          <td>{{ formatFecha(pedido.fechaCreacion) }}</td>
          <td>{{ pedido.items?.length ?? 0 }}</td>
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
      pedidos: [],
    };
  },

  methods: {
    obtenerPedidos() {
      axios.get("http://localhost:8081/api/pedidos/listar")
      .then((response) => {
        this.pedidos = response.data;
      })
      .catch((error) => {
        console.log("Error al obtener pedidos:", error);
      });
    },

    formatFecha(fecha) {
      if (!fecha) return "";
      return new Date(fecha).toLocaleDateString("es-CO");
    },
  },

  mounted() {
    this.obtenerPedidos();
  },
};
</script>
