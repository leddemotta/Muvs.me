export default {
  data() {
    return {
      user: {
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
          roles: {
            list: [{
                name: "Administrador",
                value: "admin"
              },
              {
                name: "Usuário",
                value: "user"
              }
            ],
            selected: [],
          },
          status: {
            list: [{
                label: "Ativo",
                value: "1",
              },
              {
                label: "Desativado",
                value: "0",
              },
            ],
            selected: [],
          },
          period: {
            selected: [],
          },
          id: "",
          searchTerm: "",
          order: "desc",
          orderBy: "created",
        },
        meta: {

        }
      },
      usersTableCollumns: [{
          title: "ID",
          dataIndex: "id",
          key: "id",
          class: "id",
        },
        {
          title: "",
          key: "avatar",
          scopedSlots: {
            customRender: "avatar"
          },
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Função",
          scopedSlots: {
            customRender: "role"
          },
        },
        {
          title: "Status",
          scopedSlots: {
            customRender: "status"
          },
        },
        {
          title: "Data de criação",
          scopedSlots: {
            customRender: "created"
          },
        },
        {
          title: "",
          key: "action",
          align: "right",
          scopedSlots: {
            customRender: "action"
          },
        },
      ]
    };
  },
  methods: {
    changeUserPage(current) {
      this.user.pagination.page = current;
      this.getUsers();
    },
    changeUserPageSize(current, pageSize) {
      this.user.pagination.page = current;
      this.user.pagination.perPage = pageSize;
      this.getUsers();
    },
    userTableChange(pagination, filters, sorter) {
      filters;
      pagination;
      this.user.filters.order =
        sorter.order != undefined ? sorter.order : "desc";
      this.user.filters.orderBy =
        sorter.column != undefined ? sorter.column.key : "created";
      this.getUsers();
    },
    onSaleSelected(id) {
      this.user.details = null;
      this.getUser(id);
    },
    getUser(id) {
      this.$http
        .post("/user/details?id=" + id)
        .then(({
          data
        }) => {
          this.user.details = data;
        })
        .catch(
          ({
            response
          }) => {
            response
          }
        )
    },
    getUserProfile() {
      this.$http
        .post("/users/profile", {
          userId: this.$cookies.get("userId"),
        })
        .then(({ data }) => {
          this.user.details = data;
        })
        .catch(({ response }) => {
          response;
        });
    },
    getUsers(samePage) {
      this.user.loading = true;

      let filters = "";
      let queryParams = new URLSearchParams("");

      history.pushState(null, null, "");

      if (!this.$root.isAdmin()) {
        filters += `&user_id=${this.$store.state.userData.id}`;
      } else {
        if (this.user.filters.users.selected.length > 0) {
          filters += `&user_id=${ this.user.filters.users.selected}`;
        }

        if (this.user.filters.period.selected.length > 0) {
          filters += `&period=${this.user.filters.period.selected[0]}|${this.user.filters.period.selected[1]}`;

          queryParams.set(
            "period", `${this.user.filters.period.selected[0]}|${this.user.filters.period.selected[1]}`
          );
        }

        if (this.user.filters.roles.selected.length > 0) {
          filters += `&role=${this.user.filters.roles.selected}`;
        }

        if (this.user.filters.status.selected.length > 0) {
          filters += `&status=${this.user.filters.status.selected}`;
        }

        if (this.user.filters.searchTerm) {
          filters += `&s=${ this.user.filters.searchTerm}`;
        }
      }

      filters += `&order=${ this.user.filters.order}&order-by=${ this.user.filters.orderBy}`;

      history.replaceState(null, null, "?" + queryParams.toString());

      this.$http
        .get(
          `/user/list?page=${this.user.pagination.page}&per_page=${this.user.pagination.perPage}${filters}`
        )
        .then(({
          data
        }) => {
          if (!samePage) {
            this.user.pagination.page = 1;
          }
          this.user.pagination.total = data.meta.total;
          this.user.pagination.totalPages = data.meta.total_pages;

          this.user.list = data.data;

          this.user.meta = data.meta;
          this.user.loading = false;
        })
        .catch(({
          response
        }) => {
          this.user.pagination.total = response.data.meta.total;
          this.user.pagination.totalPages = response.data.meta.total_pages;

          this.user.list = [];
          this.user.loading = false;
        });

    }
  }
}