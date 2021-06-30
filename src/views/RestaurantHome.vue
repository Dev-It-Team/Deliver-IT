<template>
  <RestaurantCreation v-if="!restaurant"/>
  <div v-else>
    <h1>
      Your restaurant: {{ restaurant.NameRestaurant }}
    </h1>

    <ProductCreation v-bind:id="restaurant.IdRestaurant"/>

    <div v-if="productsList && productsList.length > 0">
      <h2>
        Your products:
      </h2>

      <div v-for="product in productsList">
        <Product v-bind:product="product" v-on:delete-product="deleteProduct(product)"/>
      </div>
      <br>
    </div>

    <br>
    
    <MenuCreation v-bind:id="restaurant.IdRestaurant" v-bind:products="productsList"/>
    <div v-if="menusList && menusList.length > 0">
      <h2>
        Your menus:
      </h2>

      <div v-for="menu in menusList">
        <Menu v-bind:menu="menu" v-on:delete-menu="deleteMenu(menu)"/>
      </div>
    </div>

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
  import { ElMessage } from 'element-plus';

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

      console.log(this.$store.getters.isLoggedIn)
    },
    methods: {
      async deleteMenu(menu) {
        try {
          console.log(this.restaurant.IdRestaurant);
          console.log(menu._id);
          console.log(this.menusList.indexOf(menu));
          const result = await RestaurantService.deleteMenu(this.restaurant.IdRestaurant, menu._id);
          ElMessage.success(`Menu deleted!`);
          this.menusList.splice(this.menusList.indexOf(menu), 1);
        }
        catch(error) {
          console.log(error);
            this.$message.error('Menu cannot be deleted');
        }
      },
      async deleteProduct(product) {
          try {
            const result = await RestaurantService.deleteProduct(this.restaurant.IdRestaurant, product._id);
            ElMessage.success(`Product deleted!`);
            this.productsList.splice(this.productsList.indexOf(product), 1);
          }
          catch(error) {
              this.$message.error('Product cannot be deleted');
          }
      },
    },
    async mounted() {
      const result = await RestaurantService.getMyRestaurant({IdUser: this.$store.getters.getUser.IdUser});
      this.restaurant = result[0];

      const products = await RestaurantService.getRestaurantProducts(this.restaurant.IdRestaurant);
      if (products.length > 0) {
        this.productsList = products;
      }

      const menus = await RestaurantService.getRestaurantMenus(this.restaurant.IdRestaurant);
      if (menus.length > 0) {
        this.menusList = menus;
      }
    }
  });
  export default RestaurantHome;
</script>