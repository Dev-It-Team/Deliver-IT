<template>
    <el-card class="box-card" style="max-width:560px">
        <template #header>
            <div class="card-header">
                <span>Sign Up</span>
            </div>
        </template>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" :label-position="right">
            <el-alert center :closable="false" show-icon
                title="Please fill all the info bellow to sign up. You can't modify your account type later."
                type="info">
            </el-alert>
            <el-divider content-position="center">Your Personal Info</el-divider>
            <el-form-item label="First Name" prop="firstName">
                <el-input v-model="ruleForm.firstName"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Address" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="Birth Date" prop="birthDate">
                <el-date-picker type="date" placeholder="YYYY-MM-DD" format="YYYY-MM-DD" v-model="ruleForm.birthDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="Patronage Code" prop="patronageCode">
                <el-input v-model="ruleForm.patronageCode" prefix-icon="el-icon-s-promotion"></el-input>
            </el-form-item>
            <!-- User type -->
            <el-divider content-position="center">Your Account Type</el-divider>
            <el-form-item label="Account Type">
                <el-select v-model="ruleForm.userFlag" size="medium">
                    <el-option :value=0 label="Client"></el-option>
                    <el-option :value=1 label="Restaurant"></el-option>
                    <el-option :value=2 label="Delivery Driver"></el-option>
                </el-select>
            </el-form-item>
            <!-- Credentials -->
            <el-divider content-position="center">Your Credentials</el-divider>
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="passwordConfirmed">
                <el-input type="password" v-model="ruleForm.passwordConfirmed" autocomplete="off" show-password></el-input>
            </el-form-item>
            <!-- Form buttons -->
            <el-button type="primary" v-on:click="submitForm('ruleForm')">Create Account</el-button>
            <el-button v-on:click="resetForm('ruleForm')">Reset</el-button>

            <p>
                By using Deliver'IT you consent to respect our guidelines available <a href="https://dev-it-team.github.io/AP-IT-Doc/index.html">here</a>.
            </p>
            </el-form>
        <slot></slot>
    </el-card>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import AuthService from '@/services/AuthService'
    import { ElMessage } from 'element-plus';  

    const SignUp = defineComponent({
        name: 'SignUp',
        
        data() {
            const validateEmail = (rule: any, value: string, callback: Function) => {
                return /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/.test(value);
            };
            const validatePassword = (rule: any, value: string, callback: Function) => {
                if (value !== '') {
                    if ((this as any).ruleForm.passwordConfirmed !== '') {
                        (this as any).$refs.ruleForm.validateField('passwordConfirmed');
                    }
                    callback();
                }
            };
            const validatePasswordConfirmed = (rule: any, value: string, callback: Function) => {
                if (value !== (this as any).ruleForm.password) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
            };
            const validatePatronageCode = (rule: any, value: string, callback: Function) => {
                if (value === "" || !value) return true;
                else return /[\w]/.test(value);
            };
            return {
                ruleForm: {
                    email: "",
                    password: "",
                    passwordConfirmed: "",
                    name: "",
                    firstName: "",
                    address: "",
                    birthDate: "",
                    patronageCode: "",
                    userFlag: 0,
                },
                rules: {
                    firstName: [ { required: true, message: 'Please input your first name', trigger: 'blur' } ],
                    name: [ { required: true, message: 'Please input your familly name', trigger: 'blur' } ],
                    address: [ { required: true, message: 'Please input your address', trigger: 'blur' } ],
                    birthDate: [ { required: true, message: 'Please input your birth date', trigger: 'blur' } ],
                    email: [
                        { required: true, message: 'Please input email', trigger: 'blur' },
                        { validator: validateEmail, message: "Wrong email format", trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input password', trigger: 'blur' },
                        { validator: validatePassword, trigger: 'blur' },
                    ],
                    passwordConfirmed: [
                        { required: true, message: 'Please input password again', trigger: 'blur' },
                        { validator: validatePasswordConfirmed, trigger: 'blur' },
                    ],
                    patronageCode: [
                        { min: 10, message: 'Wrong length! It must be at least 10 character long', trigger: 'blur' },
                        { validator: validatePatronageCode, message: 'Wrong format! No space or symbol allowed.', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName: string) {
                (this as any).$refs[formName].validate(async (valid: any) => {
                    if (valid) {
                        // copy ruleForm except passwordConfirmed
                        const credentials = (({ PasswordConfirmed, ...o }) => o)(
                            // Capitalize each key: val -> Key: val
                            Object.fromEntries(Object.entries(this.ruleForm).map(([k, v]) => [k[0].toUpperCase() + k.slice(1), v]))
                        );
                        AuthService.signUp(credentials)
                            .then(() => {
                                ElMessage.success('Your account has been created');
                                this.$emit('signed-up', this.ruleForm.email);
                            })
                            .catch((error: any) => {
                                ElMessage.error(error.response.data.message);
                                console.error(error.response.data?.stackTrace);
                            });
                    } else {
                        ElMessage.error('Please fix all your errors and try submitting again');
                        return false;
                    }
                });
            },
            resetForm(formName: string) {
                (this as any).$refs[formName].resetFields();
            }
        }
    });
    export default SignUp;
</script>

<style scoped>
</style>