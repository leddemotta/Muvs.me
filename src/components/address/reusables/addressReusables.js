import { ref, reactive } from "vue";
import AddressService from "@/services/AddressService";

const addresses = reactive({
  list: [],
  loading: false,
  filters: {
    status: "active",
    userId: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
});

const listAddresses = async () => {
  await AddressService.list(
    `?page=${addresses.pagination.page}&limit=${addresses.pagination.limit}&userId=${addresses.filters.userId}`
  ).then(({ data }) => {
    addresses.list = data.addresses;
    addresses.pagination.page = data.pagination.page;
    addresses.pagination.limit = data.pagination.limit;
    addresses.pagination.total = data.pagination.total;
  });
};

const deleteAddress = async (payload) => {
  try {
    const { data } = await AddressService.delete(payload);
    listAddresses();
    return data;
  } catch (error) {
    return error;
  }
};

const states = reactive([
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
]);

export default { addresses, listAddresses, deleteAddress, states };
