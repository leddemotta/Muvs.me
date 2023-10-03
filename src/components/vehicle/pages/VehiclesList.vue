<script setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

import vehicleReusables from "../reusables/vehicleReusables";
import PageHeader from "@/components/general/PageHeader.vue";

const router = useRouter();

const { vehicles, columns, listVehicles, onClickDeleteVehicle } =
  vehicleReusables;

onMounted(() => {
  listVehicles();
});
</script>

<template>
  <section class="bg-white pd-20 min-h-[686px]">
    <PageHeader class="mt-20 mb-20" title="Veículos" subTitle="Lista">
      <template #extra>
        <a-button type="primary" @click="router.push('/vehicles/new')">
          Cadastrar
        </a-button>
      </template>
    </PageHeader>

    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="vehicles.list"
      :scroll="{ x: 3000 }"
      :expand-column-width="100"
      size="small"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'situation'">
          <font v-if="text === 'analysis'" class="text-3xl text-yellow-500"
            >•
          </font>
          <font v-if="text === 'published'" class="text-3xl text-lime-600"
            >•
          </font>
        </template>

        <template v-if="column.dataIndex === '_id'">
          <a-tag class="f10">{{ text }}</a-tag>
        </template>

        <template v-if="column.dataIndex === 'image'">
          <!-- <a-image :width="50" :src="text" /> -->
          <a-avatar :src="text" :size="50"></a-avatar>
        </template>

        <template v-if="column.dataIndex === 'user'">
          {{ text.firstName }} {{ text.lastName }}
        </template>

        <template v-if="column.dataIndex === 'address'">
          {{ text.city }} - {{ text.state }}
        </template>

        <template v-if="column.dataIndex === 'isElectric'">
          <CheckOutlined v-if="text" />
          <CloseOutlined v-if="!text" />
        </template>

        <template v-if="column.key === 'action'">
          <EditOutlined
            class="mr-10"
            @click="router.push(`/vehicles/${text._id}/edit`)"
            style="color: #1677ff"
          />

          <EyeOutlined
            class="mr-10"
            @click="router.push(`/vehicles/${text._id}/details`)"
            style="color: #1677ff"
          />

          <a-popconfirm
            title="Aprovar veículo?"
            placement="left"
            ok-text="Sim"
            cancel-text="Não"
            @confirm="onClickApproveVehicle(text._id)"
          >
            <CheckOutlined class="mr-10" style="color: green" />
          </a-popconfirm>

          <a-popconfirm
            title="Apagar veículo?"
            placement="left"
            ok-text="Sim"
            cancel-text="Não"
            @confirm="onClickDeleteVehicle(text._id)"
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
