<template>
    <div>
        <p>Sign In</p>
        <input v-model="message" placeholder="Username" class="input"/>
        <br>
        <input v-model="password" placeholder="Password" class="input"/>
        <br>
        <button v-on:click="validate" class="input">Submit</button>
        <br>
        <p v-on:click="activateSignUp" to="/signIn">Does not have an account? Sign Up instead</p>

        <div v-if="displayed">
            <SignUp hidden/>
        </div>
    </div>
</template>

<script lang="ts">
    import SignUp from '@/components/SignUp.vue'; // @ is an alias to /src

    export default {
        name: 'Login',
        data() {
            return {
                message: "",
                password: "",
                displayed: false
            }
        },
        methods: {
            validate() {
                this.displayed = false
            },
            activateSignUp() {
                this.displayed = true
            }
        },
        components: {
            SignUp
        },
        created() {
            displayed = false;
        }
    }
</script>

<style>
    .input {
        margin: 10px;
        padding: 3px;
    }
</style>
