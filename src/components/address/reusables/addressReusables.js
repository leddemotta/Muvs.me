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

export default { addresses, listAddresses, deleteAddress };
