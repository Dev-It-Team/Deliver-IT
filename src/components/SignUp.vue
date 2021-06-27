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
        <!-- TODO: User type -->
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
                    birthDate: ""
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
            async signUp() {
                // try {
                //     const credentials = {
                //         Name: this.name,
                //         FirstName: this.firstName,
                //         Email: this.email,
                //         Address: this.address,
                //         Password: this.password,
                //         BirthDate: this.birthDate,
                //         UserFlag: 0 //TODO: Determine UserFlag dynamically
                //     };
                //     const response = await AuthService.signUp(credentials);
                //     this.msg = response.msg;
                // } catch (error) {
                //     this.msg = error.response.data.msg;
                // }
            },
            submitForm(formName: string) {
                (this as any).$refs[formName].validate((valid: any) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    });
    export default SignUp;
</script>

<style scoped>
</style>