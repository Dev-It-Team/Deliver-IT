<template>
    <p v-if="restaurant">
        This command is available: {{ order.Price }} € with {{ order.Products.length }} products. {{ restaurant.NameRestaurant }}: to client {{ userAddress }}
    </p>
    <el-button type="primary" v-on:click="$emit('on-take-order')">Take this command</el-button>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/runtime-core';
    import DeliverService from '@/services/DeliverService';
    import RestaurantService from '@/services/RestaurantService';
    import AuthService from '@/services/AuthService';

    const Order = defineComponent({
        name: "Order",
        data() {
            return {
                userAddress: "",
                restaurant: null as any,
                restaurantAddress: ""
            }
        },
        props: {
            order: null as any,
        },
        emits: ['on-take-order'],
        methods: {

        },
        async mounted() {
            const restaurant = await RestaurantService.getRestaurant(this.order.IdRestaurant);
            console.log(restaurant)

            if (restaurant) {
                this.restaurant = restaurant;

                const userRestaurant = await AuthService.recoverUserInformation(this.restaurant.IdUser);
                
                this.restaurantAddress = userRestaurant.Address;

                const user = await AuthService.recoverUserInformation(this.order.IdUser);

                if (user) {
                    this.userAddress = user.Address;
                }
            }
        }
    });
    export default Order;
</script>