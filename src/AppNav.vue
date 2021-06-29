<template>
    <el-row :gutter="20" class="header">
        <el-col :span="6"><img alt="Banner from Mc'Allans" src="./assets/Banner.jpg" class="logo"></el-col>
        <el-col :span="6"><router-link to="/" class="grid-content">Home</router-link></el-col>
        <el-col :span="6"><router-link to="/about" class ="grid-content">About Us</router-link></el-col>

        <el-col :span="6" v-if="logged"><a v-on:click="logOut()" class="grid-content">LogOut</a></el-col>
        <el-col :span="6" v-else><router-link to="/" class="grid-content">Login</router-link></el-col>
    </el-row>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    const Home = defineComponent({
        name: "AppNav",
        methods: {
            logOut() {
                this.$store.dispatch('logout');
                this.$router.push({ name: 'Login', query: { redirect: '/' }});
            }
        },
        computed: {
            logged: {
                get: function () {
                    return this.$store.getters.isLoggedIn != ""
                },
                set: function (newValue) {
                    this.logged = newValue
                }
            }
        }
    });

    export default Home;
</script>

<style scoped>
    .header {
        margin: 5px;
    }

    .logo {
        height: 75px;
        width: 250px;
    }
</style>