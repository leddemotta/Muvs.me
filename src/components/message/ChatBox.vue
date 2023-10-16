<template>
  <div>
    <div class="chat" v-if="message.list.length > 0">
      <div class="profile">
        <a-row>
          <a-col :span="2">
            <a-avatar
              v-if="chatUser.avatar"
              class="avatar"
              :size="40"
              :src="chatUser.avatar"
            />
            <a-avatar v-else class="avatar" :size="40" icon="user" />
          </a-col>
          <a-col :span="20">
            {{ chatUser.first_name }}
            {{ chatUser.last_name }}</a-col
          >
          <a-col :span="2"></a-col>
        </a-row>
      </div>
      <div class="messages">
        <div
          v-for="(message, index) in message.list"
          class="message"
          :class="
            message.raw.created_by == $store.state.userData.id ? 'me' : 'other'
          "
          :key="index"
        >
          <span class="box">{{ message.content }}</span>
        </div>
      </div>

      <div class="send">
        <a-input
          v-model="messageToSend"
          placeholder="Mensagem...."
          enter-button
          @pressEnter="sendMessage"
          @click="getMessages"
          @blur="getMessages"
        >
          <template #suffix>
            <a-icon @click="sendMessage" type="right-circle" />
          </template>
        </a-input>
      </div>
      <!-- <pre>{{ message.list }}</pre> -->
    </div>
    <div v-else>Nenhuma mensagem</div>
  </div>
</template>

<script>
import MessageMixins from "@/mixins/message/mixin";

export default {
  props: {
    userId: String,
    chatUser: Object,
  },
  mixins: [MessageMixins],
  data() {
    return {
      messageToSend: "",
    };
  },
  methods: {
    sendMessage() {
      console.log(this.messageToSend);
      this.$http
        .post(`/message/create`, {
          user_id: this.userId,
          created_by: this.$store.state.userData.id,
          content: this.messageToSend,
        })
        .then(({ data }) => {
          this.messageToSend = "";
          this.getMessages();
        })
        .catch(({ response }) => {
          response;
          this.$message.error(response.data.message);
        });
    },
  },
  beforeMount() {
    this.message.filters.created_by.selected = [
      this.userId,
      this.$store.state.userData.id,
    ];

    this.message.filters.users.selected = [
      this.userId,
      this.$store.state.userData.id,
    ];

    this.getMessages();
  },
};
</script>

<style lang="sass" scoped>
.chat
  .profile
    height: 60px
    border-bottom: 1px solid #eee
    padding: 10px 10px
  .messages
    padding: 20px
    height: 480px
    overflow: auto
    display: flex
    flex-direction: column-reverse
    &::-webkit-scrollbar
      width: 6px
    &::-webkit-scrollbar-track
      background: #f1f1f1
    &::-webkit-scrollbar-thumb
      background:#bbb
    &::-webkit-scrollbar-thumb:hover
      background: #aaa
      opacity: 0.8
  .send
    height: 60px
    padding: 13px 10px
    border-top: 1px solid #eee
.message.me
  text-align: right
  .box
    border: 1px solid #ff4228
    background: #ff4228
    color: #FFF
.message
  margin-bottom: 10px
  .box
    max-width: 500px
    background: #fff
    border: 1px solid #eee
    padding: 10px 20px
    display: inline-block
    border-radius: 30px
</style>
