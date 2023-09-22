import ApiClientService from "./ApiClientService";

const VehicleService = {
  create(payload) {
    return ApiClientService.post(`/vehicles`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/vehicles${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/vehicles/${payload}`);
  },
  delete(payload) {
    return ApiClientService.delete(`/vehicles/${payload}`);
  },
  update(id, payload) {
    return ApiClientService.put(`/vehicles/${id}`, payload);
  },
};

export default VehicleService;
