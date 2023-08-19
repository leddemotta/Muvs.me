import ApiClientService from "./ApiClientService";

const AddressService = {
  create(payload) {
    return ApiClientService.post(`/addresses`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/addresses${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/addresses/${payload}`);
  },
  delete(payload) {
    return ApiClientService.delete(`/addresses/${payload}`);
  },
  update(id, payload) {
    return ApiClientService.put(`/addresses/${id}`, payload);
  },
};

export default AddressService;
