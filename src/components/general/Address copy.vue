<script>
// import states from "@/json/states";
// import countries from "@/json/countries";
//import axios from "axios";

export default {
  name: "AddressData",
  props: {
    formState: Object,
    fieldSizes: Object,
    disabledCondition: Boolean,
  },
  //props: ["formState", "disabledCondition", "fieldSizes"],
  data() {
    return {
      states: [],
      countries: [],
    };
  },
  beforeMount() {},
  mounted() {
    console.log("AddressData fieldSizes", this.fieldSizes);

    if (this.fieldSizes == undefined) {
      this.fieldSizes = {
        zip_code: 12,
        street: 24,
        number: 8,
        complement: 16,
        neighborhood: 12,
        city: 12,
        state: 12,
        country: 12,
      };
    }
  },
  methods: {
    getLocation() {
      // setTimeout(() => {
      //     if (this.form.getFieldValue("zip_code")) {
      //         if (
      //             this.form.getFieldValue("zip_code").replace("-", "")
      //                 .length == 8
      //         ) {
      //             this.cepLoading = true;
      //             axios
      //                 .get(
      //                     "https://viacep.com.br/ws/" +
      //                         this.form.getFieldValue("zip_code") +
      //                         "/json/"
      //                 )
      //                 .then(({ data }) => {
      //                     data;
      //                     this.cepLoading = false;
      //                     let country = undefined;
      //                     this.states.forEach((state) => {
      //                         state.initials == data.uf
      //                             ? (country = "BRASIL")
      //                             : "";
      //                     });
      //                     setTimeout(() => {
      //                         this.form.setFieldsValue({
      //                             street: data.logradouro.toUpperCase(),
      //                             state: data.uf,
      //                             number: data.complemento,
      //                             city: data.localidade.toUpperCase(),
      //                             neighborhood: data.bairro.toUpperCase(),
      //                             country: country,
      //                         });
      //                     }, 20);
      //                 })
      //                 .catch(({ response }) => {
      //                     response;
      //                     this.$message.error(
      //                         "Houve um problema ao recuperar a localização."
      //                     );
      //                     this.cepLoading = false;
      //                 });
      //         }
      //     }
      // }, 110);
    },
  },
};
</script>

<template>
  <span>
    <a-col :span="fieldSizes.zipCode">
      <a-form-item name="zipCode">
        <label> CEP </label>
        <a-input
          placeholder="CEP"
          :disabled="disabledCondition"
          v-mask="'#####-###'"
          @change="getLocation()"
        >
        </a-input>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.street">
      <a-form-item>
        <label> Logradouro </label>
        <a-input
          :disabled="disabledCondition"
          placeholder="Logradouro"
          v-model:value="formState.street"
        >
        </a-input>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.number">
      <a-form-item>
        <label> Número </label>
        <a-input
          type="number"
          :disabled="disabledCondition"
          placeholder="Número"
          v-model:value="formState.number"
        >
        </a-input>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.complement">
      <a-form-item>
        <label> Complemento </label>
        <a-input
          placeholder="Complemento"
          :disabled="disabledCondition"
          v-model:value="formState.complement"
        >
        </a-input>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.neighborhood">
      <a-form-item>
        <label> Bairro </label>
        <a-input
          placeholder="Bairro"
          :disabled="disabledCondition"
          v-model:value="formState.neighborhood"
        >
        </a-input>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.city">
      <a-form-item>
        <label> Cidade </label>
        <a-input
          placeholder="Cidade"
          :disabled="disabledCondition"
          v-model:value="formState.city"
        >
        </a-input>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.state">
      <a-form-item>
        <label> Estado </label>
        <a-select
          show-search
          :disabled="disabledCondition"
          placeholder="ES"
          allowClear
          v-model:value="formState.state"
        >
          <a-select-option
            v-for="(item, index) of states"
            :key="index"
            :value="item.initials"
          >
            {{ item.initials.toUpperCase() }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <a-col :span="fieldSizes.country">
      <a-form-item>
        <label> País </label>
        <a-select
          show-search
          :disabled="disabledCondition"
          placeholder="País"
          optionFilterProp="txt"
          allowClear
          v-model:value="formState.country"
        >
          <a-select-option
            v-for="(item, index) of countries"
            :key="index"
            :value="item.Pais.toUpperCase()"
            :txt="item.Pais"
          >
            {{ item.Pais.toUpperCase() }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <div class="clearboth" />
  </span>
</template>
