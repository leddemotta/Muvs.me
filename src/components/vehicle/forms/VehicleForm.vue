<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCurrencyInput } from "vue-currency-input";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import addressReusables from "../../address/reusables/addressReusables";
import vehicleReusables from "../reusables/vehicleReusables";
import reusableThings from "@/components/general/reusables/reusablesThings";

const { user } = useUserStore();
const { addresses, listAddresses } = addressReusables;
const { slugify } = reusableThings;
const { inputRef } = useCurrencyInput({ currency: "BRL" });
const {
  formRules,
  formRef,
  formState,
  vehicleTypes,
  maxWeights,
  colors,
  recommendationsList,
  vehicleBrands,
  status,
  theVehicle,
  createVehicle,
  vehicleDetails,
  updateVehicle,
} = vehicleReusables;

const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref("");

const { action } = defineProps({
  action: String,
});

const router = useRouter();

onMounted(() => {
  addresses.filters.userId = user._id;
  listAddresses();
  if (action === "edit") {
    vehicleDetails(router.currentRoute._value.params.id).then((data) => {
      console.log(data);
      formState.type = data.vehicle.type;
      formState.brand = data.vehicle.brand;
      formState.addressId = data.vehicle.addressId;
      formState.name = data.vehicle.name;
      formState.slug = data.vehicle.slug;
      formState.description = data.vehicle.description;
      formState.value = data.vehicle.value;
      formState.color = data.vehicle.color;
      formState.isElectric = data.vehicle.isElectric;
      formState.maxWeight = data.vehicle.maxWeight;
      formState.recommendation = data.vehicle.recommendation;
      formState.currency = data.vehicle.currency;
      formState.status = data.vehicle.status;
      imageUrl.value = data.vehicle.image;
    });
  } else {
    formState.type = "bicycle";
    formState.brand = "caloy";
    formState.name = "Bicicleta do Led";
    formState.slug = "bicicleta-do-led";
    formState.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    formState.value = "10,55";
    formState.color = "green";
    formState.maxWeight = "< 90kg";
    formState.recommendation = "+18";
  }
});

const onFinish = (values) => {
  console.log(values);
  values.userId = user._id;
  values.currency = "brl";
  values.image = imageUrl.value;

  if (action === "edit") {
    console.log(values, theVehicle.value._id);
    updateVehicle(theVehicle.value._id, values);
  } else {
    values.status = "active";
    values.image = imageUrl.value;
    values.value = parseFloat(values.value.replace(",", "."));
    createVehicle(values).then((data) => {
      message.success("Veículo cadastrado com sucesso!");
      router.push(`/vehicles/${data._id}/details`);
    });
  }
};

const onBlurNameField = (e) => {
  console.log(e.target.value);
  formState.slug = formState.slug ? formState.slug : slugify(e.target.value);
};

const handleChange = (info) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    console.log(info.file.response.url);
    imageUrl.value = info.file.response.url;
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
</script>

<template>
  <section>
    <a-form
      ref="formRef"
      :rules="formRules"
      :model="formState"
      @finish="onFinish"
    >
      <aRow :gutter="50">
        <aCol :span="8">
          <a-upload
            v-model:file-list="fileList"
            name="file"
            class="w-full"
            action="http://localhost:9000/s3/upload"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div
              class="w-full border-2 p-8 text-center border-slate-200 rounded-2xl"
              v-else
            >
              <img
                class="opacity-10"
                src="@/assets/images/vehicle/bike.png"
                alt="image"
                width="200"
              />
              <div class="text mt-6 font-semibold">Foto do veículo</div>
              <loading-outlined v-if="loading"></loading-outlined>
            </div>
          </a-upload>
        </aCol>

        <aCol :span="16">
          <aRow :gutter="20">
            <aCol :span="8">
              <a-form-item name="type">
                <label>O que você está alugando?</label>
                <aSelect
                  placeholder="Selecione"
                  v-model:value="formState.type"
                  :allowClear="true"
                  :showSearch="true"
                >
                  <a-select-option
                    v-for="(item, index) of vehicleTypes"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </aSelect>
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="brand">
                <label>Qual a marca?</label>
                <aSelect
                  placeholder="Selecione"
                  v-model:value="formState.brand"
                  :allowClear="true"
                  :showSearch="true"
                >
                  <a-select-option
                    v-for="(item, index) of vehicleBrands"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </aSelect>
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="name">
                <label>Título do anúncio</label>
                <a-input
                  v-model:value="formState.name"
                  placeholder="Sobrenome"
                  @blur="onBlurNameField"
                />
              </a-form-item>
            </aCol>

            <aCol :span="24">
              <a-form-item name="slug">
                <label>Link do anúncio</label>
                <a-input v-model:value="formState.slug" placeholder="Digite" />
              </a-form-item>
            </aCol>

            <aCol :span="24">
              <a-form-item name="description">
                <label>Fale um pouco sobre seu veículo</label>
                <aTextarea
                  :placeholder="'Escreva'"
                  :auto-size="{ minRows: 2, maxRows: 5 }"
                  v-model:value="formState.description"
                />
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="value">
                <label>Valor da diária</label>
                <a-input
                  ref="inputRef"
                  v-model:value="formState.value"
                  placeholder="Sobrenome"
                />
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="color">
                <label>Cor</label>
                <aSelect
                  placeholder="Selecione"
                  v-model:value="formState.color"
                  :allowClear="true"
                  :showSearch="true"
                >
                  <a-select-option
                    v-for="(item, index) of colors"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </aSelect>
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="maxWeight">
                <label>Peso máximo suportado</label>

                <aSelect
                  placeholder="Selecione"
                  v-model:value="formState.maxWeight"
                  :allowClear="true"
                  :showSearch="true"
                >
                  <a-select-option
                    v-for="(item, index) of maxWeights"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </aSelect>
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="recommendation">
                <label>Recomendação</label>
                <aSelect
                  placeholder="Selecione"
                  v-model:value="formState.recommendation"
                  :allowClear="true"
                  :showSearch="true"
                >
                  <a-select-option
                    v-for="(item, index) of recommendationsList"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </aSelect>
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="status">
                <label>Status</label>
                <aSelect
                  placeholder="Selecione"
                  v-model:value="formState.status"
                  :allowClear="true"
                  :showSearch="true"
                >
                  <a-select-option
                    v-for="(item, index) of status"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </aSelect>
              </a-form-item>
            </aCol>

            <aCol :span="8">
              <a-form-item name="isElectric" label="É elétrico?">
                <a-switch v-model:checked="formState.isElectric" />
              </a-form-item>
            </aCol>

            <aCol :span="24">
              <a-form-item name="addressId">
                <div class="label">
                  Selecione o endereço de retirada do veículo
                </div>

                <a-radio-group v-model:value="formState.addressId">
                  <div
                    class="mt-[10px]"
                    v-for="(
                      { _id, street, neighborhood, city }, index
                    ) in addresses.list"
                    :key="index"
                  >
                    <a-radio :value="_id"
                      >{{ street }}, {{ neighborhood }}, {{ city }}</a-radio
                    >
                  </div>
                </a-radio-group>
              </a-form-item>
            </aCol>
          </aRow>
        </aCol>
      </aRow>

      <div class="a-center">
        <a-divider class="mt-10" />
        <a-button type="primary" html-type="submit" :loading="isLoading">
          {{ action === "edit" ? "Atualizar" : "Cadastrar" }}
        </a-button>
      </div>
    </a-form>
  </section>
</template>

<style>
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
}
</style>
