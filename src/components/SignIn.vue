<template>
    <el-form label-width="120px" :label-position="right">
        <p>Sign In</p>
        <el-input v-model="email" placeholder="Username"></el-input>
        <br>
        <el-input v-model="password" placeholder="Password" show-password></el-input>
        <br>
        <el-button v-on:click="validate">Submit</el-button>
        <br>
        <p class="danger">{{ errorMessage }}</p>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import AuthService from '@/services/AuthService.ts'
    import { ElMessage } from 'element-plus';

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

                if (!errMessage) this.signIn();
            },
            async signIn() {
                try {
                    const credentials = {
                        Email: this.email,
                        Password: this.password,
                    };
                    const response = await AuthService.signIn(credentials);
                    const token = response.token;
                    const user = response.user;

                    this.$store.dispatch('login', { token, user });

                } catch (error) {
                    ElMessage.error(error.response.data.message);
                }
            }
        }
    });
    export default Login;
</script>

