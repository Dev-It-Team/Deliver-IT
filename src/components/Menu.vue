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
    <el-button v-on:click="beginUpdate" type="primary">Update Menu</el-button>
    <br>
    <br>
    <MenuUpdate v-if="hidden" :allProducts="allProducts" :menu="menu" v-on:forceReload="$emit('forceReload')"/>
</template>

<script lang="ts">
  import RestaurantsService from '@/services/RestaurantService';
  import MenuUpdate from '@/components/MenuUpdate';
  import { ElMessage } from 'element-plus';

  export default {
    name: "Menu",
    components: {
      MenuUpdate
    },
    emits: ["delete-menu", "forceReload"],
    data() {
      return {
        hidden: false
      }
    },
    props: {
      menu: Object,
      allProducts: Array
    },
    methods: {
      beginUpdate() {
        this.hidden = !this.hidden;
      },
    }
  }
</script>