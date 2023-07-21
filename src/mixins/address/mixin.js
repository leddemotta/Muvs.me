export default {
  data() {
    return {
      address: {
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
                value: "address"
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
      addresssTableCollumns: [{
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
    changeAddressPage(current) {
      this.address.pagination.page = current;
      this.getAddresses();
    },
    changeAddressPageSize(current, pageSize) {
      this.address.pagination.page = current;
      this.address.pagination.perPage = pageSize;
      this.getAddresses();
    },
    addressTableChange(pagination, filters, sorter) {
      filters;
      pagination;
      this.address.filters.order =
        sorter.order != undefined ? sorter.order : "desc";
      this.address.filters.orderBy =
        sorter.column != undefined ? sorter.column.key : "created";
      this.getAddresses();
    },
    onSaleSelected(id) {
      this.address.details = null;
      this.getAddress(id);
    },
    getAddress(id) {
      this.$http
        .post("/address/details?id=" + id)
        .then(({
          data
        }) => {
          this.address.details = data;
        })
        .catch(
          ({
            response
          }) => {
            response
          }
        )
    },
    getAddresses(samePage) {
      this.address.loading = true;

      let filters = "";
      let queryParams = new URLSearchParams("");

      history.pushState(null, null, "");

      if (!this.$root.isAdmin()) {
        filters += `&user_id=${this.$store.state.userData.id}`;
      } else {
        if (this.address.filters.users.selected.length > 0) {
          filters += `&address_id=${ this.address.filters.users.selected}`;
        }

        if (this.address.filters.period.selected.length > 0) {
          filters += `&period=${this.address.filters.period.selected[0]}|${this.address.filters.period.selected[1]}`;

          queryParams.set(
            "period", `${this.address.filters.period.selected[0]}|${this.address.filters.period.selected[1]}`
          );
        }

        if (this.address.filters.roles.selected.length > 0) {
          filters += `&role=${this.address.filters.roles.selected}`;
        }

        if (this.address.filters.status.selected.length > 0) {
          filters += `&status=${this.address.filters.status.selected}`;
        }

        if (this.address.filters.searchTerm) {
          filters += `&s=${ this.address.filters.searchTerm}`;
        }
      }

      filters += `&order=${ this.address.filters.order}&order-by=${ this.address.filters.orderBy}`;

      history.replaceState(null, null, "?" + queryParams.toString());

      this.$http
        .get(
          `/address/list?page=${this.address.pagination.page}&per_page=${this.address.pagination.perPage}${filters}`
        )
        .then(({
          data
        }) => {
          if (!samePage) {
            this.address.pagination.page = 1;
          }
          this.address.pagination.total = data.meta.total;
          this.address.pagination.totalPages = data.meta.total_pages;

          this.address.list = data.data;
          this.address.meta = data.meta;
          this.address.loading = false;
        })
        .catch(({
          response
        }) => {
          this.address.pagination.total = response.data.meta.total;
          this.address.pagination.totalPages = response.data.meta.total_pages;

          this.address.list = [];
          this.address.loading = false;
        });

    }
  }
}