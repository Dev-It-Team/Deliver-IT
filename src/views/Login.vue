<template>
  <div class="home">
    <img alt="Banner from Mc'Allans" src="../assets/Banner.jpg">

        <SignIn v-if="!signUp" v-bind:filledEmail="filledEmail">
            <el-button v-on:click="activateSignUp(true)" class="button-login-form-toogler">
                Don't have an account? <strong>Sign Up</strong> instead
            </el-button>
        </SignIn>
        <SignUp v-if="signUp" v-on:signed-up="signInAfterSignUp">
            <el-button v-on:click="activateSignUp(false)" class="button-login-form-toogler">
                Already have an account? <strong>Sign In</strong> instead
            </el-button>
        </SignUp>

  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import SignIn from '@/components/SignIn.vue'; // @ is an alias to /src
    import SignUp from '@/components/SignUp.vue';

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
        }
    });
    export default Home;
</script>

<style>
    .el-card {
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
    }
</style>
