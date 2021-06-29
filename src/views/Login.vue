<template>
  <div class="home">
    <h1 class="mainTitle">
        Deliver'IT
    </h1>
    <transition name="component-fade">
        <SignIn v-if="!signUp" v-bind:filledEmail="filledEmail">
            <el-button v-on:click="activateSignUp(true)" class="button-login-form-toogler">
                Don't have an account? <strong>Sign Up</strong> instead
            </el-button>
        </SignIn>
    </transition>
    <transition name="component-fade">
        <SignUp v-if="signUp" v-on:signed-up="signInAfterSignUp">
            <el-button v-on:click="activateSignUp(false)" class="button-login-form-toogler">
                Already have an account? <strong>Sign In</strong> instead
            </el-button>
        </SignUp>
    </transition>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import SignIn from '@/components/SignIn.vue'; // @ is an alias to /src
    import SignUp from '@/components/SignUp.vue';
    import redirectUser from '@/router/loggedInRoutes';

    const Home = defineComponent({
        name: "Home",
        created() {
            document.title = "Home"
        },
        components: {
            SignIn,
            SignUp
        },
        data() {
            return {
                signUp: false,
                filledEmail: "",
            }
        },
        methods: {
            activateSignUp(activate: boolean) {
                this.signUp = activate;
            },
            signInAfterSignUp(email: string) {
                this.signUp = false;
                this.filledEmail = email;
            }
        },
        mounted() {
            const user = this.$store.getters.getUser;
            if (Object.keys(user).length > 0) redirectUser(user);
        }
    });
    export default Home;
</script>

<style>
    .el-card {
        min-width: 300px;
        margin: auto;
    }
    .el-form {
        max-width: 460px;
        margin: auto; /* center */
    }
    .el-input:not(:last-child) {
        margin: 5px 0; /* top & bottom */
    }
    .button-login-form-toogler {
        margin-top: 20px !important;
        white-space: normal !important;
    }

    .mainTitle {
        margin-bottom: 45px;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transform: translateX(-800px);
        position: absolute;
    }
    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }
</style>
