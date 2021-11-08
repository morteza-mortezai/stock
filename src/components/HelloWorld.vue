<template>
  <div class="home">
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>stock</th>
        <th>reservations</th>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td>
          {{ product.id }}
        </td>
        <td>
          {{ product.name }}
        </td>
        <td>
          <span v-for="r in product.reservations" :key="r">
            {{ r }}
          </span>
        </td>
        <td>
          {{ product.stock }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { IProduct } from "../models/product";
import axios from "axios";
import ser from "@/services/stock";
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  products: Array<IProduct> = [];
  async getProducts(): Promise<any> {
   
    const res = await ser.getProducts();
    this.products = res.data;
  }

  mounted() {
    this.getProducts();
  }
}
</script>
