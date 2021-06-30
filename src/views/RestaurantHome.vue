<template>
  <RestaurantCreation v-if="!restaurantPresent"/>
  <div v-else>
    <h1>
      {{ NameRestaurant }}
    </h1>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import RestaurantCreation from '@/components/RestaurantCreation.vue';
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
        restaurantPresent: this.IdRestaurant != null
      }
    },
    props: {
      IdRestaurant: String,
      Banner: String,
      NameRestaurant: String
    },
    components: {
      RestaurantCreation
    },
    created() {
      document.title = "Acceuil Restaurants";
    },
  });
  export default RestaurantHome;
</script>