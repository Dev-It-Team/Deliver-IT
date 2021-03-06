<template>
  <div class="home">
    <h1 class="mainTitle">
        Deliver'IT
    </h1>
    <transition name="component-fade">
        <SignIn v-if="!signUp" v-on:on-login-success="onLoginSuccess" v-bind:filledEmail="filledEmail">
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
    import SignIn from '@devitteam/signin'
    import SignUp from '@/components/SignUp.vue';
    import redirectUser from '@/router/loggedInRoutes';
    import { User } from '@/interfaces/IUser';
    import AuthService from '@/services/AuthService';
    import { ElMessage } from 'element-plus';


    const Login = defineComponent({
        name: "Login",
        created() {
            document.title = "Login"
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
            },
            async onLoginSuccess(token: string) {
                this.$store.dispatch('setToken', token);

                const user = await AuthService.decode();
                this.$store.dispatch('setUserInfo', user);

                ElMessage.success(`Welcome back! You are logged in as ${user.Email}.`);
                
                const result = await AuthService.loginLog(this.$store.getters.getUser.IdUser, { Description: "Connected" });
                console.log(this.$store.getters.isLoggedIn);
                redirectUser(user);
            }
        },
        mounted() {
            const user = this.$store.getters.getUser;
            if (Object.keys(user).length > 0) redirectUser(user);
        }
    });
    export default Login;
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
