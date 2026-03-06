<template>
  <div class="container">
    <h1>Formulario Pedidos</h1>

    <form @submit.prevent="guardar">

      <!-- ID solo para consultar / actualizar / eliminar -->
      <div class="form-group">
        <label for="pedido_id">ID Pedido</label>
        <input
          type="number"
          id="pedido_id"
          v-model="pedidoId"
          placeholder="Para consultar / actualizar / eliminar"
        >
      </div>

      <div class="form-group">
        <label for="cliente_id">ID Cliente</label>
        <input type="number" id="cliente_id" required v-model="clienteId">
      </div>

      <div class="form-group">
        <label for="estado_pedido">Estado</label>
        <input
          type="text"
          id="estado_pedido"
          required
          v-model="estado"
          placeholder="Ej: CREADO"
        >
      </div>

      <!-- Items dinámicos -->
      <div class="items-section">
        <strong class="items-title">Items del Pedido</strong>

        <div v-for="(item, index) in items" :key="index" class="item-row">
          <div class="item-fields">
            <div class="form-group">
              <label>ID Producto</label>
              <input type="number" required v-model="item.productoId" placeholder="ID Producto">
            </div>
            <div class="form-group">
              <label>Cantidad</label>
              <input type="number" required v-model="item.cantidad" min="1">
            </div>
            <div class="form-group">
              <label>Precio (opcional)</label>
              <input type="number" v-model="item.precio" placeholder="Usa precio del producto si vacío">
            </div>
          </div>
          <button
            type="button"
            class="btn-quitar"
            @click="eliminarItem(index)"
            v-if="items.length > 1"
          >
            Quitar
          </button>
        </div>

        <button type="button" class="btn-agregar" @click="agregarItem">
          + Agregar Item
        </button>
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
      pedidoId:  "",
      clienteId: "",
      estado:    "CREADO",
      items: [{ productoId: "", cantidad: 1, precio: "" }],
    };
  },

  methods: {
    agregarItem() {
      this.items.push({ productoId: "", cantidad: 1, precio: "" });
    },

    eliminarItem(index) {
      this.items.splice(index, 1);
    },

    resetForm() {
      this.pedidoId  = "";
      this.clienteId = "";
      this.estado    = "CREADO";
      this.items     = [{ productoId: "", cantidad: 1, precio: "" }];
    },

    construirPayload() {
      return {
        cliente: { id: Number(this.clienteId) },
        estado: this.estado,
        items: this.items.map(item => {
          const entry = {
            producto: { Id_Producto: Number(item.productoId) },
            cantidad: Number(item.cantidad),
          };
          if (item.precio !== "" && item.precio !== null) {
            entry.precio = String(item.precio);
          }
          return entry;
        }),
      };
    },

    guardar() {
      axios.post("http://localhost:8081/api/pedidos", this.construirPayload())
      .then((response) => {
        console.log("pedido registrado con éxito", response.data);
        alert("Pedido registrado con éxito. ID asignado: " + response.data.id);
        this.resetForm();
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al registrar el pedido", error);
        const msg = error.response?.data?.message || error.response?.data || error.message;
        alert("El registro falló: " + msg);
      });
    },

    consultar() {
      if (!this.pedidoId) { alert("Ingresa un ID de pedido."); return; }
      axios.get("http://localhost:8081/api/pedidos/" + this.pedidoId)
      .then((response) => {
        const data = response.data;
        this.clienteId = data.cliente?.id ?? "";
        this.estado    = data.estado ?? "";
        this.items     = (data.items ?? []).map(item => ({
          productoId: item.producto?.Id_Producto ?? "",
          cantidad:   item.cantidad ?? 1,
          precio:     item.precio   ?? "",
        }));
        if (this.items.length === 0) {
          this.items = [{ productoId: "", cantidad: 1, precio: "" }];
        }
      })
      .catch((error) => {
        console.error("error al consultar el pedido", error);
        alert("Pedido no encontrado.");
      });
    },

    actualizar() {
      if (!this.pedidoId) { alert("Ingresa un ID de pedido."); return; }
      axios.put("http://localhost:8081/api/pedidos/actualizar/" + this.pedidoId, this.construirPayload())
      .then((response) => {
        console.log("pedido actualizado con éxito", response.data);
        alert("Pedido actualizado con éxito.");
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al actualizar pedido", error);
        const msg = error.response?.data?.message || error.response?.data || error.message;
        alert("Error al actualizar: " + msg);
      });
    },

    eliminar() {
      if (!this.pedidoId) { alert("Ingresa un ID de pedido."); return; }
      axios.delete("http://localhost:8081/api/pedidos/" + this.pedidoId)
      .then(() => {
        alert("Pedido eliminado con éxito.");
        this.resetForm();
        this.$emit("actualizar-tabla");
      })
      .catch((error) => {
        console.error("error al eliminar pedido", error);
        const msg = error.response?.data?.message || error.response?.data || error.message;
        alert("Error al eliminar: " + msg);
      });
    },
  },
};
</script>
