<template>
    <div class="page-pd">
        <div class="container">
            <h1>Perfil </h1>
            <a-form :form="form" @submit="handleSubmit">
                <a-row class="profile">
                    <a-col class="tab-content" :span="24">
                        <a-tabs default-active-key="1">
                            <a-tab-pane key="1" tab=" Meus Dados">
                                <a-row :gutter="20">
                                    <a-col :span="16">
                                        <UserFields />
                                        <!-- {{ user.details }} -->
                                    </a-col>

                                    <a-col class="a-center" :span="8">
                                        <a-avatar
                                            :size="200"
                                            :src="user.details.avatar"
                                        />
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Endereços" force-render>
                                <AddressList />
                            </a-tab-pane>
                            <!-- <a-tab-pane key="3" tab="Configurações">
                                <Settings />
                            </a-tab-pane> -->
                        </a-tabs>
                    </a-col>

                    <a-col class="action a-right" :span="24">
                        <a-button
                            html-type="submit"
                            type="primary"
                            :loading="loading"
                        >
                            Salvar alterações
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
import userMixins from "@/mixins/user/mixin.js";
import AddressList from "@/components/user/address/AddressList.vue";
import Settings from "@/components/user/extra/Settings.vue";
import UserFields from "@/components/user/fields/UserFields.vue";

export default {
    components: { AddressList, Settings, UserFields },
    mixins: [userMixins],
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false,
        };
    },
    beforeMount() {
        document.title = "Perfil";
        this.getUserProfile();

        setTimeout(() => {
            this.form.setFieldsValue({ userPassword: "." });
            setTimeout(() => {
                this.form.setFieldsValue({ userPassword: "" });
                this.form.setFieldsValue(this.user.details);
            }, 600);
        }, 300);
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                values.id = this.$store.state.userData.id;
                console.log(err, values);
                if (!err) {
                    this.loading = true;

                    this.loading = false;
                    this.$http
                        .post("/user/update", values)
                        .then(({ data }) => {
                            data;
                            this.$message.success(data.message);
                            this.loading = false;
                        })
                        .catch(({ response }) => {
                            this.$message.error(response.data.message);
                            this.loading = false;
                        });
                }
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.profile
  height: 600px
  background: #FFF
  border-radius: 6px
  transition: .3s
  padding: 10px 20px
  overflow: hidden
  .tab-content
    height: 515px
  .action
    margin-top: 20px
    padding: 10px 0
    border-top: 1px solid #ddd
</style>
