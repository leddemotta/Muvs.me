<template>
    <div class="page-pd">
        <div class="container" style="width: 600px">
            <h1>Notificações</h1>
            <ListNotifications />
        </div>
    </div>
</template>

<script>
import userMixins from "@/mixins/user/mixin.js";
import ListNotifications from "@/components/notification/ListNotifications.vue";

export default {
    components: { ListNotifications },
    mixins: [userMixins],
    data() {
        return {};
    },
    beforeMount() {
        document.title = "Notificações";
        this.getUser(this.$store.state.userData.id);
    },
    methods: {},
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
