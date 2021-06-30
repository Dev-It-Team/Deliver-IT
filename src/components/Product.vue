<template>
    <h3>
        {{ product.Name }}
    </h3>
    <p>
        {{ product.Description }}
    </p>
    <p>
        Prices:
    </p>
    <div v-if="product.Sizes[0]">
        <span v-if="product.Sizes[0].Small">Small: {{ product.Sizes[0].Small }} </span>
        <br>
    </div>
    <div v-if="product.Sizes[0]">
        <span v-if="product.Sizes[1].Medium">Medium: {{ product.Sizes[1].Medium }} </span>
        <br>
    </div>
    <div v-if="product.Sizes[0]">
        <span v-if="product.Sizes[2].Large">Large: {{ product.Sizes[2].Large }} </span>
        <br>
    </div>
    <div v-if="product.Sizes[0]">
        <span v-if="product.Sizes[3].ExtraLarge">ExtraLarge: {{ product.Sizes[3].ExtraLarge }} </span>
    </div>
    <br>
    <el-button v-on:click="$emit('delete-product')" type="primary">Delete Product</el-button>
</template>

<script lang="ts">
    import RestaurantsService from '@/services/RestaurantService';
    import { ElMessage } from 'element-plus';

    export default {
        name: "Product",
        emits: ["delete-product"],
        props: {
            product: Object
        },
    }
</script>