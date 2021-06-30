<template>
    <el-card class="box-card" style="max-width:480px">
        <template #header>
            <div class="card-header">
                <span>Sign In</span>
            </div>
        </template>
        <el-form v-on:keyup.enter="validate('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk="true" label-width="120px">
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
    import RestaurantService from '@/services/RestaurantService';
    import { ElMessage } from 'element-plus';
    import { User } from '@/interfaces/IUser';

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
                    email: this.filledEmail || "",
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
            async getRestaurant() {
                return await RestaurantService.getMyRestaurant({IdUser: this.$store.getters.getUser.IdUser});
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
                    const user: User = await AuthService.decode();
                    this.$store.dispatch('setUserInfo', user);

                    ElMessage.success(`Welcome back! You are logged in as ${user.Email}.`);

                    switch(user.UserFlag.toString()) {
                        case '1':
                            const restaurant = await this.getRestaurant();
                            
                            this.$router.push({ name: 'RestaurantHome', query: { 
                                IdRestaurant: restaurant[0].IdRestaurant,
                                Banner: restaurant[0].Banner,
                                NameRestaurant: restaurant[0].NameRestaurant
                                }});
                            break;

                        case '2':
                            this.$router.push({ name: 'DeliveryHome', query: { redirect: '/deliveries' }});
                            break;

                        default:
                            this.$router.push({ name: 'ClientHome', query: { redirect: '/clients' }});
                            break;
                    }

                } catch (error) {
                    console.error(error);
                    // Server-handled error
                    if (error?.response)
                        ElMessage.error(error.response.data.message);
                    // Not handled error
                    else
                        ElMessage.error(error.message);
                }
            }
        }
    });
    export default Login;
</script>

