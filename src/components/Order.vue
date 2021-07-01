<template>
    <p>
        This command is available: {{ order.Price }} € with {{ order.Products.Lenth }} products. <div v-if="restaurant"> {{ restaurant.NameRestaurant }} from {{ restaurantAddress }} to client {{ userAddress }}</div>
    </p>
    <el-button type="primary">Take this command</el-button>
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
        async mounted() {
            const restaurant = await RestaurantService.getRestaurant(this.order.IdRestaurant);

            if (restaurant) {
                this.restaurant = restaurant;

                const userRestaurant = await AuthService.recoverUserInformation(this.restaurant.IdUser);
                
                this.restaurantAddress = userRestaurant.Address;

                const user = await AuthService.recoverUserInformation(this.order.IdUser);

                if (user) {
                    this.userAddress = user.Address;
                }
            }
        },
    });
    export default Order;
</script>