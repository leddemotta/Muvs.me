<script setup>
import axios from "axios";
import { reactive, ref, onMounted, defineProps } from "vue";
import AddressService from "@/services/AddressService";
import { message } from "ant-design-vue";

const props = defineProps({
  address: Object,
  fieldSizes: Object,
  disabledCondition: Boolean,
});

const states = reactive([
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
]);

const countries = reactive([
  {
    label: "Brasil",
    value: "Brasil",
  },
]);

const status = reactive([
  {
    label: "Ativo",
    value: "active",
  },
  {
    label: "Desativado",
    value: "disabled",
  },
]);

const isLoading = ref(false);

const formState = reactive({});

const formRules = reactive({
  zipCode: [
    {
      required: true,
      message: "Insira o CEP",
    },
  ],
});

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

const update = async (payload) => {
  try {
    isLoading.value = true;
    const { data } = await AddressService.update(props.address._id, payload);
    console.log(data);
    message.success("Endereço atualizado com sucesso!");
  } catch (error) {
    message.error(error.response.data.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    console.log(props.address);
    formState.zipCode = props.address.zipCode;
    formState.street = props.address.street;
    formState.number = props.address.number;
    formState.complement = props.address.complement;
    formState.neighborhood = props.address.neighborhood;
    formState.city = props.address.city;
    formState.state = props.address.state;
    formState.country = props.address.country;
    formState.isHome = props.address.isHome;
    formState.status = props.address.status;
  }, 100);
});

const onFinish = (values) => {
  console.log("Success:", values);

  //values.isHome = props.address.isHome;
  // values.status = props.address.status;
  values.userId = props.address.userId;
  update(values);
};

const onFinishFailed = (errorInfo) => {
  //message.error(errorInfo);
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <span>
    <a-form
      ref="formRef"
      :rules="formRules"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter="20">
        <a-col :span="fieldSizes.zipCode">
          <a-form-item name="zipCode">
            <label> CEP </label>
            <a-input
              placeholder="CEP"
              v-mask="'#####-###'"
              :disabled="disabledCondition"
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
              placeholder="Selecione"
              v-model:value="formState.state"
            >
              <a-select-option
                v-for="(item, index) of states"
                :key="index"
                :value="item.label"
              >
                {{ item.label }}
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
              v-model:value="formState.country"
            >
              <a-select-option
                v-for="(item, index) of countries"
                :key="index"
                :value="item.value"
                :txt="item.label"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.status">
          <a-form-item name="status">
            <label> Status </label>
            <a-select
              placeholder="Selecione"
              optionFilterProp="txt"
              style="width: 100%"
              :disabled="disabledCondition"
              v-model:value="formState.status"
            >
              <a-select-option
                v-for="(item, index) of status"
                :key="index"
                :value="item.value"
                :txt="item.label"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.country">
          <a-form-item class="mt-20" name="isHome" label="É sua casa?">
            <a-switch v-model:checked="formState.isHome" />
          </a-form-item>
        </a-col>
      </a-row>

      <div class="a-center">
        <a-divider class="mt-10" />
        <a-button type="primary" html-type="submit" :loading="isLoading">
          Atualizar
        </a-button>
      </div>
    </a-form>
  </span>
</template>
