<template>
  <v-dialog v-model="modal" width="500">
    <v-card max-width="600px" v-if="product">
      <validation-observer ref="validator" v-slot="{ handleSubmit, reset }">
        <form @submit.prevent="handleSubmit(buy)" @reset.prevent="reset">
          <v-card-title> Buy Product </v-card-title>
          <h4>
            Product Name :
            {{ product.name }}
          </h4>
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="amount"
              :rules="`required|integer|max_value:${product.stock}`"
            >
              <v-text-field
                label="Amount *"
                filled
                :error-messages="errors"
                v-model="amount"
              ></v-text-field>
            </validation-provider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="modal = false" color="error">cancel</v-btn>
            <v-btn type="submit" color="success">buy</v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { required, integer, max_value } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("integer", {
  ...integer,
  message: "{_field_} must be number",
});
extend("max_value", {
  ...max_value,
  message: ` may not be more than avaiable products`,
});
import { Component, Vue, VModel, Prop, Emit } from "vue-property-decorator";

import { IProduct } from "../models/product";

import ser from "@/services/stock";
@Component({
  components: { ValidationObserver, ValidationProvider },
})
export default class buyModal extends Vue {
  @VModel() modal!: boolean;
  @Prop() product!: IProduct;
  amount: number = 0;
  loading = false;
  dialog = false;

  async buy(): Promise<any> {
    this.loading = true;
    try {
      const res = await ser.buy(this.product.id, this.amount);
      this.amount = 0;
      this.modal = false;
      this.updateTable();
    } catch (err) {}
    this.loading = false;
  }
  @Emit()
  updateTable() {
    return true;
  }
}
</script>
