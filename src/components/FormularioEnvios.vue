<template>
  <div class="container">
    <h1>Formulario Envíos</h1>

    <form @submit.prevent="guardar">

      <!-- ID solo para consultar / actualizar / eliminar -->
      <div class="form-group">
        <label for="envio_id">ID Envío</label>
        <input
          type="number"
          id="envio_id"
          v-model="envioId"
          placeholder="Para consultar / actualizar / eliminar"
        >
      </div>

      <div class="form-group">
        <label for="pedido_id">ID Pedido</label>
        <input type="number" id="pedido_id" required v-model="pedidoId">
      </div>

      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input type="text" id="direccion" required v-model="direccion">
      </div>

      <div class="form-group">
        <label for="fecha_envio">Fecha Envío</label>
        <input type="datetime-local" id="fecha_envio" required v-model="fechaEnvio">
      </div>

      <div class="form-group">
        <label for="estado_envio">Estado</label>
        <input
          type="text"
          id="estado_envio"
          required
          v-model="estado"
          placeholder="Ej: PENDIENTE, ENVIADO, ENTREGADO"
        >
      </div>

      <div class="form-group">
        <label for="tracking">Tracking Number</label>
        <input type="text" id="tracking" required v-model="trackingNumber">
      </div>

      <button type="submit">Guardar</button><br>
      <button type="button" @click="eliminar">Eliminar</button><br>
      <button type="button" @click="actualizar">Actualizar</button><br>
      <button type="button" @click="consultar">Consultar</button><br>
      <button type="button" @click="resetForm">Restablecer</button>

    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      envioId:        "",
      pedidoId:       "",
      direccion:      "",
      fechaEnvio:     "",
      estado:         "PENDIENTE",
      trackingNumber: "",
    };
  },

  methods: {
    resetForm() {
      this.envioId        = "";
      this.pedidoId       = "";
      this.direccion      = "";
      this.fechaEnvio     = "";
      this.estado         = "PENDIENTE";
      this.trackingNumber = "";
    },

    construirPayload() {
      return {
        pedido:         { id: Number(this.pedidoId) },
        direccion:      this.direccion,
        fechaEnvio:     this.fechaEnvio,
        estado:         this.estado,
        trackingNumber: this.trackingNumber,
      };
    },

    guardar() {
      axios.post("http://localhost:8081/api/envios", this.construirPayload())
      .then((response) => {
        console.log("envío registrado con éxito", response.data);
        alert("Envío registrado con éxito. ID asignado: " + response.data.id);
        this.resetForm();
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al registrar el envío", error);
        const msg = error.response?.data?.message || error.response?.data || error.message;
        alert("El registro falló: " + msg);
      });
    },

    consultar() {
      if (!this.envioId) { alert("Ingresa un ID de envío."); return; }
      axios.get("http://localhost:8081/api/envios/" + this.envioId)
      .then((response) => {
        const data = response.data;
        this.pedidoId       = data.pedido?.id    ?? "";
        this.direccion      = data.direccion      ?? "";
        // datetime-local necesita formato "yyyy-MM-ddTHH:mm"
        this.fechaEnvio     = data.fechaEnvio ? data.fechaEnvio.slice(0, 16) : "";
        this.estado         = data.estado         ?? "";
        this.trackingNumber = data.trackingNumber ?? "";
      })
      .catch((error) => {
        console.error("error al consultar el envío", error);
        alert("Envío no encontrado.");
      });
    },

    actualizar() {
      if (!this.envioId) { alert("Ingresa un ID de envío."); return; }
      axios.put("http://localhost:8081/api/envios/actualizar/" + this.envioId, this.construirPayload())
      .then((response) => {
        console.log("envío actualizado con éxito", response.data);
        alert("Envío actualizado con éxito.");
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al actualizar envío", error);
        const msg = error.response?.data?.message || error.response?.data || error.message;
        alert("Error al actualizar: " + msg);
      });
    },

    eliminar() {
      if (!this.envioId) { alert("Ingresa un ID de envío."); return; }
      axios.delete("http://localhost:8081/api/envios/" + this.envioId)
      .then(() => {
        alert("Envío eliminado con éxito.");
        this.resetForm();
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al eliminar envío", error);
        const msg = error.response?.data?.message || error.response?.data || error.message;
        alert("Error al eliminar: " + msg);
      });
    },
  },
};
</script>
