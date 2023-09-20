<script setup>
import { onMounted, defineEmits } from "vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

import UserService from "@/services/UserService";
import userReusables from "../reusables/userReusables";
import logReusables from "@/components/log/reusables/logReusables";
import { useUserStore } from "@/store/userStore";

const { createLog } = logReusables;
const { user } = useUserStore();
const { formRules, formRef, formState, isLoading, genders, roles, status } =
  userReusables;

const emit = defineEmits(["onCreateUser"]);

onMounted(() => {
  formState.firstName = "Ledilson";
  formState.lastName = "Motta";
  formState.email = "tesssssste@gmail.com";
  formState.idCard = "091.642.466-33";
  formState.birthday = dayjs("2023-07-26T00:01:20.082Z", "YYYY-MM-DD");
  formState.phone = "(31) 9 99139-5984";
  formState.gender = "male";
  formState.password = "123";
  formState.userPassword = "123";
  formState.role = "admin";
  formState.status = "active";
  formState.password = "123";
  formState.checkPassword = "123";
});

const create = async (payload) => {
  try {
    isLoading.value = true;
    const { data } = await UserService.create(payload);
    console.log(data);
    emit("onCreateUser");

    createLog({
      userId: user._id,
      moduleId: data._id,
      moduleName: "user",
      action: "create-user",
      content: `${user.firstName} ${user.lastName} criou um novo usuário ID (${data._id}).`,
    });

    message.success("Usuário criado!");
  } catch ({ response }) {
    message.error(response.data.error);
  } finally {
    isLoading.value = false;
  }
};

const onFinish = (values) => {
  console.log("Success:", values, formState);
  create(formState);
};

const onChangeTab = (tab) => {
  activeKey.value = tab;
};

const onFinishFailed = (errorInfo) => {
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
            <a-input v-model:value="formState.lastName" placeholder="Sobrenome">
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
                type="date"
                placeholder="__/__/____"
                format="DD/MM/YYYY"
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
            <a-select placeholder="Selecione" v-model:value="formState.gender">
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

        <a-col :span="8">
          <a-form-item name="role">
            <label>Função</label>
            <a-select placeholder="Selecione" v-model:value="formState.role">
              <a-select-option
                v-for="(item, index) of roles"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item name="status">
            <label>Status</label>
            <a-select placeholder="Selecione" v-model:value="formState.status">
              <a-select-option
                v-for="(item, index) of status"
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
          <a-form-item has-feedback name="password">
            <label>Senha</label>
            <a-input-password
              v-model:value="formState.password"
              type="password"
              placeholder="Repita a senha"
              autocomplete="off"
            >
            </a-input-password>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item has-feedback name="checkPassword">
            <label>Repita a senha</label>
            <a-input-password
              v-model:value="formState.checkPassword"
              type="password"
              placeholder="Insira a senha"
              autocomplete="off"
            >
            </a-input-password></a-form-item
        ></a-col>
      </a-row>

      <div class="a-center">
        <a-divider class="mt-10" />
        <a-button type="primary" html-type="submit" :loading="isLoading">
          Cadastrar
        </a-button>
      </div>
    </a-form>
  </div>
</template>
