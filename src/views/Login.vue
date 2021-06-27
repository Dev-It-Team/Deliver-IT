<template>
  <div class="home">
    <img alt="Banner from Mc'Allans" src="../assets/Banner.jpg">
    <Login v-if="!signUp"/>
    <SignUp v-if="signUp"/>

    <el-button v-on:click="activateSignUp(true)" v-if="!signUp">Don't have an account? <strong>Sign Up</strong> instead</el-button>
    <el-button v-on:click="activateSignUp(false)" v-if="signUp">Already have an account? <strong>Sign In</strong> instead</el-button>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Login from '@/components/SignIn.vue'; // @ is an alias to /src
    import SignUp from '@/components/SignUp.vue';

    const Home = defineComponent({
        name: "Home",
        created() {
            document.title = "Home"
        },
        components: {
            Login,
            SignUp
        },
        data() {
            return {
                signUp: false,
                errorMessage: "",
            }
        },
        methods: {
            activateSignUp(activate: boolean) {
                this.signUp = activate;
            }
        }
    });
    export default Home;
</script>

<style>
    .el-form {
        max-width: 460px;
        margin: auto; /* center */
    }
    .el-input:not(:last-child) {
        margin: 5px 0; /* top & bottom */
    }
</style>
