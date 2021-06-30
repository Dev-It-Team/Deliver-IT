<template>
  <RestaurantCreation v-if="!restaurant"/>
  <div v-else>
    <h1>
      Your restaurant: {{ restaurant.NameRestaurant }}
    </h1>

    <ProductCreation v-bind:id="restaurant.IdRestaurant"/>

    <h2>
      Your products:
    </h2>

    <div v-for="product in productsList">
      <Product v-bind:product="product" />
    </div>
    <br>

    <br>
    
    <MenuCreation/>

    <h2>
      Your menus:
    </h2>

    <div v-for="menu in menusList">
      <Menu/>
    </div>

    <br>

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import RestaurantCreation from '@/components/RestaurantCreation.vue';
  import ProductCreation from '@/components/ProductCreation.vue';
  import MenuCreation from '@/components/MenuCreation.vue';
  import RestaurantCreation from '@/components/RestaurantCreation.vue';
  import Product from '@/components/Product.vue';
  import Menu from '@/components/Menu.vue';
  import RestaurantService from '@/services/RestaurantService';
  import axios from 'axios';
  const url = 'http://localhost:3000/';

  const RestaurantHome = defineComponent({
    name: "RestaurantHome",
    data() {
      return {
        productsList: null,
        menusList: null,
        banner: null,
        restaurant: null,
      }
    },
    components: {
      RestaurantCreation,
      Product,
      Menu,
      ProductCreation,
      MenuCreation
    },
    created() {
      document.title = "Acceuil Restaurants";
    },
    async mounted() {
      const result = await RestaurantService.getMyRestaurant({IdUser: this.$store.getters.getUser.IdUser});
      this.restaurant = result[0];

      const products = await RestaurantService.getRestaurantProducts(this.restaurant.IdRestaurant);
      this.productsList = products;

      const menus = await RestaurantService.getRestaurantMenus(this.restaurant.IdRestaurant);
      this.menusList = menus;
    }
  });
  export default RestaurantHome;
</script>