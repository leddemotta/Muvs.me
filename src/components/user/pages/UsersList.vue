<script setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  EditOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

import userReusables from "../reusables/userReusables";

const { onClickDeleteUser, onChangePagination, listUsers, users, columns } =
  userReusables;

import UserEditDrawer from "@/components/user/drawers/UserEditDrawer.vue";
import PageHeader from "@/components/general/PageHeader.vue";
import CreateUserForm from "@/components/user/forms/CreateUserForm.vue";

const openEditUserDrawer = ref(false);
const openCreateUserDrawer = ref(false);
const userId = ref(0);

const onClickopenEditUserDrawer = (id) => {
  userId.value = id;
  openEditUserDrawer.value = true;
};

const onCloseEditUserDrawer = () => {
  userId.value = "";
  openEditUserDrawer.value = false;
  listUsers();
};

const onCreateUser = () => {
  openCreateUserDrawer.value = false;
  listUsers();
};

onMounted(() => {
  listUsers();
});
</script>

<template>
  <div class="bg-white pd-20">
    <PageHeader class="mt-20 mb-20" title="Usuários" subTitle="Lista">
      <template #extra>
        <a-button type="primary" @click="openCreateUserDrawer = true"
          ><UserOutlined /> Cadastrar usuário</a-button
        ></template
      >
    </PageHeader>

    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="users.list"
      size="small"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === '_id'">
          <a-tag class="f10">{{ text }}</a-tag>
        </template>

        <template v-if="column.key === 'action'">
          <EditOutlined
            class="mr-10"
            @click="onClickopenEditUserDrawer(text._id)"
            style="color: #1677ff"
          />

          <a-popconfirm
            title="Apagar usuário?"
            placement="left"
            ok-text="Sim"
            cancel-text="Não"
            @confirm="onClickDeleteUser(text._id)"
          >
            <DeleteOutlined style="color: red" />
          </a-popconfirm>
        </template>
      </template>
    </a-table>

    <div class="mt-20 a-center">
      <a-pagination
        :current="users.pagination.page"
        :page-size="users.pagination.limit"
        :total="users.pagination.total"
        show-size-changer
        @change="onChangePagination"
      />
    </div>

    <a-drawer
      placement="right"
      destroyOnClose
      :open="openCreateUserDrawer"
      :closable="false"
      :width="600"
      @close="openCreateUserDrawer = false"
    >
      <template #title> Criar usuário</template>
      <CreateUserForm
        v-if="openCreateUserDrawer"
        @onCreateUser="onCreateUser"
      />
    </a-drawer>

    <a-drawer
      placement="right"
      destroyOnClose
      :open="openEditUserDrawer"
      :closable="false"
      :width="600"
      @close="onCloseEditUserDrawer"
    >
      <template #title> ID - {{ userId }} </template>
      <UserEditDrawer v-if="openEditUserDrawer" :userId="userId" />
    </a-drawer>
  </div>
</template>
