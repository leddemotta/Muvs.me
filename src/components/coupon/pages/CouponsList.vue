<script setup>
import { onMounted, ref } from "vue";
import {
  EditOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import couponReusables from "../reusables/couponReusables";
import PageHeader from "@/components/general/PageHeader.vue";
import CreateCouponDrawer from "../drawers/CreateCouponDrawer.vue";
import EditCouponDrawer from "../drawers/EditCouponDrawer.vue";

const {
  onChangePagination,
  onClickDeleteCoupon,
  listCoupons,
  coupons,
  columns,
} = couponReusables;

const openEditCouponDrawer = ref(false);

const openCreateCouponDrawer = ref(false);

const couponId = ref("");

const onCreateCoupon = () => {
  openCreateCouponDrawer.value = false;
  listCoupons();
};

const onClickOpenEditCouponDrawer = (id) => {
  couponId.value = id;
  openEditCouponDrawer.value = true;
};

const onCloseEditCouponDrawer = () => {
  couponId.value = "";
  openEditCouponDrawer.value = false;
  listCoupons();
};

onMounted(() => {
  listCoupons();
});
</script>

<template>
  <section class="bg-white pd-20  min-h-[686px]">
    <PageHeader class="mt-20 mb-20" title="Coupons" subTitle="List">
      <template #extra>
        <a-button type="primary" @click="openCreateCouponDrawer = true"
          ><UserOutlined /> Create Coupon
        </a-button>
      </template>
    </PageHeader>

    {{ couponId }}

    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="coupons.list"
      size="small"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === '_id'">
          <a-tag class="f10">{{ text }}</a-tag>
        </template>

        <template v-if="column.key === 'action'">
          <EditOutlined
            class="mr-10"
            @click="onClickOpenEditCouponDrawer(text._id)"
            style="color: #1677ff"
          />

          <a-popconfirm
            title="Delete coupon?"
            placement="left"
            ok-text="Sim"
            cancel-text="Não"
            @confirm="onClickDeleteCoupon(text._id)"
          >
            <DeleteOutlined style="color: red" />
          </a-popconfirm>
        </template>
      </template>
    </a-table>

    <div class="mt-20 a-center">
      <a-pagination
        :current="coupons.pagination.page"
        :page-size="coupons.pagination.limit"
        :total="coupons.pagination.total"
        show-size-changer
        @change="onChangePagination"
      />
    </div>

    <a-drawer
      placement="right"
      destroyOnClose
      :open="openCreateCouponDrawer"
      :closable="false"
      :width="600"
      @close="openCreateCouponDrawer = false"
    >
      <template #title> Create Coupon </template>
      <CreateCouponDrawer
        v-if="openCreateCouponDrawer"
        @onCreateCoupon="onCreateCoupon"
      />
    </a-drawer>

    <a-drawer
      placement="right"
      destroyOnClose
      :open="openEditCouponDrawer"
      :closable="false"
      :width="600"
      @close="onCloseEditCouponDrawer"
    >
      <template #title> ID - {{ couponId }} </template>
      <EditCouponDrawer v-if="openEditCouponDrawer" :couponId="couponId" />
    </a-drawer>
  </section>
</template>