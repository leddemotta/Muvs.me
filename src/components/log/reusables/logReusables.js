import LogService from "@/services/LogService";
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";

const formState = reactive({});
const formRef = ref();
const isLoading = ref(false);
const theLog = ref({});

const onClickDeleteLog = async (payload) => {
  try {
    const { data } = await LogService.delete(payload);
    message.success(data.message);
    listLogs();
  } catch (error) {
    console.log(error.message);
  }
};

const onChangePagination = async (page, pageSize) => {
  logs.pagination.page = page;
  logs.pagination.limit = pageSize;
  listLogs();
};

const logs = reactive({
  list: [],
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
});

const listLogs = async () => {
  await LogService.list(
    `?page=${logs.pagination.page}&limit=${logs.pagination.limit}`
  ).then(({ data }) => {
    logs.list = data.list;

    logs.pagination.page = data.pagination.page;
    logs.pagination.limit = data.pagination.limit;
    logs.pagination.total = data.pagination.total;
  });
};

const logDetails = async (payload) => {
  try {
    const { data } = await LogService.details(payload);
    theLog.value = data;
  } catch (error) {
    console.log(error.message);
  }
};

const createLog = async (payload) => {
  try {
    isLoading.value = true;
    const { data } = await LogService.create(payload);
    console.log(data);
    emit("onCreateLog");
    message.success("Log criado!");
  } catch ({ response }) {
    message.error(response.data.error);
  } finally {
    isLoading.value = false;
  }
};

const updateLog = async (id, payload) => {
  try {
    isLoading.value = true;
    const { data } = await LogService.update(id, payload);
    data;

    message.success("Usuário atualizado!");
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
    title: "Module ID",
    dataIndex: "moduleId",
    key: "moduleId",
  },
  {
    title: "Module Name",
    dataIndex: "moduleName",
    key: "moduleName",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },

  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "",
    key: "action",
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
  onClickDeleteLog,
  onChangePagination,
  listLogs,
  logs,
  columns,
  formRules,
  formState,
  formRef,
  isLoading,
  theLog,
  logDetails,
  createLog,
  updateLog,
};
