<template>
    <div v-loading="loading"></div>
    <!-- Orders -->
    <div v-for="placedOrder in placedOrders" v-bind:key="placedOrder._id">
        <h1>Order at {{ placedOrder.RestaurantName }}</h1>
        <OrdersSteps :orderData="placedOrder" />
    </div>
    <!-- RESTAURANTS LIST -->
    <div v-if="!restaurantMenus">
        <h1 v-if="restaurants">
            Available Restaurants
        </h1>
        <h1 v-else>
            No Restaurant Available at the moment.
        </h1>
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.IdRestaurant">
            <el-card>
                <template #header>
                    {{ restaurant.NameRestaurant }}
                </template>
                <el-button type="primary" style="width: 100%"
                    v-on:click="loadRestaurantMenus(restaurant.IdRestaurant); currentRestaurantName=restaurant.NameRestaurant">See Menus</el-button>
            </el-card>
        </div>
    </div>
    <!-- RESTAURANT MENUS AND ORDERS -->
    <div v-else>
        <!-- Menus -->
        <el-row v-if="restaurantMenus">
            <el-col :span="6" style="margin: auto;">
                <el-page-header v-on:back="goBack" content="Restaurants"></el-page-header>
            </el-col>
            <el-col :span="12"><h1>Available menus</h1></el-col>
            <el-col :span="6"></el-col>
        </el-row>
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
import OrdersSteps from '@/components/OrdersSteps.vue';
import { ElMessage } from "element-plus";

const ClientHome = defineComponent({
    name: "ClientHome",
    components: {
        OrdersSteps,
    },
    data() {
        return {
            loading: true,
            restaurants: null as any, // Restaurant list
            restaurantMenus: null as any, // Restaurant details
            placedOrders: null as any, // Current order content
        }
    },
    created() {
        document.title = "Client Home";
    },
    async mounted() {
        this.restaurants = await RestaurantService.getRestaurants()
            .finally(() => {
                this.loading = false;
                this.getOrders();
            });
    },
    methods: {
        async loadRestaurantMenus(id: string) {
            await RestaurantService.getRestaurantMenus(id)
                .then((response) => this.restaurantMenus = response)
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
            await OrdersService.createOrder(order)
                .then(() => this.getOrders())
                .catch(() => ElMessage.error("Something when wrong. Your order couldn't be sent"));
        },
        async getOrders() {
            await OrdersService.getOrders(store.state.user.IdUser)
                .then(async (orders) => {
                    // Get Restaurant's name
                    for (let rIndex = 0; rIndex < this.restaurants.length; rIndex++) {
                        console.log(this.restaurants[rIndex])
                        for (let oIndex = 0; oIndex < orders.length; oIndex++) {
                            console.log(this.restaurants[rIndex].IdRestaurant, orders[oIndex].IdRestaurant)
                            if (this.restaurants[rIndex].IdRestaurant == orders[oIndex].IdRestaurant)
                            {
                                orders[oIndex]["RestaurantName"] = this.restaurants[rIndex].NameRestaurant;
                                console.log(this.restaurants[rIndex])
                            }
                        }
                    }
                    this.placedOrders = orders;
                })
                .catch(() => this.placedOrders = null)
        },
        goBack() {
            this.restaurantMenus = null;
        }
    }
});
export default ClientHome;
</script>