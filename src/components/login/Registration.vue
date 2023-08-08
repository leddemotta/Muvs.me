<script setup>
import { reactive, ref, onMounted } from "vue";
import Address from "../general/Address.vue";
import AuthService from "@/services/AuthService";
import { useRouter } from "vue-router";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const router = useRouter();

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
const currentStep = ref(0);
const steps = reactive([
  { title: "", status: "process" },
  { title: "", status: "wait" },
  { title: "", status: "wait" },
]);

const stepStyle = reactive({
  paddingTop: "0px",
  marginBottom: "0px",
  boxShadow: "0px -1px 0 0 #e8e8e8 inset",
});

const genders = reactive([
  { label: "Masculino", value: "male" },
  { label: "Feminino", value: "female" },
  { label: "Outrxs", value: "other" },
]);

const secondStep = () => {
  currentStep.value = 1;
};

const lastStep = () => {
  currentStep.value = 2;
};

const validateFirstStep = () => {
  let flag = true;

  if (
    formState.firstName &&
    formState.lastName &&
    formState.email &&
    formState.idCard &&
    formState.birthday &&
    formState.phone &&
    formState.gender
  )
    flag = false;

  return flag;
};

const validateSecondStep = () => {
  let flag = true;

  if (
    formState.address.zipCode &&
    formState.address.street &&
    formState.address.number &&
    formState.address.complement &&
    formState.address.neighborhood &&
    formState.address.city &&
    formState.address.state &&
    formState.address.country
  )
    flag = false;

  return flag;
};

const validateLastStep = () => {
  let flag = true;

  if (
    formState.password &&
    formState.userPassword &&
    formState.password === formState.userPassword
  )
    flag = false;

  return flag;
};

const compareToFirstPassword = (rule, value, callback) => {
  console.log("compareToFirstPassword", value, "call", callback);
};

onMounted(() => {
  // formState.firstName = "Ledilson";
  // formState.lastName = "Motta";
  // formState.email = "ledde.motta65@gmail.com";
  // formState.idCard = "091.642.466-99";
  // //formState.birthday = "2023-07-26T00:01:20.082Z";
  // formState.phone = "(31) 9 99139-5984";
  // formState.gender = "male";
  // formState.password = "Masculino";
  // formState.userPassword = "Masculino";
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
      <a-row>
        <a-col v-if="currentStep === 0" class="mb-20" :span="24">
          <a @click="$router.go(-1)"> <ArrowLeftOutlined /> Voltar </a>
        </a-col>

        <a-col :span="24">
          <a-steps
            v-model:current="currentStep"
            size="small"
            type="navigation"
            :style="stepStyle"
          >
            <a-step
              v-for="(step, index) in steps"
              :key="index"
              :title="step.title"
              :disabled="true"
            />
          </a-steps>
        </a-col>
      </a-row>

      <a-row v-if="currentStep == 0" class="a-left mt-20" :gutter="20">
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

        <a-col :span="24">
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

        <a-col :span="12">
          <a-form-item name="birthday">
            <label>Nascimento</label>

            <a-date-picker
              placeholder="__/__/____"
              format="DD/MM/YYYY"
              v-mask="'##/##/####'"
              :showToday="false"
              v-model:value="formState.birthday"
            >
            </a-date-picker>
          </a-form-item>
        </a-col>

        <a-col :span="12">
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

        <a-col :span="12">
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

        <a-col class="mt-10" span="24">
          <a-button
            class="bolder w100"
            type="primary"
            size="large"
            @click="secondStep"
            :disabled="validateFirstStep()"
          >
            Próximo <ArrowRightOutlined />
          </a-button>
        </a-col>
      </a-row>

      <a-row v-if="currentStep === 1" class="a-left mt-20" :gutter="20">
        <a-col v-if="formState" span="24">
          <Address
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
          />
        </a-col>

        <a-col class="mt-10" span="6">
          <a-button
            class="bolder w100"
            type="primary"
            size="large"
            @click="currentStep = 0"
            ghost
          >
            <ArrowLeftOutlined />
          </a-button>
        </a-col>

        <a-col class="mt-10" span="18">
          <a-button
            class="bolder w100"
            type="primary"
            size="large"
            @click="lastStep"
            :disabled="validateSecondStep()"
          >
            Próximo <ArrowRightOutlined />
          </a-button>
        </a-col>
      </a-row>

      <a-row v-if="currentStep === 2" class="a-left mt-20" :gutter="20">
        <a-col :span="24">
          <p>
            A senha deve conter no <b>mínimo 6 caracteres</b>, e também
            <b>números e letras</b>:
          </p>
        </a-col>
        <a-col :span="24">
          <a-form-item name="userPassword">
            <label>Senha</label>
            <a-input-password
              v-model:value="formState.userPassword"
              type="password"
              placeholder="Insira a senha"
              @change="validateLastStep()"
            >
            </a-input-password></a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item name="password">
            <label>Repita a senha</label>
            <a-input-password
              v-model:value="formState.password"
              type="password"
              placeholder="Repita a senha"
              @change="validateLastStep()"
            >
            </a-input-password>
          </a-form-item>
        </a-col>

        <a-col class="mt-10" span="6">
          <a-button
            class="bolder w100"
            type="primary"
            size="large"
            @click="currentStep = 1"
            ghost
          >
            <ArrowLeftOutlined />
          </a-button>
        </a-col>

        <a-col class="mt-10" span="18">
          <a-button
            class="bolder w100"
            type="primary"
            size="large"
            html-type="submit"
            :loading="isLoading"
            :disabled="
              !validateFirstStep() &&
              !validateSecondStep() &&
              !validateLastStep()
                ? false
                : true
            "
          >
            Cadastrar-se
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
