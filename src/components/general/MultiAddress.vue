<script setup>
// import states from "@/json/states";
// import countries from "@/json/countries";

import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  fieldSizes: Object,
  disabledCondition: Boolean,
  address: Object,
  index: Number,
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
  props.address.zipCode = "35400000";
  props.address.street = "Rua José Mendes";
  props.address.number = "176";
  props.address.complement = "Casa 2° andar";
  props.address.neighborhood = "Saramenha";
  props.address.city = "Ouro Preto";
  props.address.state = "Minas Gerais";
  props.address.country = "Brasil";
});
</script>

<template>
  <span>
    <a-row :gutter="20">
      <a-col :span="fieldSizes.zipCode">
        <a-form-item
          :name="['address', props.index, 'zipCode']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> CEP </label>
          <a-input
            placeholder="CEP"
            v-mask="'#####-###'"
            :disabled="disabledCondition"
            @blur="getLocation"
            v-model:value="address.zipCode"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.street">
        <a-form-item
          :name="['address', props.index, 'street']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> Logradouro </label>
          <a-input
            :disabled="disabledCondition"
            placeholder="Logradouro"
            v-model:value="address.street"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.number">
        <a-form-item
          :name="['address', props.index, 'number']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> Número </label>
          <a-input
            type="number"
            :disabled="disabledCondition"
            placeholder="Número"
            v-model:value="address.number"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.complement">
        <a-form-item
          :name="['address', props.index, 'complement']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> Complemento </label>
          <a-input
            placeholder="Complemento"
            :disabled="disabledCondition"
            v-model:value="address.complement"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.neighborhood">
        <a-form-item
          :name="['address', props.index, 'neighborhood']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> Bairro </label>
          <a-input
            placeholder="Bairro"
            :disabled="disabledCondition"
            v-model:value="address.neighborhood"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.city">
        <a-form-item
          :name="['address', props.index, 'city']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> Cidade </label>
          <a-input
            placeholder="Cidade"
            :disabled="disabledCondition"
            v-model:value="address.city"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="fieldSizes.state">
        <a-form-item
          :name="['address', props.index, 'state']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> Estado </label>
          <a-select
            show-search
            :disabled="disabledCondition"
            placeholder="ES"
            allowClear
            v-model:value="address.state"
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

      <a-col :span="address.country">
        <a-form-item
          :name="['address', props.index, 'country']"
          :rules="{
            required: true,
            message: 'Insira o seu CEP',
          }"
        >
          <label> País </label>
          <a-select
            show-search
            :disabled="disabledCondition"
            placeholder="País"
            optionFilterProp="txt"
            allowClear
            v-model:value="address.country"
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
