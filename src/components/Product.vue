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
    <el-button v-on:click="beginUpdate" type="primary">Update Product</el-button>
    <br>
    <br>
    <ProductUpdate v-if="hidden" :product="product" v-on:forceReload="$emit('forceReload')"/>
</template>

<script lang="ts">
    import RestaurantsService from '@/services/RestaurantService';
    import ProductUpdate from '@/components/ProductUpdate.vue';
    import { ElMessage } from 'element-plus';
    import { defineComponent } from '@vue/runtime-core';

    const Product = defineComponent({
        name: "Product",
        components: {
            ProductUpdate
        },
        emits: ["delete-product", "forceReload"],
        data() {
            return {
                hidden: false
            }
        },
        props: {
            product: Object
        },
        methods: {
            beginUpdate() {
                this.hidden = !this.hidden;
            },
        }
    });
    export default Product;
</script>