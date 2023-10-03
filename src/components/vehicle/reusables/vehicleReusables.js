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
  try {
    const { data } = await VehicleService.list(
      `?page=${vehicles.pagination.page}&limit=${vehicles.pagination.limit}&status=${vehicles.filters.status}`
    );
    vehicles.list = data.list;
    vehicles.pagination.page = data.pagination.page;
    vehicles.pagination.limit = data.pagination.limit;
    vehicles.pagination.total = data.pagination.total;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const createVehicle = async (payload) => {
  try {
    const { data } = await VehicleService.create(payload);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const vehicleDetails = async (payload) => {
  try {
    const { data } = await VehicleService.details(payload);
    theVehicle.value = data;
    return data
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
  } finally {
    isLoading.value = false;
  }
};

const columns = reactive([
  {
    title: "",
    dataIndex: "situation",
    key: "situation",
    width: 30,
  },
  {
    title: "Foto",
    dataIndex: "image",
    key: "image",
    width: 76,
  },

  // {
  //   title: "ID",
  //   dataIndex: "_id",
  //   key: "_id",
  //   width: 200,
  // },

  {
    title: "Usuário",
    dataIndex: "user",
    key: "user",
  },

  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    width: 400,
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
    title: "Endereço",
    dataIndex: "address",
    key: "address",
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
    fixed: "right",
    width: 110,
  },
]);

const formRules = reactive({
  type: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],

  //   {
  //     "type": "bicycle",
  //     "brand": "caloy",
  //     "name": "Bicicleta do Led",
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //     "value": "10,55",
  //     "color": "green",
  //     "maxWeight": "80",
  //     "recommendation": "18"
  // }
});

const status = reactive([
  { label: "Ativo", value: "active" },
  { label: "Desativado", value: "disabled" },
]);

const vehicleTypes = reactive([
  {
    label: "Bicycle",
    value: "bicycle",
  },
  {
    label: "Skate",
    value: "skate",
  },
  {
    label: "Scooter",
    value: "scooter",
  },
]);

const maxWeights = reactive([
  {
    label: "< 60kg",
    value: "< 60kg",
  },
  {
    label: "< 70kg",
    value: "< 70kg",
  },
  {
    label: "< 80kg",
    value: "< 80kg",
  },
  {
    label: "< 90kg",
    value: "< 90kg",
  },
  {
    label: "< 100kg",
    value: "< 100kg",
  },
  {
    label: "< 110kg",
    value: "< 110kg",
  },
  {
    label: "< 120kg",
    value: "< 120kg",
  },
  {
    label: "Aceita todos pesos",
    value: "all",
  },
]);

const colors = reactive([
  {
    label: "Vermelho",
    value: "red",
  },
  {
    label: "Verde",
    value: "green",
  },
  {
    label: "Preto",
    value: "black",
  },
  {
    label: "Branco",
    value: "white",
  },
  {
    label: "Multicores",
    value: "multicolor",
  },
]);

const recommendationsList = reactive([
  {
    label: "+10",
    value: "+10",
  },
  {
    label: "+14",
    value: "+14",
  },
  {
    label: "+16",
    value: "+16",
  },
  {
    label: "+18",
    value: "+18",
  },
]);

const vehicleBrands = reactive([
  {
    label: "Caloy",
    value: "caloy",
  },
  {
    label: "Other",
    value: "other",
  }

  // KSW

  // Absolute

  // Shimano

  // MARIA CLARA BIKES

  // NATHOR

  // Atrio

  // Gantech

  // Hupi

  // Dropp

  // Dalannio Bike

  // RAIDER

  // Elleven

  // GTI

  // Xnova

  // GTA

  // FlexBikes

  // VikingX

  // SouthBike

  // TecBike

  // RINO

  // Caloi

  // Multikids

  // VIKING

  // Kenda

  // Dropp Bikes

  // Multilaser

  // Alfameq

  // Algoo

  // Elite Professional

  // Giro

  // Isapa

  // Spaceline

  // X-Time

  // Quadros On-Line

  // Ecos

  // Colli Bike

  // Poker

  // High One

  // Vzan

  // Brinquedos Bandeirante

  // COLLI

  // Rock Bros

  // Pirelli

  // Refactor

  // btwin

  // GTS M1

  // Houston

  // Thule

  // Verden

  // Cairu
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
  vehicleTypes,
  maxWeights,
  colors,
  recommendationsList,
  vehicleBrands,
  theVehicle,
  status,
  vehicleDetails,
  createVehicle,
  updateVehicle,
};
