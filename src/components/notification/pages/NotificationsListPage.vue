<script setup>
import { onMounted } from "vue";
import {
  MenuOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";

import notificationReusables from "../reusables/notificationReusables";
import PageHeader from "@/components/general/PageHeader.vue";

const { notifications, listNotificationes, updateNotification } =
  notificationReusables;

const onClickMarkAsRead = async (notification) => {
  notification.isRead = true;
  await updateNotification(notification._id, notification);
  await listNotificationes();
};

const onClickMarkAsUnRead = async (notification) => {
  notification.isRead = false;
  await updateNotification(notification._id, notification);
  await listNotificationes();
};

onMounted(() => {
  listNotificationes();
});
</script>

<template>
  <section class="pd-20">
    <div class="wrapper">
      <PageHeader class="mt-20 mb-10" title="Notificações" />
      <div class="notifications">
        <aList item-layout="horizontal" :data-source="notifications.list">
          <template #renderItem="{ item }">
            <div class="notification" :class="item.isRead ? 'readed' : ''">
              <aRow type="flex" align="middle" :gutter="16">
                <aCol :span="3">
                  <img
                    src="@/assets/images/profile-pic.png"
                    width="60"
                    style="
                      position: relative;
                      top: 2px;
                      left: 3px;
                      border-radius: 50px;
                    "
                  />
                </aCol>

                <aCol :span="19">
                  <div class="title">{{ item.title }}</div>
                  <div class="description">{{ item.content }}</div>
                  <div class="date">
                    {{
                      item.sentByUserId
                        ? `${item.sentByUser.firstName} ${item.sentByUser.lastName} - `
                        : `MUVS.ME -`
                    }}
                    {{ item.createdAt }}
                  </div>
                </aCol>

                <aCol :span="2">
                  <aPopover placement="bottom" trigger="click">
                    <template #content>
                      <div class="notification-actions">
                        <a-button
                          v-if="item.isRead == 0"
                          @click="onClickMarkAsRead(item)"
                        >
                          <EyeInvisibleOutlined />
                          Marcar como lida
                        </a-button>
                        <a-button
                          v-if="item.isRead == 1"
                          @click="onClickMarkAsUnRead(item)"
                        >
                          <EyeOutlined /> Marcar como não lida
                        </a-button>
                      </div>
                    </template>
                    <MenuOutlined />
                  </aPopover>
                </aCol>
              </aRow>
            </div>
          </template>
        </aList>

        <div v-if="notifications.list.length == 0" class="no-results">
          Nenhuma notificação até o momento.
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.no-results
  padding: 30px 10px
  font-size: 12px
  font-style: italic
  color: #999
  text-align: center

.wrapper
  margin: 0 auto
  max-width: 600px
  .notifications
    background: #FFF
    position: relative
    padding: 5px
    border-radius: 6px
    .notification
      padding: 12px 10px
      border-bottom: 1px solid #e8e8e8
      transition: .3s
      line-height: 1.2
      .title
        margin-bottom: 5px
        font-size: 14px
        font-weight: 700
      .description
        width: 100%
        padding-right: 5px
        font-size: 14px
        color: #666
      .date
        font-size: 9px
        padding-top: 10px

    .notification:hover
      transition: .3s
      background: #fafafa
    .notification:last-child
      border: 0
    .notification.readed
      filter: grayscale(100%)
      opacity: 0.5
</style>
