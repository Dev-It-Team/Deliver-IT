<template>
    <div>
        <p>Sign In</p>
        <el-input v-model="email" placeholder="Username"></el-input>
        <br>
        <el-input v-model="password" placeholder="Password" show-password></el-input>
        <br>
        <el-button v-on:click="validate">Submit</el-button>
        <br>
        <p class="danger">{{ errorMessage }}</p>
    </div>
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
                    const token = response.access_token;
                    const user = await AuthService.decode();

                    this.$store.dispatch('login', { token, user });

                    switch(user.UserFlag) {
                        case '0':
                            this.$router.push({ name: 'ClientHome', query: { redirect: '/clients' }});
                            break;

                        case '1':
                            this.$router.push({ name: 'RestaurantHome', query: { redirect: '/restaurants' }});
                            break;

                        case '2':
                            this.$router.push({ name: 'DeliveryHome', query: { redirect: '/deliveries' }});
                            break;
                    }

                } catch (error) {
                    ElMessage.error(error.response.data.message);
                }
            }
        }
    });
    export default Login;
</script>

