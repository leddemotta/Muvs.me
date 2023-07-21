<template>
    <div>
        <div v-if="$store.state.isLoggedIn">
            <HomeSystem />
        </div>
        <div v-if="!$store.state.isLoggedIn">
            <Home />
        </div>
    </div>
</template>

<script>
import Home from "./public/Home.vue";
import HomeSystem from "./private/Home.vue";

export default {
    components: { Home, HomeSystem },
    methods: {},
};
</script>

<style lang="sass"></style>
