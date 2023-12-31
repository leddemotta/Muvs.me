<script setup>
// import states from "@/json/states";
// import countries from "@/json/countries";

import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  formState: Object,
  fieldSizes: Object,
  disabledCondition: Boolean,
});

const states = reactive([
  { initials: "Masculino", initials: "male" },
  { initials: "Feminino", initials: "female" },
]);

const countries = reactive([{ Pais: "Masculino", Pais: "male" }]);

const cepLoading = ref(false);

const getLocation = () => {
  setTimeout(() => {
    if (props.address.zipCode) {
      if (props.address.zipCode.replace("-", "").length == 8) {
        cepLoading.value = true;
        axios
          .get(
            `https://viacep.com.br/ws/${props.address.zipCode.replace(
              "-",
              ""
            )}/json/`
          )
          .then(({ data }) => {
            cepLoading.value = false;
            let country = "Brasil";
            states.forEach((state) => {
              state.initials == data.uf ? (country = "Brasil") : "";
            });
            setTimeout(() => {
              props.address.street = data.logradouro;
              props.address.complement = data.complemento;
              props.address.neighborhood = data.bairro;
              props.address.city = data.localidade;
              props.address.state = data.uf;
              props.address.country = country;
            }, 20);
          })
          .catch(({ response }) => {
            response;
            this.$message.error(
              "Houve um problema ao recuperar a localização."
            );
            this.cepLoading = false;
          });
      }
    }
  }, 110);
};

onMounted(() => {
  // props.formState.address.zipCode = "35400000";
  // props.formState.address.street = "Rua José Mendes";
  // props.formState.address.number = "176";
  // props.formState.address.complement = "Casa 2° andar";
  // props.formState.address.neighborhood = "Saramenha";
  // props.formState.address.city = "Ouro Preto";
  // props.formState.address.state = "Minas Gerais";
  // props.formState.address.country = "Brasil";
});
</script>

<template>
  <span>
    <a-row :gutter="20">
      <a-col :span="fieldSizes.zipCode">
        <a-form-item name="zipCode">
          <label> CEP </label>
          <a-input
            placeholder="CEP"
            v-mask="'#####-###'"
            :disabled="disabledCondition"
            @blur="getLocation"
            v-model:value="formState.address.zipCode"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.street">
        <a-form-item name="street">
          <label> Logradouro </label>
          <a-input
            :disabled="disabledCondition"
            placeholder="Logradouro"
            v-model:value="formState.address.street"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.number">
        <a-form-item name="number">
          <label> Número </label>
          <a-input
            type="number"
            :disabled="disabledCondition"
            placeholder="Número"
            v-model:value="formState.address.number"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.complement">
        <a-form-item name="complement">
          <label> Complemento </label>
          <a-input
            placeholder="Complemento"
            :disabled="disabledCondition"
            v-model:value="formState.address.complement"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.neighborhood">
        <a-form-item name="neighborhood">
          <label> Bairro </label>
          <a-input
            placeholder="Bairro"
            :disabled="disabledCondition"
            v-model:value="formState.address.neighborhood"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.city">
        <a-form-item name="city">
          <label> Cidade </label>
          <a-input
            placeholder="Cidade"
            :disabled="disabledCondition"
            v-model:value="formState.address.city"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.state">
        <a-form-item name="state">
          <label> Estado </label>
          <a-select
            show-search
            :disabled="disabledCondition"
            placeholder="ES"
            allowClear
            v-model:value="formState.address.state"
          >
            <a-select-option
              v-for="(item, index) of states"
              :key="index"
              :value="item.initials"
            >
              {{ item.initials }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.country">
        <a-form-item name="country">
          <label> País </label>
          <a-select
            show-search
            :disabled="disabledCondition"
            placeholder="País"
            optionFilterProp="txt"
            allowClear
            v-model:value="formState.address.country"
          >
            <a-select-option
              v-for="(item, index) of countries"
              :key="index"
              :value="item.Pais"
              :txt="item.Pais"
            >
              {{ item.Pais }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </span>
</template>
