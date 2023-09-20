<script setup>
import { onMounted } from "vue";
import logReusables from "../reusables/logReusables";
import PageHeader from "@/components/general/PageHeader.vue";

const { onChangePagination, listLogs, logs, columns } = logReusables;

onMounted(() => {
  listLogs();
});
</script>

<template>
  <div class="bg-white pd-20">
    <PageHeader class="mt-20 mb-20" title="Logs" subTitle="List" />

    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="logs.list"
      size="small"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === '_id'">
          <a-tag class="f10">{{ text }}</a-tag>
        </template>
      </template>
    </a-table>

    <div class="mt-20 a-center">
      <a-pagination
        :current="logs.pagination.page"
        :page-size="logs.pagination.limit"
        :total="logs.pagination.total"
        show-size-changer
        @change="onChangePagination"
      />
    </div>
  </div>
</template>
