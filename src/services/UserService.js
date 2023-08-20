import ApiClientService from "./ApiClientService";

const UserService = {
  create(payload) {
    return ApiClientService.post(`/users`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/users${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/users/${payload}`);
  },
  delete(payload) {
    return ApiClientService.delete(`/users/${payload}`);
  },
  update(id, payload) {
    return ApiClientService.put(`/users/${id}`, payload);
  },
};

export default UserService;
