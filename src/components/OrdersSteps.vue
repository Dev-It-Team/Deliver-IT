<template>
<el-card :body-style="{ padding: '20px 0 0 0' }">
    Placed at {{ orderData.StartDateTime }} - {{ orderData.Price }}€
    <el-steps :active="orderData.Status || 0" finish-status="success" simple style="margin-top: 20px">
        <el-step title="Order Placed" ></el-step>
        <el-step title="Order in preparation" ></el-step>
        <el-step title="Order in delivery" ></el-step>
        <el-step title="Order delivered" ></el-step>
    </el-steps>
</el-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

const OrderSteps = defineComponent({
    name: "OrderSteps",
    props: {
        orderData: null as any,
    },
    data() {
        return {

        }
    },
});
export default OrderSteps;
</script>

<style>
el-card > .el-card__body {
    padding: 20px 0 0 0 !important;
}
</style>