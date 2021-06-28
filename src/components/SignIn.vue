<template>
    <el-card class="box-card" style="max-width:480px">
        <template #header>
            <div class="card-header">
                <span>Sign In</span>
            </div>
        </template>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-button v-on:click="validate('ruleForm')" type="primary">Submit</el-button>
            </el-form>
        <slot></slot>
    </el-card>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import AuthService from '@/services/AuthService'
    import { ElMessage } from 'element-plus';

    const Login = defineComponent({
        name: 'SignIn',
        props: {
            filledEmail: String,
        },
        data() {
            const validateEmail = (rule: any, value: string, callback: Function) => {
                return /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/.test(value);
            };
            return {
                ruleForm: {
                    email: this.filledEmail,
                    password: "",
                },
                errorMessage: "",
                rules: {
                    email: [
                        { required: true, message: 'Please input email', trigger: 'blur' },
                        { validator: validateEmail, message: "Wrong email format", trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input password', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            validate(formName: string) {
                (this as any).$refs[formName].validate(async (valid: any) => {
                    if (valid) this.signIn();
                });
            },
            async signIn() {
                try {
                    const credentials = {
                        Email: this.ruleForm.email,
                        Password: this.ruleForm.password,
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

