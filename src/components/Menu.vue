<template>
    <h3>
        {{ menu.Name }}
    </h3>
    <p>
        {{ menu.Description }}
    </p>
    <p>
        Price: {{ menu.Price }}
    </p>
    <br>
    <p>
      <div v-for="product in menu.Products">
        <p>
          {{ product }}
        </p>
      </div>
    </p>
    <el-button v-on:click="$emit('delete-menu')" type="primary">Delete Menu</el-button>
</template>

<script lang="ts">
  import RestaurantsService from '@/services/RestaurantService';
  import { ElMessage } from 'element-plus';

  export default {
    name: "Menu",
    emits: ["delete-menu"],
    props: {
      menu: Object
    }
  }
</script>