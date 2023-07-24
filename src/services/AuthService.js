import ApiClientService from './ApiClientService';

const AuthService = {
  login(payload) {
    return ApiClientService.post('/token', payload);
  },
};

export default AuthService;