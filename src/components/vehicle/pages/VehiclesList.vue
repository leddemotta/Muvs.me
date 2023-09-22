<script setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

import {
  EditOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

import vehicleReusables from "../reusables/vehicleReusables";
import PageHeader from "@/components/general/PageHeader.vue";

const router = useRouter();

const { vehicles, columns, listVehicles } = vehicleReusables;

onMounted(() => {
  listVehicles();
});
</script>

<template>
  <section class="bg-white pd-20">
    <PageHeader class="mt-20 mb-20" title="Vehicles" subTitle="List">
      <template #extra>
        <a-button type="primary" @click="router.push('/vehicles/new')">
          Create vehicle
        </a-button>
      </template>
    </PageHeader>

    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="vehicles.list"
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
        :current="vehicles.pagination.page"
        :page-size="vehicles.pagination.limit"
        :total="vehicles.pagination.total"
        show-size-changer
        @change="onChangePagination"
      />
    </div>
  </section>
</template>
