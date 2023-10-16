<script setup>
import { onMounted, ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService";
import VehiclesGrid from "../../components/vehicle/list/VehiclesGrid.vue";

// reuse
import userReusables from "@/components/user/reusables/userReusables";
import { useUserStore } from "../../store/userStore";

const router = useRouter();

const { states } = userReusables;

const userStore = useUserStore();

const state = ref();

const details = async (payload) => {
  try {
    const { data } = await AuthService.details(payload);
    userStore.setUser(JSON.stringify(data.user));
    userStore.checkSessionStorage();
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(() => {
  details(userStore.userId);
});
</script>

<template>
  <section>
    <aRow class="bg-white p-5 border-b border-gray-200" justify="space-between">
      <aCol>
        <a-auto-complete
          v-model:value="value"
          :options="options"
          style="width: 400px"
          placeholder="Bicicleta, skate, patinete..."
          @select="onSelect"
          @search="onSearch"
        />
        <a-select
          show-search
          :disabled="disabledCondition"
          placeholder="Selecione"
          v-model:value="state"
          style="width: 200px"
        >
          <a-select-option
            v-for="(item, index) of states"
            :key="index"
            :value="item.label"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>

        <a-button class="ml-5"><SearchOutlined /></a-button>
      </aCol>

      <aCol
        >Olá {{ userStore.user.firstName }}, seja bem-vindo!

        <a-button
          class="ml-5"
          type="primary"
          @click="router.push('/vehicles/new')"
          >Anunciar</a-button
        >
      </aCol>
    </aRow>

    <div class="p-4">
      <VehiclesGrid />
    </div>
  </section>
</template>
