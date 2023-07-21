export default {
  data() {
    return {
      message: {
        loading: false,
        pagination: {
          page: 1,
          perPage: 10,
          total: 0,
          totalPages: 0,
        },
        details: {},
        list: [],
        filters: {
          users: {
            list: [],
            selected: [],
          },
          created_by: {
            list: [],
            selected: [],
          },
          status: {
            list: [
              {
                label: "Ativo",
                value: "active",
              },
              {
                label: "Desativado",
                value: "disabled",
              },
            ],
            selected: [],
          },
          period: {
            selected: [],
          },
          searchTerm: "",
          groupBy: "",
          order: "desc",
          orderBy: "created",
        },
      },
    };
  },
  methods: {
    changeMessagesPage(current) {
      this.message.pagination.page = current;
      this.getMessages();
    },
    changeMessagesPageSize(current, pageSize) {
      this.message.pagination.page = current;
      this.message.pagination.perPage = pageSize;
      this.getMessages();
    },
    messagesTableChange(pagination, filters, sorter) {
      filters;
      pagination;
      this.message.filters.order =
        sorter.order != undefined ? sorter.order : "desc";
      this.message.filters.orderBy =
        sorter.column != undefined ? sorter.column.key : "created";
      this.getMessages();
    },
    getMessages(samePage) {
      let filters = "";

      this.message.loading = true;

      if (this.message.filters.searchTerm) {
        filters += `&s=${this.message.filters.searchTerm}`;
      }

      if (this.message.filters.status.selected.length > 0) {
        filters += `&status=${this.message.filters.status.selected}`;
      }

      if (this.message.filters.users.selected.length > 0) {
        filters += `&user_id=${this.message.filters.users.selected}`;
      }

      if (this.message.filters.created_by.selected.length > 0) {
        filters += `&created_by=${this.message.filters.created_by.selected}`;
      }

      if (this.message.filters.groupBy) {
        filters += `&group_by=${this.message.filters.groupBy}`;
      }

      filters += `&order=${this.message.filters.order}&order-by=${this.message.filters.orderBy}`;

      this.$http
        .get(
          `/message/list?page=${this.message.pagination.page}&per_page=${this.message.pagination.perPage}${filters}`
        )
        .then(({ data }) => {
          if (!samePage) {
            this.message.pagination.page = 1;
          }
          this.message.pagination.total = data.meta.total;
          this.message.pagination.totalPages = data.meta.total_pages;
          this.message.list = data.data;
          this.message.loading = false;
        })
        .catch(({ response }) => {
          this.message.loading = false;
          this.message.list = response.data.data;
          this.message.pagination.total = response.data.meta.total;
          this.message.pagination.totalPages = response.data.meta.total_pages;
        });
    },
  },
};
