<template>
    <div>
        <a @click="$router.go(-1)"> <a-icon type="left-circle" /> Voltar </a>

        <h1 class="mt-20 mb-30">
            <img src="../../assets/images/logo.png" width="200" alt="muvsme" />
        </h1>

        <p
            class="mb-20"
            style="font-size: 14px; font-weight: 600; line-height: 1.3"
        >
            Como deseja se cadastrar? 😊
        </p>

        <a-button
            class="w100 mt-10 bolder"
            type="primary"
            size="large"
            ghost
            @click="signin()"
        >
            Cadastrar com E-mail
        </a-button>

        <GoogleLogin
            :params="google.params"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
            style="padding: 0; border: 0; background: none; width: 100%"
        >
            <a-button
                class="w100 mt-20 bolder"
                type="primary"
                size="large"
                :disabled="true"
                ghost
            >
                Cadastrar com Google
            </a-button></GoogleLogin
        >

        <a-button class="w100 mt-20 bolder" type="primary" size="large" ghost :disabled="true">
            Cadastrar com Facebook
        </a-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            // google: {
            //     params: {
            //         client_id:
            //             "424951968750-ddhuuotiubqke99o0om1vo7kubi44oej.apps.googleusercontent.com",
            //         scope: "profile email",
            //         prompt: "select_account",
            //     },
            // },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true,
            },
        };
    },
    mounted() {},
    methods: {
        signin() {
            this.$router.push(`/signin`);
        },
        onSuccess(googleUser) {
            console.log("onSuccess", googleUser);

            console.log("onSuccess", googleUser.getBasicProfile());
        },
        loginWithGoogle() {
            this.$gAuth
                .signIn()
                .then((GoogleUser) => {
                    console.log("GoogleUser", GoogleUser);
                    var userInfo = {
                        loginType: "google",
                        google: GoogleUser,
                    };
                    this.$store.commit("setLoginUser", userInfo);
                    router.push("/home");
                })
                .catch((error) => {
                    console.log("error", error);
                });
        },
    },
};
</script>
