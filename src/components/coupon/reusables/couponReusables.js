import CouponService from "@/services/CouponService";
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";

const formState = reactive({});
const formRef = ref();
const isLoading = ref(false);
const theCoupon = ref({});

const onClickDeleteCoupon = async (payload) => {
  try {
    const { data } = await CouponService.delete(payload);
    data;
    message.success("Apagado com sucesso");
    listCoupons();
  } catch (error) {
    console.log(error.message);
  }
};

const onChangePagination = async (page, pageSize) => {
  coupons.pagination.page = page;
  coupons.pagination.limit = pageSize;
  listCoupons();
};

const coupons = reactive({
  list: [],
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
});

const listCoupons = async () => {
  await CouponService.list(
    `?page=${coupons.pagination.page}&limit=${coupons.pagination.limit}`
  ).then(({ data }) => {
    coupons.list = data.list;

    coupons.pagination.page = data.pagination.page;
    coupons.pagination.limit = data.pagination.limit;
    coupons.pagination.total = data.pagination.total;
  });
};

const couponDetails = async (payload) => {
  try {
    const { data } = await CouponService.details(payload);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const createCoupon = async (payload) => {
  try {
    isLoading.value = true;
    const { data } = await CouponService.create(payload);
    console.log(data);
    message.success("Coupon criado!");
  } catch ({ response }) {
    message.error(response.data.error);
  } finally {
    isLoading.value = false;
  }
};

const updateCoupon = async (id, payload) => {
  try {
    isLoading.value = true;
    const { data } = await CouponService.update(id, payload);
    message.success("Coupon updated!");
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const columns = reactive([
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "userId",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "couponCode",
    dataIndex: "couponCode",
    key: "couponCode",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "discountPercentage",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
  },

  {
    title: "usageLimit",
    dataIndex: "usageLimit",
    key: "usageLimit",
  },

  {
    title: "expiresAt",
    dataIndex: "expiresAt",
    key: "expiresAt",
  },

  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "",
    key: "action",
    width: 80,
  },
]);

const formRules = reactive({
  // firstName: [
  //   {
  //     required: true,
  //     message: "Obrigatório",
  //   },
  // ],
});

export default {
  onClickDeleteCoupon,
  onChangePagination,
  listCoupons,
  coupons,
  columns,
  formRules,
  formState,
  formRef,
  isLoading,
  theCoupon,
  couponDetails,
  createCoupon,
  updateCoupon,
};
