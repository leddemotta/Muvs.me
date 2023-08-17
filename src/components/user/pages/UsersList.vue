<script setup>
import { ref, reactive, onMounted } from "vue";
import { EditOutlined, UserOutlined } from "@ant-design/icons-vue";

import UserEditDrawer from "@/components/user/drawers/UserEditDrawer.vue";
import PageHeader from "../../general/PageHeader.vue";
import AuthService from "@/services/AuthService";

const list = async (payload) => {
  try {
    const response = await AuthService.list(payload);
    users.pagination.total = response.data.pagination.total;
    return response.data.users;
  } catch (error) {
    return [];
    //console.log(error);
  }
};

const openUserDrawer = ref(false);
const userId = ref(0);

const columns = reactive([
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Nome",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Sobrenome",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Função",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Cadastro",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "",
    key: "action",
  },
]);

const users = reactive({
  list: [],
  filters: {
    status: "active",
  },
  pagination: {
    page: 0,
    limit: 8,
    total: 0,
  },
});

const listUsers = async () => {
  users.list = await list(
    `?page=${users.pagination.page}&limit=${users.pagination.limit}`
  );
};

const onClickOpenUserDrawer = (id) => {
  userId.value = id;
  openUserDrawer.value = true;
};

const onCloseUserDrawer = () => {
  userId.value = "";
  openUserDrawer.value = false;
};

const onChangePagination = async (page, pageSize) => {
  users.pagination.page = page;
  users.pagination.limit = pageSize;
  listUsers();
};

onMounted(async () => {
  try {
    listUsers();
  } catch (error) {
    // Handle error if needed
  }
});
</script>

<template>
  <div class="bg-white pd-20">
    <PageHeader title="Usuários" subTitle="Lista">
      <template #extra>
        <a-button type="primary"
          ><UserOutlined /> Criar usuário</a-button
        ></template
      >
    </PageHeader>

    <a-table :pagination="false" :columns="columns" :data-source="users.list">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === '_id'">
          <a-tag class="f10">{{ text }}</a-tag>
        </template>

        <template v-if="column.key === 'action'">
          <EditOutlined
            @click="onClickOpenUserDrawer(text._id)"
            style="color: #1677ff"
          />
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
      :open="openUserDrawer"
      class="custom-class"
      placement="right"
      :width="600"
      @close="onCloseUserDrawer"
    >
      <template #title>
        ID <a-tag class="f12">{{ userId }}</a-tag>
      </template>
      <UserEditDrawer v-if="openUserDrawer" :userId="userId" />
    </a-drawer>
  </div>
</template>