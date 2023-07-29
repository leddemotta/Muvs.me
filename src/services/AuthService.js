import ApiClientService from "./ApiClientService";

const AuthService = {
  login(payload) {
    return ApiClientService.post("/token", payload);
  },
  register(payload) {
    return ApiClientService.post("/users/register", payload);
  },
};

export default AuthService;
