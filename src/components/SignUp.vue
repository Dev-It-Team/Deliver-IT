<template>
    <div>
        <p>Sign Up</p>
        <el-input v-model="email" placeholder="Username"></el-input>
        <br>
        <el-input v-model="password" placeholder="Password"></el-input>
        <br>
        <el-input v-model="passwordConfirmed" placeholder="Confirm Again password"></el-input>
        <br>
        <el-button v-on:click="validate">Submit</el-button>
        <p>{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    const SignUp = defineComponent({
        name: 'SignUp',
        data() {
            return {
                email: "",
                password: "",
                passwordConfirmed: "",
                errorMessage: "",
            }
        },
        methods: {
            validate() {
                let errMessage: string;

                errMessage = (this.email.length === 0) ? "Please fill out your email" :
                             (this.password.length === 0 || this.passwordConfirmed.length === 0) ? "Please fill out both password fields" :
                             (this.password !== this.passwordConfirmed) ? "Passwords are different!" :
                             "";
                
                this.errorMessage = errMessage;
            },
        }
    });
    export default SignUp;
</script>
