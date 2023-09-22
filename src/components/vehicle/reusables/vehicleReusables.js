import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
import VehicleService from "@/services/VehicleService";

const formState = reactive({});
const formRef = ref();
const isLoading = ref(false);
const theVehicle = ref({});

const onClickDeleteVehicle = async (payload) => {
  try {
    const { data } = await VehicleService.delete(payload);
    message.success(data.message);
    listVehicles();
  } catch (error) {
    console.log(error.message);
  }
};

const onChangePagination = async (page, pageSize) => {
  vehicles.pagination.page = page;
  vehicles.pagination.limit = pageSize;
  listVehicles();
};

const vehicles = reactive({
  list: [],
  filters: {
    status: "active",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
});

const listVehicles = async () => {
  await VehicleService.list(
    `?page=${vehicles.pagination.page}&limit=${vehicles.pagination.limit}&status=${vehicles.filters.status}`
  ).then(({ data }) => {
    vehicles.list = data.vehicles;
    vehicles.pagination.page = data.pagination.page;
    vehicles.pagination.limit = data.pagination.limit;
    vehicles.pagination.total = data.pagination.total;
  });
};

const vehicleDetails = async (payload) => {
  try {
    const { data } = await VehicleService.details(payload);
    theVehicle.value = data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateVehicle = async (id, payload) => {
  try {
    isLoading.value = true;
    const { data } = await VehicleService.update(id, payload);
    data;

    message.success("Successfully updated!");
  } catch (error) {
    console.log(error);
    ///message.error(error.response.data.message);
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
    title: "addressId",
    dataIndex: "addressId",
    key: "addressId",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "maxWeight",
    dataIndex: "maxWeight",
    key: "maxWeight",
  },
  {
    title: "recommendation",
    dataIndex: "recommendation",
    key: "recommendation",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "situation",
    dataIndex: "situation",
    key: "situation",
  },
  {
    title: "isElectric",
    dataIndex: "isElectric",
    key: "isElectric",
  },
  {
    title: "slug",
    dataIndex: "slug",
    key: "slug",
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "",
    key: "action",
  },
]);

const formRules = reactive({
  name: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
});

const status = reactive([
  { label: "Ativo", value: "active" },
  { label: "Desativado", value: "disabled" },
]);

export default {
  onClickDeleteVehicle,
  onChangePagination,
  listVehicles,
  vehicles,
  columns,
  formRules,
  formState,
  formRef,
  isLoading,
  status,
  theVehicle,
  vehicleDetails,
  updateVehicle,
};
