<script setup>
import { reactive, ref, onMounted } from "vue";
import Address from "../general/Address.vue";

let formState = reactive({
  //   firstName: "",
  //   lastName: "",
  //   email:  "",
  //   idCard: "",
  //   birthday: "",
  //   phone:  "",
  //   gender:  "",
  //   zipCode:  "",
  //   password: "",
  //   userPassword: "",
  //   city:  "",
  //   country: "",
  //   neighborhood:  "",
  //   complement:  "",
  //   number:  "",
  //   state:  "",
  //   street:  "",
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

  //   if (
  //     this.form.getFieldValue(`first_name`) &&
  //     this.form.getFieldValue(`last_name`) &&
  //     this.form.getFieldValue(`email`) &&
  //     this.form.getFieldValue(`cpf`) &&
  //     this.form.getFieldValue(`birthday`) &&
  //     this.form.getFieldValue(`phone`) &&
  //     this.form.getFieldValue(`gender`)
  //   ) {
  //     flag = false;
  //     this.steps[0].status = "finish";
  //   } else {
  //     this.steps[0].status = "process";
  //   }

  return flag;
};

const validateSecondStep = () => {
  let flag = true;
  //   if (
  //     this.form.getFieldValue(`city`) &&
  //     this.form.getFieldValue(`country`) &&
  //     this.form.getFieldValue(`neighborhood`) &&
  //     this.form.getFieldValue(`number`) &&
  //     this.form.getFieldValue(`state`) &&
  //     this.form.getFieldValue(`street`) &&
  //     this.form.getFieldValue(`zip_code`)
  //   ) {
  //     flag = false;
  //     this.steps[1].status = "finish";
  //   } else {
  //     this.steps[1].status = "process";
  //   }

  return flag;
};

const validateLastStep = () => {
  let flag = true;
  // setTimeout(() => {
  //   if (
  //     this.form.getFieldValue(`password`) &&
  //     this.form.getFieldValue(`userPassword`) &&
  //     this.form.getFieldValue(`userPassword`) ===
  //       this.form.getFieldValue(`password`)
  //   ) {
  //     flag = false;
  //     this.steps[2].status = "finish";
  //   } else {
  //     this.steps[2].status = "process";
  //   }
  // }, 100);

  return flag;
};

const compareToFirstPassword = (rule, value, callback) => {
  console.log("compareToFirstPassword", value, "call", callback);
  //   if (value && value !== this.form.getFieldValue("userPassword")) {
  //     callback("As senhas digitadas não são iguais.");
  //   } else {
  //     callback();
  //   }
};

onMounted(() => {
  console.log("montado");
});

//mounted() {
// this.form.setFieldsValue({
//     birthday: "1990-09-18",
//     city: "Ouro Preto",
//     complement: "Casa 2° andar",
//     country: "Brasil",
//     cpf: "091.642.466-98",
//     email: "ledde.motta@gmail.com",
//     first_name: "Ledilson",
//     gender: "Masculino",
//     last_name: "Motta",
//     neighborhood: "Saramenha",
//     number: "176",
//     phone: "(31) 9 99139-5984",
//     state: "MG",
//     street: "Rua José Mendes",
//     zip_code: "35400-000",
// });
//},
</script>

<template>
  <div>
    <a-form
      ref="formRef"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      {{ formState }}
      <a-row>
        <a-col v-if="currentStep == 0" class="mb-20" :span="24">
          <a @click="$router.go(-1)">Voltar </a>
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
              :status="step.status"
              :title="step.title"
            />
          </a-steps>
        </a-col>
      </a-row>

      <a-row v-show="currentStep == 0" class="a-left mt-20" :gutter="20">
        <a-col :span="12">
          <a-form-item>
            <label>Nome</label>
            <a-input
              v-model:value="formState.firstName"
              placeholder="Primeiro nome"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item>
            <label>Sobrenome</label>
            <a-input v-model:value="formState.lastName" placeholder="Sobrenome">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :rules="[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]"
          >
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
          <a-form-item>
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
          <a-form-item>
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
          <a-form-item>
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
          <a-form-item>
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
            Próximo
          </a-button>
        </a-col>
      </a-row>

      <a-row v-show="currentStep == 1" class="a-left mt-20" :gutter="20">
        <Address
          :formState="formState"
          :disabledCondition="false"
          :fieldSizes="{
            zip_code: 12,
            street: 24,
            number: 8,
            complement: 16,
            neighborhood: 12,
            city: 12,
            state: 12,
            country: 12,
          }"
        />

        <a-col class="mt-10" span="6">
          <a-button
            class="bolder w100"
            type="primary"
            size="large"
            @click="currentStep = 0"
            ghost
          >
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
            Próximo <a-icon type="arrow-right" />
          </a-button>
        </a-col>
      </a-row>

      <a-row v-show="currentStep == 2" class="a-left mt-20" :gutter="20">
        <a-col :span="24">
          <p>
            A senha deve conter no <b>mínimo 6 caracteres</b>, e também
            <b>números e letras</b>:
          </p>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <label>Senha</label>
            <a-input-password
              v-decorator="[
                'userPassword',
                {
                  rules: [
                    {
                      min: 6,
                      message: 'A senha deve conter mais de 6 caracteres.',
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="Insira a senha"
              @change="validateLastStep()"
            >
            </a-input-password></a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item>
            <label>Repita a senha</label>
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      min: 6,
                      message: 'A senha deve conter mais de 6 caracteres.',
                    },
                    {
                      required: true,
                      message: 'Repita a senha.',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="Repita a senha"
              @change="validateLastStep()"
            >
            </a-input-password>
          </a-form-item>
        </a-col>

        <a-col class="mt-10" :span="24">
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
