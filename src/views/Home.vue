<template>
  <div class="home">
    <img alt="Banner from Mc'Allans" src="../assets/Banner.jpg">
    <Login/>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import Login from '@/components/Login.vue'; // @ is an alias to /src

  export default {
    name: "Home",
    created() {
      document.title = "Home"
    },
    components: {
      Login
    }
  }
</script>