<template>
  <v-app>
    <h1 class="ma-5">Products List</h1>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
