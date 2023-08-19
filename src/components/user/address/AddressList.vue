<script setup>
import AddressService from "@/services/AddressService";
import UserEditAddressModal from "../modals/UserEditAddressModal.vue";
import UserCreateAddressModal from "../modals/UserCreateAddressModal.vue";
import { onMounted, reactive, ref } from "vue";
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  userId: String,
});

const addresses = reactive({
  list: [],
  loading: false,
  filters: {
    status: "active",
  },
  pagination: {
    page: 0,
    limit: 8,
    total: 0,
  },
});

const openEditAddressModal = ref(false);
const addressId = ref("");
const openCreateAddressModal = ref(false);

const list = async (payload) => {
  try {
    const response = await AddressService.list(payload);
    addresses.pagination.total = response.data.pagination.total;
    return response.data.addresses;
  } catch (error) {
    return [];
  }
};

const deleteAddress = async (payload) => {
  try {
    const { data } = await AddressService.delete(payload);
    data;
  } catch (error) {
    console.log(error.message);
  }
};

const onCreateAddres = () => {
  openCreateAddressModal.value = false;
  list(
    `?page=${addresses.pagination.page}&limit=${addresses.pagination.limit}&userId=${props.userId}`
  );
};

const onClickOpenEditAddressModal = (id) => {
  openEditAddressModal.value = true;
  addressId.value = id;
};

// const deleteAddress = (id) => {
//   id;
// };

onMounted(async () => {
  try {
    addresses.loading = true;
    addresses.list = await list(
      `?page=${addresses.pagination.page}&limit=${addresses.pagination.limit}&userId=${props.userId}`
    );
    addresses.loading = false;
  } catch (error) {
    // Handle error if needed
  }
});
</script>

<template>
  <div>
    <div v-if="addresses.list.length">
      <a-list
        class="address-list"
        :loading="addresses.loading"
        item-layout="horizontal"
        :data-source="addresses.list"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <edit-outlined @click="onClickOpenEditAddressModal(item._id)" />
              <a-popconfirm
                title="Apagar endereço?"
                placement="left"
                ok-text="Sim"
                cancel-text="Não"
                @confirm="deleteAddress(item._id)"
              >
                <delete-outlined />
              </a-popconfirm>
            </template>

            <a-list-item-meta>
              <template #description>
                <div class="city">{{ item.city }}, {{ item.state }}</div>
                <div class="street">
                  {{ item.street }}, {{ item.number }},
                  {{ item.neighborhood }} -
                  {{ item.zipCode }}
                </div>
              </template>
              <template #avatar>
                <environment-outlined class="pin" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="mt-20 a-center">
      <a-button @click="openCreateAddressModal = true" class="f12">
        Cadastrar endereço
      </a-button>
    </div>

    <a-modal
      v-model:open="openEditAddressModal"
      :footer="false"
      @ok="openEditAddressModal = false"
    >
      <template #title>Editar endereço</template>
      <UserEditAddressModal
        v-if="openEditAddressModal"
        :addressId="addressId"
      />
    </a-modal>

    <a-modal
      v-model:open="openCreateAddressModal"
      :footer="false"
      @ok="openCreateAddressModal = false"
    >
      <template #title>Cadastrar endereço</template>
      <UserCreateAddressModal
        v-if="openCreateAddressModal"
        :userId="userId"
        @onCreateAddres="onCreateAddres"
      />
    </a-modal>
  </div>
</template>

<style lang="sass" scoped>
.address-list
  .pin
    font-size: 20px
    color: #ddd
  .ant-list-item
   padding: 12px 0
   .city
    color: #333
    font-weight: 600
  .street
    color: #aaa
    font-size: 12px
  h4
    margin: 0
    padding: 0
</style>
