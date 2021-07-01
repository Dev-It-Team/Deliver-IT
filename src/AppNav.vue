<template>
    <el-row :gutter="20" class="header">
        <el-col :span="6"><img alt="Deliver'IT icon" src="./assets/Banner.png" class="logo"></el-col>
            <el-col :span="6" v-if="isRestaurant"><router-link to="/restaurants" class="grid-content">Restaurant Page</router-link></el-col>
            <el-col :span="6" v-else-if="isDeliver"><router-link to="/deliveries" class="grid-content">Deliver Page</router-link></el-col>
            <el-col :span="6" v-else-if="logged"><router-link to="/clients" class="grid-content">Purchase Page</router-link></el-col>
            <el-col :span="6" v-else><router-link to="/" class="grid-content">Homepage</router-link></el-col>
        <el-col :span="6"><router-link to="/about" class ="grid-content">About Us / Your Data</router-link></el-col>
        
        <el-col :span="6" v-if="logged">
            <el-dropdown class="account">
                <span class="el-dropdown-link">
                    My Account<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-paperclip" v-on:click="copyPatronageCode()">Copy Patronage Code</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-user" v-on:click="loadAccountPage()">Account Page</el-dropdown-item>
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
    import router from '@/router/index'

    const AppNav = defineComponent({
        name: "AppNav",
        methods: {
            logOut() {
                this.$store.dispatch('logout');
                router.push({ name: 'Login', query: { redirect: '/' }});
            },
            async copyPatronageCode() {
                try {
                    await useClipboard().toClipboard(this.$store.getters.getUser?.PatronageCode);
                    console.log('Copied to clipboard');
                } catch (e) {
                    console.error(e);
                }
            },
            loadAccountPage() {
                router.push({ name: 'Home', query: { redirect: '/home' } });
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
            },
            isRestaurant: {
                get: function () {
                    return this.$store.getters.getUser.UserFlag == 1
                },
                set: function (newValue) {
                    this.isRestaurant = newValue
                }
            },
            isDeliver: {
                get: function () {
                    return this.$store.getters.getUser.UserFlag == 2
                },
                set: function (newValue) {
                    this.isDeliver = newValue
                }
            }
        }
    });

    export default AppNav;
</script>

<style>
    .header {
        margin: 5px;
    }

    .header > .el-col {
        margin: auto;
    }

    .logo {
        max-width: 60px;
        float: left;
    }

    .account {
        float: right !important;
    }

    .el-dropdown-link:hover {
        cursor: default;
    }
</style>