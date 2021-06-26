<template>
    <div>
        <p>Sign Up</p>
        <input v-model="message" placeholder="Username" class="input"/>
        <br>
        <input v-model="password" placeholder="Password" class="input"/>
        <br>
        <input v-model="passwordConfirmed" placeholder="Confirm Again password" class="input"/>
        <br>
        <button v-on:click="validate" class="input">Submit</button>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'SignUp',
        data() {
            return {
                message: "",
                password: "",
                passwordConfirmed: ""
            }
        },
        methods: {
            validate() {

            },
        }
    }
</script>
