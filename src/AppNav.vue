<template>
    <el-row :gutter="20" class="header">
        <el-col :span="6"><img alt="Banner from Mc'Allans" src="./assets/Banner.jpg" class="logo"></el-col>
        <el-col :span="6"><router-link to="/" class="grid-content">Home</router-link></el-col>
        <el-col :span="6"><router-link to="/about" class ="grid-content">About Us</router-link></el-col>
        
        <el-col :span="6" v-if="logged">
            <el-dropdown>
                <span class="el-dropdown-link">
                    My Account<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-paperclip" v-on:click="copyPatronageCode()">Copy Patronage Code</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" divided v-on:click="logOut()">Sign Out</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
        <el-col :span="6" v-else><router-link to="/" class="grid-content">Login</router-link></el-col>
    </el-row>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import useClipboard from 'vue-clipboard3'
    import AuthService from './services/AuthService';

    const AppNav = defineComponent({
        name: "AppNav",
        methods: {
            logOut() {
                this.$store.dispatch('logout');
                this.$router.push({ name: 'Login', query: { redirect: '/' }});
            },
            async copyPatronageCode() {
                try {
                    console.log(this.$store.getters.getUser)
                    await useClipboard().toClipboard(this.$store.getters.getUser.PatronageCode);
                    console.log('Copied to clipboard');
                } catch (e) {
                    console.error(e);
                }
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

    export default AppNav;
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