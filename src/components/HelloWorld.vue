<template>
  <div class="home">
    <v-snackbar v-model="snackbar">
      {{ msg }}
    </v-snackbar>
    <refill-modal
      v-model="refill_modal"
      :product="product_to_refill"
      @update-table="onUpdate"
    />
    <buy-modal
      v-model="buy_modal"
      :product="product_to_buy"
      @update-table="onUpdate"
    />
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="10"
      :loadin="loading"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn @click="onRefill(item)">refill</v-btn>
        <v-btn @click="onBuy(item)">buy</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import RefillModal from "@/components/RefillModal.vue";
import BuyModal from "@/components/BuyModal.vue";
import { IProduct } from "../models/product";

import ser from "@/services/stock";
@Component({
  components: {
    BuyModal,
    RefillModal,
  },
})
export default class Home extends Vue {
  snackbar = false;
  msg = "";
  refill_modal = false;
  buy_modal = false;
  products: Array<IProduct> = [];
  product_to_refill: null | IProduct = null;
  product_to_buy: null | IProduct = null;
  loading: boolean = false;
  headers = [
    {
      text: "id",
      align: "start",
      sortable: false,
      value: "id",
    },
    { text: "name", value: "name" },
    { text: "stock", value: "stock" },
    { text: "reservations", value: "reservations" },
    { text: "actions", value: "actions" },
  ];
  async getProducts(): Promise<any> {
    this.loading = true;
    try {
      const res = await ser.getProducts();
      this.products = res.data;
    } catch (err) {}
    this.loading = false;
  }
  onRefill(product: IProduct) {
    this.product_to_refill = product;
    this.refill_modal = true;
  }
  onBuy(product: IProduct) {
    this.product_to_buy = product;
    this.buy_modal = true;
  }
  onUpdate() {
    this.product_to_buy = null;
    this.product_to_refill = null;
    this.msg="Action done Successfully"
    this.snackbar=true
    this.getProducts();
  }
  mounted() {
    this.getProducts();
  }
}
</script>
