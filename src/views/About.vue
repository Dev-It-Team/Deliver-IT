<template>
  <div class="about">
    <p>
      We are a team of developers also know as Dev'IT.
    </p>
    <br>
    <a href = "https://github.com/Dev-It-Team">Dev-It-Team</a>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';

  export default class About extends Vue {
    created() {
      document.title = "About"
    }
  }
</script>