<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import Address from "@/components/general/Address.vue";
import AuthService from "@/services/AuthService";

const router = useRouter();

const props = defineProps({
  user: Object,
});

const formState = reactive({
  address: {},
});

const formRules = reactive({
  firstName: [
    {
      required: true,
      message: "Insira o seu nome",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Insira o seu sobrenome",
    },
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "Insira o seu e-mail",
    },
  ],
});

const isLoading = ref(false);
const activeKey = ref("data");

const genders = reactive([
  { label: "Masculino", value: "male" },
  { label: "Feminino", value: "female" },
  { label: "Outrxs", value: "other" },
]);

const compareToFirstPassword = (rule, value, callback) => {
  console.log("compareToFirstPassword", value, "call", callback);
};

onMounted(() => {
  formState.firstName = props.user.firstName;
  formState.lastName = props.user.lastName;
  formState.email = props.user.email;
  formState.idCard = props.user.idCard;
  formState.birthday = props.user.birthday;
  formState.phone = props.user.phone;
  formState.gender = props.user.gender;
});

const register = async (payload) => {
  try {
    isLoading.value = true;
    const { data } = await AuthService.register(payload);
    message.success("Cadastro realizado com sucesso!");
    setTimeout(() => {
      router.push("/login");
    }, 600);
  } catch (error) {
    message.error(error.response.data.message);
  } finally {
    isLoading.value = false;
  }
};

const onFinish = (values) => {
  //console.log("Success:", values, formState.firstName);
  register(formState);
};

const onFinishFailed = (errorInfo) => {
  //message.error(errorInfo);
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div>
    <a-form
      ref="formRef"
      :rules="formRules"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      {{ activeKey }}
      <a-tabs :activeKey="activeKey">
        <a-tab-pane key="data" tab="Dados">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item name="firstName">
                <label>Nome</label>
                <a-input
                  v-model:value="formState.firstName"
                  placeholder="Primeiro nome"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item name="lastName">
                <label>Sobrenome</label>
                <a-input
                  v-model:value="formState.lastName"
                  placeholder="Sobrenome"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item name="email">
                <label>E-mail</label>
                <a-input
                  autoComplete="off"
                  v-model:value="formState.email"
                  placeholder="Seu melhor E-mail"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item name="idCard">
                <label>CPF</label>
                <a-input
                  v-mask="'###.###.###-##'"
                  v-model:value="formState.idCard"
                  placeholder=""
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item name="birthday">
                <label>Nascimento</label>

                <div>
                  <a-date-picker
                    placeholder="__/__/____"
                    format="DD/MM/YYYY"
                    v-mask="'##/##/####'"
                    :showToday="false"
                    v-model:value="formState.birthday"
                  >
                  </a-date-picker>
                </div>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item name="phone">
                <label>Celular</label>
                <a-input
                  v-mask="'(##) # ####-####'"
                  v-model:value="formState.phone"
                  placeholder="DDD + Número"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item name="gender">
                <label>Sexo</label>
                <a-select
                  show-search
                  placeholder="Selecione"
                  v-model:value="formState.gender"
                >
                  <a-select-option
                    v-for="(item, index) of genders"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col class="mb-10" :span="24">
              <a-alert type="info" banner>
                <template #message>
                  <div class="f12">
                    A senha deve conter no <b>mínimo 6 caracteres</b>, e também
                    <b>números e letras</b>:
                  </div></template
                >
              </a-alert>
            </a-col>
            <a-col :span="12">
              <a-form-item name="userPassword">
                <label>Senha</label>
                <a-input-password
                  v-model:value="formState.userPassword"
                  type="password"
                  placeholder="Insira a senha"
                >
                </a-input-password></a-form-item
            ></a-col>

            <a-col :span="12">
              <a-form-item name="password">
                <label>Repita a senha</label>
                <a-input-password
                  v-model:value="formState.password"
                  type="password"
                  placeholder="Repita a senha"
                >
                </a-input-password>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="address" tab="Endereços">
          <a-row class="a-left mt-20" :gutter="20">
            <a-col v-if="formState" span="24">
              <!-- <Address
                :formState="formState"
                :disabledCondition="false"
                :fieldSizes="{
                  zipCode: 12,
                  street: 24,
                  number: 8,
                  complement: 16,
                  neighborhood: 12,
                  city: 12,
                  state: 12,
                  country: 12,
                }"
              /> -->
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
      <div class="a-center mt-10">
        <a-divider />
        <a-button
          class="bolder"
          type="primary"
          size="large"
          html-type="submit"
          :loading="isLoading"
        >
          Atualizar
        </a-button>
      </div>
    </a-form>
  </div>
</template>
