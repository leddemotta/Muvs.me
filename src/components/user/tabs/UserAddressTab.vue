<script setup>
import { onMounted, ref, defineProps } from "vue";
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";

import UserEditAddressModal from "../modals/UserEditAddressModal.vue";
import UserCreateAddressModal from "../modals/UserCreateAddressModal.vue";
import addressReusables from "../../address/reusables/addressReusables";

const { addresses, listAddresses, deleteAddress } = addressReusables;

const props = defineProps({
  userId: String,
});

const openCreateAddressModal = ref(false);
const openEditAddressModal = ref(false);
const addressId = ref("");

const onClickOpenEditAddressModal = (id) => {
  openEditAddressModal.value = true;
  addressId.value = id;
};

const onCreateAddress = () => {
  openCreateAddressModal.value = false;
  listAddresses();
};

const onCloseEditAddressModal = () => {
  addressId.value = "";
  openEditAddressModal.value = false;
  listAddresses();
};

onMounted(() => {
  addresses.filters.userId = props.userId;
  listAddresses();
});
</script>

<template>
  <div v-if="addresses.list.length">
    <aList
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
                {{ item.street }}, {{ item.number }}, {{ item.neighborhood }} -
                {{ item.zipCode }}
              </div>
              <div class="complement" v-if="item.complement">
                {{ item.complement }}
              </div>
            </template>
            <template #avatar>
              <environment-outlined class="pin" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </aList>
  </div>

  <div class="a-center" v-if="addresses.list.length == 0">
    <img
      class="mt-20"
      src="@/assets/images/profile/address-girl.png"
      width="300"
    />
    <a-result
      class="pd-0"
      status=""
      title=""
      sub-title="Nenhum endereço cadastrado."
    >
      <template #extra>
        <a-button @click="openCreateAddressModal = true" class="f12">
          Cadastrar endereço
        </a-button>
      </template>
    </a-result>
  </div>

  <aModal
    v-model:open="openCreateAddressModal"
    destroyOnClose
    :footer="false"
    @ok="openCreateAddressModal = false"
  >
    <template #title>Cadastrar endereço</template>
    <UserCreateAddressModal
      v-if="openCreateAddressModal"
      :userId="userId"
      @onCreateAddress="onCreateAddress"
    />
  </aModal>

  <aModal
    v-model:open="openEditAddressModal"
    destroyOnClose
    :footer="false"
    @cancel="onCloseEditAddressModal"
  >
    <template #title>Editar endereço</template>
    <UserEditAddressModal v-if="openEditAddressModal" :addressId="addressId" />
  </aModal>
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
  .complement
    color: #aaa
    font-size: 12px
  h4
    margin: 0
    padding: 0
</style>