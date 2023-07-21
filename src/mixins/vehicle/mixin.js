export default {
  data() {
    return {
      vehicle: {
        loading: false,
        pagination: {
          page: 1,
          perPage: 30,
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
          type: {
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
                value: "vehicle"
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
      vehiclesTableCollumns: [{
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
    changeVehiclePage(current) {
      this.vehicle.pagination.page = current;
      this.getVehicles();
    },
    changeVehiclePageSize(current, pageSize) {
      this.vehicle.pagination.page = current;
      this.vehicle.pagination.perPage = pageSize;
      this.getVehicles();
    },
    vehicleTableChange(pagination, filters, sorter) {
      filters;
      pagination;
      this.vehicle.filters.order =
        sorter.order != undefined ? sorter.order : "desc";
      this.vehicle.filters.orderBy =
        sorter.column != undefined ? sorter.column.key : "created";
      this.getVehicles();
    },
    onSaleSelected(id) {
      this.vehicle.details = null;
      this.getVehicle(id);
    },
    getVehicle(id) {
      this.$http
        .post("/vehicle/details?id=" + id)
        .then(({
          data
        }) => {
          this.vehicle.details = data;
        })
        .catch(
          ({
            response
          }) => {
            response
          }
        )
    },
    getVehicles(samePage) {
      this.vehicle.loading = true;

      let filters = "";
      let queryParams = new URLSearchParams("");

      history.pushState(null, null, "");

      if (!this.$root.isAdmin()) {
        filters += `&user_id=${this.$store.state.userData.id}`;
      } else {
        if (this.vehicle.filters.users.selected.length > 0) {
          filters += `&vehicle_id=${ this.vehicle.filters.users.selected}`;
        }

        if (this.vehicle.filters.period.selected.length > 0) {
          filters += `&period=${this.vehicle.filters.period.selected[0]}|${this.vehicle.filters.period.selected[1]}`;

          queryParams.set(
            "period", `${this.vehicle.filters.period.selected[0]}|${this.vehicle.filters.period.selected[1]}`
          );
        }

        if (this.vehicle.filters.roles.selected.length > 0) {
          filters += `&role=${this.vehicle.filters.roles.selected}`;
        }


        if (this.vehicle.filters.status.selected.length > 0) {
          filters += `&status=${this.vehicle.filters.status.selected}`;
        }

        if (this.vehicle.filters.searchTerm) {
          filters += `&s=${ this.vehicle.filters.searchTerm}`;
        }
      }

      
      if (this.vehicle.filters.type.selected.length > 0) {
        filters += `&type=${this.vehicle.filters.type.selected}`;
      }

      filters += `&order=${ this.vehicle.filters.order}&order-by=${ this.vehicle.filters.orderBy}`;

      if (Object.keys(queryParams).length > 0) {
        history.replaceState(null, null, "?" + queryParams.toString());
      }

      this.$http
        .get(
          `/vehicle/list?page=${this.vehicle.pagination.page}&per_page=${this.vehicle.pagination.perPage}${filters}`
        )
        .then(({
          data
        }) => {
          if (!samePage) {
            this.vehicle.pagination.page = 1;
          }
          this.vehicle.pagination.total = data.meta.total;
          this.vehicle.pagination.totalPages = data.meta.total_pages;

          this.vehicle.list = data.data;
          this.vehicle.meta = data.meta;
          this.vehicle.loading = false;
        })
        .catch(({
          response
        }) => {
          this.vehicle.pagination.total = response.data.meta.total;
          this.vehicle.pagination.totalPages = response.data.meta.total_pages;

          this.vehicle.list = [];
          this.vehicle.loading = false;
        });

    }
  }
}