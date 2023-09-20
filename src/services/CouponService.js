import ApiClientService from "./ApiClientService";

const CouponService = {
  create(payload) {
    return ApiClientService.post(`/coupons`, payload);
  },
  list(payload) {
    return ApiClientService.get(`/coupons${payload}`);
  },
  details(payload) {
    return ApiClientService.get(`/coupons/${payload}`);
  },
  delete(payload) {
    return ApiClientService.delete(`/coupons/${payload}`);
  },
  update(id, payload) {
    return ApiClientService.put(`/coupons/${id}`, payload);
  },
};

export default CouponService;
