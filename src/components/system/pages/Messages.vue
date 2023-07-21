<template>
    <div class="page-pd">
        <h1>Mensagens</h1>
        <a-row :gutter="20">
            <a-col span="7">
                <div class="chat-prev">
                    <div class="search">
                        <a-input-search
                            placeholder="Buscar nomes..."
                            style="width: 100%"
                            @search="onSearchUsers"
                        />
                    </div>
                    <div class="scroll">
                        <div
                            v-for="(message, index) in message.list"
                            class="m-preview"
                            :key="index"
                            @click="chatWithUser(message.created_by)"
                        >
                            <a-row>
                                <a-col :span="4">
                                    <a-avatar
                                        v-if="message.created_by.avatar"
                                        class="avatar"
                                        :size="40"
                                        :src="message.created_by.avatar"
                                    />
                                    <a-avatar
                                        v-else
                                        class="avatar"
                                        :size="40"
                                        icon="user"
                                    />
                                </a-col>
                                <a-col :span="16">
                                    <div class="name">
                                        {{ message.created_by.first_name }}
                                        {{ message.created_by.last_name }}
                                    </div>
                                    <div class="message dotted-phrase">
                                        {{ message.content }}
                                    </div>
                                </a-col>
                                <a-col class="a-right" :span="4">
                                    <div class="time">{{ message.time }}</div>
                                    <div class="action">
                                        <a-icon type="more" />
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col span="17">
                <div class="chat">
                    <ChatBox
                        v-if="!loadingChat && chatUser != ''"
                        :userId="chatUser.id"
                        :chatUser="chatUser"
                        @loadingChatStatus="loadingChatStatus"
                    />
                    <div v-else class="a-center">
                        <img
                            src="../../../assets/images/message/Messaging.gif"
                        />
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import ChatBox from "@/components/message/ChatBox.vue";
import MessageMixins from "@/mixins/message/mixin";

export default {
    components: { ChatBox },
    mixins: [MessageMixins],
    data() {
        return {
            chatWithId: "",
            chatUser: "",
            loadingChat: false,
        };
    },
    beforeMount() {
        this.message.filters.groupBy = "created_by";
        this.message.filters.users.selected = [this.$store.state.userData.id];

        this.getMessages();
    },
    methods: {
        onSearchUsers() {},
        chatWithUser(user) {
            this.chatUser = user;
            this.loadingChat = true;

            setTimeout(() => {
                this.loadingChat = false;
            }, 100);
        },
    },
};
</script>

<style lang="sass" scoped>
.m-preview
  padding: 10px 10px
  background: #fff
  border-bottom: 1px solid #eee
  transition: .3s
  cursor: pointer
  .name
    font-weight: 800
  .message
    font-size: 12px
    color: #aaa
  .time
    font-size: 12px
    color: #aaa
.m-preview:last-child
  border: 0
.m-preview:hover
  transition: .3s
  background: #fafafa

.chat
  height: 600px
  background: #FFF
  border-radius: 6px
  transition: .3s
  overflow: hidden

.chat-prev
  height: 600px
  background: #FFF
  border-radius: 6px
  transition: .3s
  overflow: hidden
  .search
    padding: 15px 20px
    border-bottom: 1px solid #eee
  .scroll
    overflow: auto
    height: 600px
    &::-webkit-scrollbar
      width: 2px
.chat-prev::-webkit-scrollbar-track
  background: #f1f1f1
.chat-prev::-webkit-scrollbar-thumb
  background:#bbb

.chat-prev::-webkit-scrollbar-thumb:hover
  background: #aaa
  opacity: 0.8
</style>
