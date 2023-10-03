<script setup>
import dayjs from "dayjs";
import { ref, onMounted, defineProps } from "vue";

// components
import UserAddressTab from "@/components/user/tabs/UserAddressTab.vue";
import UserSettingsTab from "@/components/user/tabs/UserSettingsTab.vue";

// reuse
import userReusables from "../reusables/userReusables";

const {
  formRules,
  updateUser,
  formRef,
  formState,
  isLoading,
  genders,
  roles,
  status,
} = userReusables;

const props = defineProps({
  user: Object,
  addresses: Array,
});

const emit = defineEmits(["onUpdateUser"]);

const activeKey = ref("settings");

onMounted(() => {
  formState.firstName = props.user.firstName;
  formState.lastName = props.user.lastName;
  formState.email = props.user.email;
  formState.idCard = props.user.idCard;
  formState.birthday = dayjs(props.user.birthday, "YYYY-MM-DD");
  formState.phone = props.user.phone;
  formState.gender = props.user.gender;
  formState.role = props.user.role;
  formState.status = props.user.status;
});

const onFinish = (values) => {
  console.log("Success:", values, formState);

  updateUser(props.user._id, formState);
};

const onChangeTab = (tab) => (activeKey.value = tab);
const onFinishFailed = (errorInfo) => console.log("Failed:", errorInfo);
</script>

<template>
  <aForm
    ref="formRef"
    :rules="formRules"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <aTabs @change="onChangeTab" :activeKey="activeKey">
      <aTabPane key="data" tab="Dados">
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
              <a-select
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
              <a-select
                placeholder="Selecione"
                v-model:value="formState.status"
              >
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

          <!-- <a-col class="mb-10" :span="24">
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
            ></a-col> -->
        </a-row>

        <div class="a-center">
          <a-divider class="mt-10" />
          <a-button type="primary" html-type="submit" :loading="isLoading">
            Atualizar
          </a-button>
        </div>
      </aTabPane>
      <aTabPane key="address" tab="Endereços">
        <UserAddressTab :userId="props.user._id" />
      </aTabPane>
      <aTabPane key="settings" tab="Configurações">
        <UserSettingsTab :userId="props.user._id" :user="props.user" :formState="formState" />
      </aTabPane>
    </aTabs>
  </aForm>
</template>
