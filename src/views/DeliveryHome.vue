<template>
  <DeliverCreation v-if="!deliver" v-on:forceReload="reload"/>
  <div v-else>
    <br>
    <h1>
      Your driver settings: {{ deliver.VehiculeType }}
    </h1>
    <el-rate
    v-model="average"
    disabled
    show-score
    text-color="#ff9900"
    score-template="{value} points">
    </el-rate>
    <br>
    <br>
    <DeliverUpdate v-bind:deliver="deliver" v-on:forceReload="reload"/>

    <div v-if="ordersAvailable">
      <div v-for="order in ordersAvailable" v-bind:key="order._id">
        <Order :order="order" v-on:on-take-order="onTakeOrder(order)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import DeliverCreation from '@/components/DeliverCreation.vue';
  import DeliverService from '@/services/DeliverService';
  import OrdersService from '@/services/OrdersService';
  import DeliverUpdate from '@/components/DeliverUpdate.vue';
  import Order from '@/components/Order.vue';
  import { ElMessage } from 'element-plus';

  const DeliveryHome = defineComponent({
    name: "DeliveryHome",
    data() {
      return {
        deliver: null as any,
        ordersAvailable: null as any,
        average: 0
      }
    },
    components: {
      DeliverCreation,
      DeliverUpdate,
      Order
    },
    created() {
      document.title = "Delivers Home";
    },
    methods: {
      async reload() {
        const result = await DeliverService.getDeliver(this.$store.getters.getUser.IdUser);
        
        if (result) {
          this.deliver = result;
          if (this.deliver.VoteNb == 0) {
            this.average = 0;
          }
          else {
            this.average = this.deliver.Note / this.deliver.VoteNb;
          }

          const orders = await DeliverService.getOrders(this.deliver.IdDeliveryDriver);

          if (orders.length > 0) {
            this.ordersAvailable = orders;
          }
        }
      },
      async onTakeOrder(order: any) {
          order.Status = 2;
          await OrdersService.acceptOrder(order)
            .then(() => ElMessage.success("Command taken! Head to the restaurant."))
            .catch(() => ElMessage.error("Something went wrong, command not taken."))
            .finally(() => this.reload());
      }
    },
    async mounted() {
      await this.reload();
    }
  });
  export default DeliveryHome;
</script>