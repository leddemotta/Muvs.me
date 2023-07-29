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
    if (props.formState.zipCode) {
      if (props.formState.zipCode.replace("-", "").length == 8) {
        cepLoading.value = true;
        axios
          .get(
            `https://viacep.com.br/ws/${props.formState.zipCode.replace(
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
              props.formState.street = data.logradouro;
              props.formState.complement = data.complemento;
              props.formState.neighborhood = data.bairro;
              props.formState.city = data.localidade;
              props.formState.state = data.uf;
              props.formState.country = country;
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
  props.formState.zipCode = "35400000";
  props.formState.street = "Rua José Mendes";
  props.formState.number = "176";
  props.formState.complement = "Casa 2° andar";
  props.formState.neighborhood = "Saramenha";
  props.formState.city = "Ouro Preto";
  props.formState.state = "Minas Gerais";
  props.formState.country = "Brasil";
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
            :disabled="disabledCondition"
            v-mask="'#####-###'"
            @blur="getLocation"
            v-model:value="formState.zipCode"
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
            v-model:value="formState.street"
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
            v-model:value="formState.number"
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
            v-model:value="formState.complement"
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
            v-model:value="formState.neighborhood"
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
            v-model:value="formState.city"
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
            v-model:value="formState.state"
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
            v-model:value="formState.country"
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
