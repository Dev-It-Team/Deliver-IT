<template>
  <el-card class="box-card" style="max-width:560px">
    <template #header>
        <div v-on:click="hide()" class="card-header">
            <span>Update your User information</span>
        </div>
    </template>
    <div v-if="!hidden">
    <el-form v-on:keyup.enter="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="Name" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="FirstName" prop="userFirstName">
            <el-input v-model="ruleForm.userFirstName"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="userEmail">
            <el-input v-model="ruleForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="BirthDate" prop="userBirthDate">
            <el-input v-model="ruleForm.userBirthDate"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="userAddress">
            <el-input v-model="ruleForm.userAddress"></el-input>
        </el-form-item>
        <el-button v-on:click="submitForm('ruleForm')" type="primary">Update</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
    import axios, { AxiosResponse } from 'axios';
    import AuthService from '../services/AuthService';
    import { ElMessage } from 'element-plus';
    import { defineComponent } from 'vue';

    const UserUpdate = defineComponent({
        name: "UserUpdate",
        emits: ["forceReload"],
        data() {
            const validateName = (rule: any, value: string, callback: Function) => {
                return /[\w',.-\s]+/.test(value);
            };
            const validateEmail = (rule: any, value: string, callback: Function) => {
                return /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/.test(value);
            };
            return {
                hidden: true,
                ruleForm: {
                    userName: this.user.Name,
                    userFirstName: this.user.FirstName,
                    userEmail: this.user.Email,
                    userBirthDate: this.user.BirthDate,
                    userAddress: this.user.Address,
                },
                errorMessage: "",
                rules: {
                    userName: [
                        { required: true, message: 'Please input a name', trigger: 'blur' },
                        { validator: validateName, message: "Wrong name format", trigger: 'blur' }
                    ],
                    userFirstName: [
                        { required: true, message: 'Please input a firstname', trigger: 'blur' },
                        { validator: validateName, message: "Wrong firstname format", trigger: 'blur' }
                    ],                        
                    userEmail: [
                        { required: true, message: 'Please input an email', trigger: 'blur' },
                        { validator: validateEmail, message: "Wrong email format", trigger: 'blur' }
                    ],
                    userBirthDate: [
                        { required: true, message: 'Please input a birthdate', trigger: 'blur' },
                        { validator: validateName, message: "Wrong date format", trigger: 'blur' }
                    ],
                    userAddress: [
                        { required: true, message: 'Please input an address', trigger: 'blur' },
                    ],
                }
            }
        },
        props: {
            user: {} as any
        },
        methods: {
            submitForm(formName: string) {
                (this as any).$refs[formName].validate(async (valid: any) => {
                    if (valid) {
                        this.triggerUpdateUser();
                    } else {
                        return false;
                    }
                });
            },
            hide() {
                this.hidden = !this.hidden;
            },
            resetForm(formName: string) {
                (this as any).$refs[formName].resetFields();
            },
            async triggerUpdateUser() { 
    
                const newUser = { 
                    Name: this.ruleForm.userName, 
                    FirstName: this.ruleForm.userFirstName, 
                    Email: this.ruleForm.userEmail, 
                    BirthDate: this.ruleForm.userBirthDate, 
                    Address: this.ruleForm.userAddress, 
                }; 
    
                try { 
                    const created = await AuthService.updateUser(newUser, (this as any).user.IdUser); 
    
                    ElMessage.success(`Your account is updated!`); 
                    (this as any).$emit('forceReload'); 
                } 
                catch(error) { 
                    ElMessage.error('Your account cannot be updated'); 
                } 
            }

        },
    });
    export default UserUpdate;
</script>