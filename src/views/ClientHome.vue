<template>
    <div v-loading="loading"></div>
    <div v-if="!restaurantMenus">
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.IdRestaurant">
            <el-card>
                <template #header>
                    {{ restaurant.NameRestaurant }}
                </template>
                <el-button type="primary" style="width: 100%" v-on:click="loadRestaurantMenus(restaurant.IdRestaurant)">See Menus</el-button>
            </el-card>
        </div>
    </div>
    <div v-else>
        <div v-for="menu in restaurantMenus" v-bind:key="menu._id">
            <el-card>
                <template #header>
                    {{ menu.Name }} - {{ menu.Price }}€
                </template>
                <p>{{ menu.Description }}</p>
                <span v-for="(product, key) in menu.Products" v-bind:key="key">
                    <el-divider v-if="key > 0" direction="vertical"></el-divider>
                    {{ product }}
                </span>
                <br>
                <el-button type="primary" style="width: 80%" v-on:click="placeOrder(menu)">Place Order</el-button>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import RestaurantService from '@/services/RestaurantService';
import OrdersService from '@/services/OrdersService';
import store from '@/store';

const ClientHome = defineComponent({
    name: "ClientHome",
    data() {
        return {
            loading: true,
            restaurants: null as any, // Restaurant list
            restaurantMenus: null as any, // Restaurant details
            currentRestaurantId: "",
        }
    },
    created() {
        document.title = "Client Home";
    },
    async mounted() {
        this.restaurants = await RestaurantService.getRestaurants()
            .finally(() => this.loading = false);
    },
    methods: {
        async loadRestaurantMenus(id: string) {
            await RestaurantService.getRestaurantMenus(id)
                .then((response) => { this.restaurantMenus = response })
                .catch(() => this.restaurantMenus = null)
        },
        async placeOrder(menu: any) {
            const order = {
                IdRestaurant: menu.IdRestaurant,
                IdUser: store.state.user.IdUser,
                IdDeliveryDriver: null,
                StartDateTime: new Date(),
                EndDateTime: null,
                Price: menu.Price,
                Products: menu.Products,
                Status: null,
                CouponUsed: false,
            }
            await OrdersService.createOrder(order);
        }
    }

});
export default ClientHome;
</script>