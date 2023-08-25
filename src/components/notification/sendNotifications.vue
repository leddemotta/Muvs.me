<template>
  <div>
    <a-row class="notifications-page">
      <a-col :span="6"> </a-col>
      <a-col
        :span="12"
        style="background: #fff; padding: 30px 30px 0; margin-top: 40px"
      >
        <a-alert
          class="mb-30"
          type="info"
          message="Utilize os campos abaixo para enviar mensagens de notificação para os usuários do sistema:"
          banner
        />

        <a-row :gutter="[20, 20]" class="mb-30">
          <a-col :span="24">
            <label class="label mb-10"> Selecione o destinatário: </label>
            <a-radio-group v-model="notification.receiver" name="radioGroup">
              <a-radio value="all"> Todos usuários do sistema </a-radio>
              <a-radio value="specific"> Usuário específico </a-radio>
              <a-radio value="group"> Grupo de usuários </a-radio>
            </a-radio-group>
          </a-col>

          <a-col v-if="notification.receiver == 'group'" :span="12">
            <label class="label"> Selecione o grupo: </label>
            <a-select
              class="travel-input"
              placeholder="Função"
              show-search
              v-model="notification.role"
              style="width: 100%"
            >
              <a-select-option
                v-for="(item, index) of roles"
                :key="index"
                :value="item.value"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>

          <a-col
            v-if="notification.receiver == 'specific'"
            :span="24"
            class="travel-input mb-10"
          >
            <label class="label mb-10"> ID do usuário: </label>
            <a-select
              class="travel-input"
              placeholder="Usuário"
              show-search
              v-model="notification.user_id"
              style="width: 100%"
              mode="multiple"
            >
              <a-select-option
                v-for="(item, index) of listUsers"
                :key="index"
                :value="item.id"
              >
                {{ item.id }} - {{ item.first_name }}
                {{ item.last_name }}
              </a-select-option>
            </a-select>
          </a-col>

          <div class="clearfix" />

          <a-col class="travel-input" :span="12">
            <label class="label mb-10"> Título da notificação: </label>
            <a-input
              v-model="notification.title"
              placeholder="Escreva o título"
            />
          </a-col>

          <a-col class="travel-input" :span="12">
            <label class="label mb-10"> Link de destino </label>
            <a-input
              class="travel-input"
              v-model="notification.url"
              placeholder="Ex: /contracts/list ou https://viajarresorts.com.br"
            />
          </a-col>

          <a-col class="mt-30" :span="24">
            <label class="label mb-10"> Mensagem: </label>
            <vue-editor
              v-model="notification.content"
              placeholder="Digite o texto aqui"
              :editor-toolbar="customToolbar"
              :useCustomImageHandler="true"
              @image-added="upload"
            ></vue-editor>
          </a-col>

          <a-col :span="24">
            <a-button
              type="primary"
              :loading="notification.loading"
              @click="sendNotifications()"
            >
              Enviar notificação
            </a-button>
          </a-col>
        </a-row>

        <!-- <pre>{{ notification }} </pre> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import roles from "../../json/roles.json";
export default {
  components: { VueEditor },
  data() {
    return {
      roles,
      listUsers: [],
      notification: {
        role: undefined,
        title: undefined,
        content: undefined,
        receiver: "all",
        user_id: undefined,
        url: undefined,
        loading: false,
      },
      customToolbar: [
        [
          {
            header: [false, 1, 2, 3, 4, 5, 6],
          },
        ],
        ["bold", "italic", "underline", "strike"],

        [{ list: "ordered" }, { list: "bullet" }],
        [
          "link",
          "blockquote",
          {
            color: [],
          },
          {
            background: [],
          },
        ],
        ["clean", "image"],
      ],
    };
  },
  beforeCreate() {
    this.$http
      .post("/user/read")
      .then(({ data }) => {
        this.listUsers = data;
      })
      .catch(({ response }) => {
        response;
      });
  },
  methods: {
    upload(file, Editor, cursorLocation) {
      var formData = new FormData();
      formData.append("file", file);

      this.$http
        .post(
          `https://api.viajar.tur.br/v1/media/upload-to-s3?module=notes&id=options/notifications&sub-folder=`,
          formData
        )
        .then(({ data }) => {
          data;
          Editor.insertEmbed(cursorLocation, "image", data.url);
          //         resetUploader();
        });
    },
    sendNotifications() {
      if (this.notification.content) {
        this.notification.loading = true;
        this.$http
          .post("/notification/send.php", this.notification)
          .then(({ data }) => {
            data;
            this.$message.success(data.message);
            this.notification.loading = false;
          })
          .catch(({ response }) => {
            response;
            this.$message.error(response.message);
            this.notification.loading = false;
          });
      } else {
        this.$message.warning("Escreva uma mensagem no campo.");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.ant-alert-info
    font-size: 12px
.label
    font-size: 11px
    font-weight: 600
    color: #444
    display: block
    z-index: 1
.quillWrapper
    border: 1px solid #eee
.ant-radio-wrapper
    font-size: 13px
    font-weight: 500
</style>
