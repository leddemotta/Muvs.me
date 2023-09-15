import { reactive } from "vue";
import { message } from "ant-design-vue";
import NotificationService from "@/services/NotificationService";

const notifications = reactive({
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

const onChangePagination = async (page, pageSize) => {
  notifications.pagination.page = page;
  notifications.pagination.limit = pageSize;
  listNotificationes();
};

const listNotificationes = async () => {
  try {
    let filters = "";

    if (notifications.filters.userId)
      filters = `&userId=${notifications.filters.userId}`;

    const res = await NotificationService.list(
      `?page=${notifications.pagination.page}&limit=${notifications.pagination.limit}${filters}`
    );

    notifications.list = res.data.list;
    notifications.pagination.page = res.data.pagination.page;
    notifications.pagination.limit = res.data.pagination.limit;
    notifications.pagination.total = res.data.pagination.total;
  } catch (err) {
    console.log(err);
  }
  // await NotificationService.list(
  //   `?page=${notifications.pagination.page}&limit=${notifications.pagination.limit}&userId=${notifications.filters.userId}`
  // ).then(({ data }) => {

  // });
};

const updateNotification = async (id, payload) => {
  try {
    const { data } = await NotificationService.update(id, payload);
    console.log(data);
  } catch (error) {
    console.log(error);
    ///message.error(error.response.data.message);
  } finally {
  }
};

const deleteNotification = async (payload) => {
  try {
    const { data } = await NotificationService.delete(payload);
    listNotificationes();
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  notifications,
  listNotificationes,
  deleteNotification,
  updateNotification,
  onChangePagination,
};
