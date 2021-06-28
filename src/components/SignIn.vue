<template>
    <el-card class="box-card" style="max-width:480px">
        <el-form label-width="120px" :label-position="right">
            <div class="card-header">
                <span>Sign In</span>
            </div>
            <el-input v-model="email" placeholder="your@email.com"></el-input>
            <el-input v-model="password" placeholder="Password" show-password></el-input>
            <el-button v-on:click="validate()" type="primary">Submit</el-button>
            <p class="danger">{{ errorMessage }}</p>
            <slot></slot>
        </el-form>
    </el-card>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import AuthService from '@/services/AuthService'
    import { ElMessage } from 'element-plus';

    const Login = defineComponent({
        name: 'SignIn',
        props: ['filledEmail'],
        data() {
            return {
                email: this.filledEmail,
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
                    // Sign In and save token
                    const response = await AuthService.signIn(credentials);
                    this.$store.dispatch('setToken', response.access_token);
                    // Store user info (decoded token)
                    const user = await AuthService.decode();
                    this.$store.dispatch('setUserInfo', user);

                    switch(user.UserFlag) {
                        case '1':
                            this.$router.push({ name: 'RestaurantHome', query: { redirect: '/restaurants' }});
                            break;

                        case '2':
                            this.$router.push({ name: 'DeliveryHome', query: { redirect: '/deliveries' }});
                            break;

                        default:
                            this.$router.push({ name: 'ClientHome', query: { redirect: '/clients' }});
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

