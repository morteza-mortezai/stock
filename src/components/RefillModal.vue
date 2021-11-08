<template>
  <v-dialog v-model="modal" width="500">

    <v-card max-width="600px" v-if="product">
      <validation-observer ref="validator" v-slot="{ handleSubmit, reset }">
        <form @submit.prevent="handleSubmit(add)" @reset.prevent="reset">
          <v-card-title> Refill Products </v-card-title>
          <v-card-text>
            <h4>
              Product Name :
              {{ product.name }}
            </h4>
            <validation-provider
              v-slot="{ errors }"
              name="amount"
              :rules="`required|integer|min_value:1`"
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
            <v-btn type="submit" color="success" :loading="loading">add</v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop, Emit } from "vue-property-decorator";

import { IProduct } from "../models/product";
import { required, integer, min_value } from "vee-validate/dist/rules";
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
extend("min_value", {
  ...min_value,
  message: `amount must me more than one`,
});
import ser from "@/services/stock";
@Component({
  components: { ValidationObserver, ValidationProvider },
})
export default class AddModal extends Vue {
  @VModel() modal!: boolean;
  @Prop() product!: IProduct;

  amount: number = 0;
  loading: boolean = false;
  dialog = false;

  async add(): Promise<any> {
    this.loading = true;
    try {
      await ser.reFill(this.product.id, this.amount);
   ;
      this.modal = false;
     
      this.updateTable();
    } catch (err) {
     
    }
    this.loading = false;
  }

  @Emit()
  updateTable() {
    return true;
  }
}
</script>
