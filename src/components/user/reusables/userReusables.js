import { ref, reactive } from "vue";
//import { useStore } from 'pinia';
import { message } from "ant-design-vue";
import UserService from "@/services/UserService";
import logReusables from "@/components/log/reusables/logReusables";
//import { useUserStore } from "@/store/userStore";

const { createLog } = logReusables;
// const { user } = useUserStore();

//const store  = useStore(useUserStore);


const formState = reactive({});
const formRef = ref();
const isLoading = ref(false);
const theUser = ref({});

const onClickDeleteUser = async (payload) => {
  try {
    const { data } = await UserService.delete(payload);
    message.success(data.message);

    createLog({
      userId: user._id,
      moduleId: payload,
      moduleName: "user",
      action: "delete-user",
      content: `${user.firstName} ${user.lastName} deletou o usuário ID (${payload}).`,
    });

    listUsers();
  } catch (error) {
    console.log(error.message);
  }
};

const onChangePagination = async (page, pageSize) => {
  users.pagination.page = page;
  users.pagination.limit = pageSize;
  listUsers();
};

const users = reactive({
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

const listUsers = async () => {
  await UserService.list(
    `?page=${users.pagination.page}&limit=${users.pagination.limit}&status=${users.filters.status}`
  ).then(({ data }) => {
    users.list = data.users;
    users.pagination.page = data.pagination.page;
    users.pagination.limit = data.pagination.limit;
    users.pagination.total = data.pagination.total;
  });
};

const userDetails = async (payload) => {
  try {
    const { data } = await UserService.details(payload);
    theUser.value = data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (id, payload) => {
  try {
    isLoading.value = true;
    const { data } = await UserService.update(id, payload);
    data;

    message.success("Usuário atualizado!");
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
    title: "",
    dataIndex: "avatar",
    key: "avatar",
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

let validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Please input the password");
  } else {
    if (formState.checkPassword !== "") {
      formRef.value.validateFields("checkPassword");
    }
    return Promise.resolve();
  }
};

let validatePass2 = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Please input the password again");
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const formRules = reactive({
  firstName: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "Insira o seu e-mail",
    },
  ],
  idCard: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  birthday: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  phone: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  gender: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  role: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  status: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
  checkPassword: [
    {
      required: true,
      validator: validatePass2,
      trigger: "change",
    },
  ],
});

const genders = reactive([
  { label: "Masculino", value: "male" },
  { label: "Feminino", value: "female" },
  { label: "Outrxs", value: "other" },
]);

const roles = reactive([
  { label: "Administrador", value: "admin" },
  { label: "Usuário", value: "user" },
]);

const status = reactive([
  { label: "Ativo", value: "active" },
  { label: "Desativado", value: "inactive" },
]);

export default {
  onClickDeleteUser,
  onChangePagination,
  listUsers,
  users,
  columns,
  formRules,
  validatePass,
  validatePass2,
  formState,
  formRef,
  isLoading,
  genders,
  roles,
  status,
  theUser,
  userDetails,
  updateUser,
};
