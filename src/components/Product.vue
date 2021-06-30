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
    <el-button v-on:click="deleteProduct()" type="primary">Delete Product</el-button>
</template>

<script lang="ts">
    import RestaurantsService from '@/services/RestaurantService';
    import { ElMessage } from 'element-plus';

    export default {
        name: "Product",
        props: {
            product: Object
        },
        methods: {
            async deleteProduct() {
                try {
                    const result = await RestaurantsService.deleteProduct(this.product.IdRestaurant, this.product._id);
                    ElMessage.success(`Product deleted!`);
                }
                catch(error) {
                    this.$message.error('Product cannot be deleted');
                }
            }
        },
    }
</script>