import ApiClientService from "./ApiClientService";

const NotificationService = {
  create(payload) {
    return ApiClientService.post(`/notifications`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/notifications${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/notifications/${payload}`);
  },
  delete(payload) {
    return ApiClientService.delete(`/notifications/${payload}`);
  },
  update(id, payload) {
    return ApiClientService.put(`/notifications/${id}`, payload);
  },
};

export default NotificationService;
