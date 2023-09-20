import ApiClientService from "./ApiClientService";

const LogService = {
  create(payload) {
    return ApiClientService.post(`/logs`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/logs${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/logs/${payload}`);
  },
  delete(payload) {
    return ApiClientService.delete(`/logs/${payload}`);
  },
  update(id, payload) {
    return ApiClientService.put(`/logs/${id}`, payload);
  },
};

export default LogService;
