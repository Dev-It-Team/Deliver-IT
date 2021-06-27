<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" :label-position="right">
        <p>Your Personal info</p>
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
        <!-- User type -->
        <p>Your Account Type</p>
        <el-form-item label="Account Type">
            <el-select v-model="ruleForm.userFlag" size="medium">
                <el-option :value=0 label="Client"></el-option>
                <el-option :value=1 label="Restaurant"></el-option>
                <el-option :value=2 label="Delivery Man"></el-option>
            </el-select>
        </el-form-item>
        <p>Your Credentials</p>
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
        <el-form-item>
            <el-button type="primary" v-on:click="submitForm('ruleForm')">Create Account</el-button>
            <el-button v-on:click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import AuthService from '@/services/AuthService.ts'
    import { ElMessage } from 'element-plus';  

    const SignUp = defineComponent({
        name: 'SignUp',
        
        data() {
            let email = (rule: any, value: string, callback: Function) => {
                return /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/.test(value);
            };
            let validatePassword = (rule: any, value: string, callback: Function) => {
                if (value !== '') {
                    if ((this as any).ruleForm.passwordConfirmed !== '') {
                        (this as any).$refs.ruleForm.validateField('passwordConfirmed');
                    }
                    callback();
                }
            };
            let validatePasswordConfirmed = (rule: any, value: string, callback: Function) => {
                if (value !== (this as any).ruleForm.password) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
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
                    userFlag: 0,
                },
                errorMessage: "",
                rules: {
                    firstName: [ { required: true, message: 'Please input your first name', trigger: 'blur' } ],
                    name: [ { required: true, message: 'Please input your familly name', trigger: 'blur' } ],
                    address: [ { required: true, message: 'Please input your address', trigger: 'blur' } ],
                    birthDate: [ { required: true, message: 'Please input your birth date', trigger: 'blur' } ],
                    email: [
                        { required: true, message: 'Please input email', trigger: 'blur' },
                        { validator: email, message: "Wrong email format", trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input password', trigger: 'blur' },
                        { validator: validatePassword, trigger: 'blur' },
                    ],
                    passwordConfirmed: [
                        { required: true, message: 'Please input password again', trigger: 'blur' },
                        { validator: validatePasswordConfirmed, trigger: 'blur' },
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
                        )
                        AuthService.signUp(credentials)
                            .then(() => ElMessage.success('Your account has been created'))
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