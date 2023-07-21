<template>
    <div>
        <!-- <div id="notifications">
            <a-list
                v-if="notifications.length > 0"
                item-layout="horizontal"
                :data-source="notifications"
            >
                <a-list-item
                    class="notification"
                    :class="`
                        ${item.is_read == 0 ? 'unreaded' : 'readed'} ${
                        item.action ? 'clickable' : ''
                    }
                    `"
                    slot="renderItem"
                    slot-scope="item"
                >
                    <a-list-item-meta>
                        <template slot="avatar">
                            <img
                                v-if="item.created_by == 0"
                                src="../../assets/images/profile-pic.png"
                                width="60"
                                style="
                                    position: relative;
                                    top: 2px;
                                    left: 3px;
                                    border-radius: 50px;
                                "
                            />

                            <img
                                v-if="item.created_by != 0"
                                :src="item.created_by.meta.avatar"
                                width="40"
                                style="
                                    position: relative;
                                    top: 2px;
                                    left: 3px;
                                    border-radius: 50px;
                                "
                            />
                        </template>

                        <template slot="description">
                            <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                :gutter="16"
                            >
                                <a-col :span="22">
                                    <div class="title" v-if="item.title">
                                        {{ item.title }}
                                    </div>
                                    <div
                                        class="txt"
                                        @click="goToPage(item.action)"
                                        v-html="formatText(item.content)"
                                    ></div>
                                    <div class="date">
                                        {{
                                            item.created_by != 0
                                                ? `${item.created_by.first_name} ${item.created_by.last_name} - `
                                                : `MUVS.ME -`
                                        }}
                                        {{ formatDate(item.created) }}
                                    </div>
                                </a-col>
                                <a-col :span="2">
                                    <a-popover
                                        placement="bottomRight"
                                        trigger="click"
                                    >
                                        <template slot="content">
                                            <div
                                                class="notification-actions"
                                                style="width: 200px"
                                            >
                                                <a-button
                                                    v-if="item.is_read == 0"
                                                    @click="read(item.id)"
                                                >
                                                    <a-icon
                                                        type="eye-invisible"
                                                    />
                                                    Marcar como lida
                                                </a-button>
                                                <a-button
                                                    v-if="item.is_read == 1"
                                                    @click="unRead(item.id)"
                                                >
                                                    <a-icon type="eye" /> Marcar
                                                    como não lida
                                                </a-button>

                                            </div>
                                        </template>
                                        <a-icon
                                            type="menu"
                                            style="
                                                position: relative;
                                                font-size: 18px;
                                                cursor: pointer;
                                            "
                                        />
                                    </a-popover>
                                </a-col>
                            </a-row>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
            <div
                v-if="notifications.length == 0"
                style="
                    padding: 30px 10px;
                    font-size: 12px;
                    font-style: italic;
                    color: #999;
                    text-align: center;
                "
            >
                Nenhuma notificação até o momento.
            </div>

        </div> -->
    </div>
</template>

<script>
//import { parse, format } from "date-fns";
import replaceOnce from "replace-once";

export default {
    data() {
        return {
            loading: false,
            notifications: [],
        };
    },
    beforeMount() {
        this.getNotifications();
    },
    methods: {
        formatText(text) {
            let find = ["<p><br></p>", "<img "];
            let replace = ["", "<img id='img-uploaded' "];

            return replaceOnce(text, find, replace, "gi");
        },
        formatDate(date) {
            let theDate = parse(date, "yyyy-MM-dd HH:mm:ss", new Date());
            return format(theDate, "dd/MM/yyyy HH:mm");
        },
        getNotifications() {
            this.$http
                .get(
                    `/notification/list?page=1&per_page=100&user_id=${this.$store.state.userData.id}`
                )
                .then(({ data }) => {
                    this.notifications = data.data;

                    this.$root.notificationsCount = data.meta.total_unread;
                    this.$emit("totalUnread", data.meta.total_unread);
                      Vue.component('header').update
                })
                .catch(({ response }) => {
                    response;
                    console.log(response.data.data);

                    this.notifications = response.data.data;

                    this.$emit("totalUnread", response.data.meta.total_unread);
                });
        },
        goToPage(action) {
            if (action && !action.includes("http")) {
                this.$router.push(action);
            }

            if (action && action.includes("http")) {
                window.open(action, "_blank");
            }
        },
        read(id) {
            this.$http
                .post("/notification/update-field", {
                    id,
                    field: "is_read",
                    value: "1",
                })
                .then(({ data }) => {
                    data;
                    this.getNotifications();
                })
                .catch(({ response }) => {
                    this.$message.error(response.data.message);
                });
        },
        unRead(id) {
            this.$http
                .post("/notification/update-field", {
                    id,
                    field: "is_read",
                    value: "0",
                })
                .then(({ data }) => {
                    data;
                    this.getNotifications();
                })
                .catch(({ response }) => {
                    this.$message.error(response.data.message);
                });
        },
        deleteNotification(id) {
            this.loading = true;
            this.notifications = [];
            this.$http
                .post("/notification/delete", {
                    id,
                })
                .then(({ data }) => {
                    data;
                    this.getNotifications();
                    this.loading = false;
                })
                .catch(({ response }) => {
                    this.$message.error(response.data.message);
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="sass" scoped>
#notifications
  background: #FFF
  position: relative
  max-width: 600px
  padding: 5px
  border-radius: 6px
  strong
    font-weight: 500 !important
  .ant-list-item-meta-title
    margin-bottom: 0
    font-size: 14px
    font-weight: 700
  .ant-list-item-meta-description
    font-size: 11px
    line-height: 1.3
    font-weight: 500
    color: #999
  .notification.readed
    filter: grayscale(100%)
    .ant-list-item-meta
      opacity: 0.5
  .notification.clickable
    .txt
      cursor: pointer
  .notification
    padding: 12px 10px
    .ant-list-item-meta-title
      width: 100%
      line-height: 16px
      padding-bottom: 8px
    .date
      font-size: 9px
      padding-top: 10px
    .title
      margin-bottom: 5px
      font-size: 14px
      font-weight: 700
    .txt
      width: 100%
      padding-right: 5px
      font-size: 14px
      color: #666
  .ant-list-item:first-child
    margin-top: 1px
  .ant-list-item:last-child
    padding-bottom: 10px !important
  .ant-list-item
    transition: .3s
  .ant-list-item:hover
    transition: .3s
    background: #fafafa

.notification-actions
  button
    text-align: left
    border: 0
    width: 100% !important
    color: #999 !important
    font-size: 13px
    line-height: 20px
    margin-bottom:  2px
    i
      font-size: 14px !important
      color: #999 !important
    &:hover
      background: #f6f6f6
      color: #444 !important
      i
          color: #444 !important
</style>
