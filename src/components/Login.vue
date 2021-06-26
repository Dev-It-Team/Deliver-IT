<template>
    <div>
        <p>Sign In</p>
        <el-input v-model="email" placeholder="Username"></el-input>
        <br>
        <el-input v-model="password" placeholder="Password" show-password></el-input>
        <br>
        <el-button v-on:click="validate">Submit</el-button>
        <br>
        <p>{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    const Login = defineComponent({
        name: 'Login',
        data() {
            return {
                email: "",
                password: "",
                errorMessage: "",
            }
        },
        methods: {
            validate() {
                let errMessage: string;

                errMessage = (this.email.length === 0) ? "Please fill out your email" :
                             (this.password.length === 0) ? "Please fill out your password" :
                             "";
                
                this.errorMessage = errMessage;
            },
        }
    });
    export default Login;
</script>

