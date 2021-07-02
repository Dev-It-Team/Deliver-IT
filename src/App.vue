<template>
    <el-container class="is-vertical">
        <el-header>
            <AppNav/>
        </el-header>
        <el-main>
            <router-view />
        </el-main>
        <el-footer>
            <Footer/>
        </el-footer>
    </el-container>
</template>

<script lang="ts">
import AppNav from './AppNav.vue'
import { defineComponent } from 'vue'
import Footer from '@devitteam/footer/src/components/Footer.vue'

const App = defineComponent({
    components: {
        AppNav,
        Footer,
    },
})
export default App;
</script>

<style>
:root {
    font-family: "Helvetica Neue",Helvetica,"Sans Francisco UI",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
  padding: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
