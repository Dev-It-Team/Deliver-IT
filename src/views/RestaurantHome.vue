<template>
  <div v-loading="loading"></div>
  <RestaurantCreation v-if="!restaurant && !loading" v-on:forceReload="reload"/>
  <div v-else-if="restaurant && !loading">
    <div v-if="ordersAvailable">
      <div v-for="order in ordersAvailable" v-bind:key="order._id">
        <Order :order="order" v-on:on-take-order="onTakeOrder(order)" />
      </div>
    </div>
    <br>
    <RestaurantUpdate v-bind:restaurantId="restaurant.IdRestaurant" v-on:forceReload="reload"/>
    <br>
    <br>
    <h1>
      Your restaurant: {{ restaurant.NameRestaurant }}
    </h1>

    <ProductCreation v-bind:id="restaurant.IdRestaurant" v-on:forceReload="reload"/>

    <div v-if="productsList && productsList.length > 0">
      <h2>
        Your products:
      </h2>

      <div v-for="product in productsList" v-bind:key="product._id">
        <Product v-bind:product="product" v-on:delete-product="deleteProduct(product)" v-on:forceReload="reload"/>
      </div>
      <br>
    </div>

    <br>
    
    <MenuCreation v-bind:id="restaurant.IdRestaurant" v-bind:products="productsList" v-on:forceReload="reload"/>
    <div v-if="menusList && menusList.length > 0">
      <h2>
        Your menus:
      </h2>

      <div v-for="menu in menusList" v-bind:key="menu._id">
        <Menu v-bind:menu="menu" :allProducts="productsList" v-on:delete-menu="deleteMenu(menu._id)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import RestaurantCreation from '@/components/RestaurantCreation.vue';
  import RestaurantUpdate from '@/components/RestaurantUpdate.vue';
  import ProductCreation from '@/components/ProductCreation.vue';
  import MenuCreation from '@/components/MenuCreation.vue';
  import Product from '@/components/Product.vue';
  import Menu from '@/components/Menu.vue';
  import RestaurantService from '@/services/RestaurantService';
  import DeliverService from '@/services/DeliverService';
  import { ElMessage } from 'element-plus';
  import Order from '@/components/Order.vue';
  import OrdersService from '@/services/OrdersService';

  const RestaurantHome = defineComponent({
    name: "RestaurantHome",
    data() {
      return {
        productsList: null as any,
        menusList: null as any,
        banner: "",
        restaurant: null as any,
        loading: true,
        ordersAvailable: null as any
      }
    },
    components: {
      RestaurantCreation,
      Product,
      Menu,
      ProductCreation,
      MenuCreation,
      RestaurantUpdate,
      Order
    },
    created() {
      document.title = "Restaurants Home";
    },
    methods: {
      async deleteMenu(menu: any) {
        try {
          const result = await RestaurantService.deleteMenu(this.restaurant.IdRestaurant, menu._id);
          ElMessage.success(`Menu deleted!`);
          this.menusList.splice(this.menusList.indexOf(menu), 1);
          await this.reload();
        }
        catch(error) {
            ElMessage.error('Menu cannot be deleted');
        }
      },
      async deleteProduct(product: any) {
          try {
            const result = await RestaurantService.deleteProduct(this.restaurant.IdRestaurant, product._id);
            ElMessage.success(`Product deleted!`);
            this.productsList.splice(this.productsList.indexOf(product), 1);
            await this.reload();
          }
          catch(error) {
              ElMessage.error('Product cannot be deleted');
          }
      },
      async reload() {
        const result = await RestaurantService.getMyRestaurant(this.$store.getters.getUser.IdUser).finally(() => this.loading = false);
        if (result) {
          this.restaurant = result;
          const products = await RestaurantService.getRestaurantProducts(this.restaurant.IdRestaurant);
          if (products.length > 0) {
            this.productsList = products;
          }

          const menus = await RestaurantService.getRestaurantMenus(this.restaurant.IdRestaurant);
          if (menus.length > 0) {
            this.menusList = menus;
          }

          const orders = await DeliverService.getOrders(this.restaurant.IdRestaurant);

          if (orders.length > 0) {
            this.ordersAvailable = orders;
          }
        }
      },
      async onTakeOrder(order: any) {
          order.Status = 1;
          await OrdersService.acceptOrder(order)
            .then(() => ElMessage.success("Command taken! The delivery driver will come soon."))
            .catch(() => ElMessage.error("Something went wrong, command not taken."))
            .finally(() => this.reload());
      }
    },
    async mounted() {
      await this.reload();
    }
  });
  export default RestaurantHome;
</script>