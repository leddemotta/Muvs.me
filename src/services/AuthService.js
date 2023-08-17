import ApiClientService from "./ApiClientService";

const AuthService = {
  login(payload) {
    return ApiClientService.post(`/token`, payload);
  },
  register(payload) {
    return ApiClientService.post(`/users/register`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/users${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/users/${payload}`);
  },
};

export default AuthService;