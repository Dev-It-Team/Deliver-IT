<template>
    <AppNav/>
    <router-view />
    <AppFooter/>
</template>

<script>
import AppNav from './AppNav.vue'
import AppFooter from './AppFooter.vue'

export default {
    components: {
        AppNav,
        AppFooter,
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
