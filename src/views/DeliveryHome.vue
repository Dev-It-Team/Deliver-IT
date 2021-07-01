<template>
  <DeliverCreation v-if="!deliver" v-on:forceReload="reload"/>
  <div v-else>
    <br>
    <h1>
      Your driver settings: {{ deliver.VehiculeType }}
    </h1>
    <br>
    <br>
    <DeliverUpdate v-bind:deliver="deliver" v-on:forceReload="reload"/>

    <div v-if="ordersAvailable">
      <div v-for="order in ordersAvailable" v-bind:key="order._id">
        <Order :order="order"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import DeliverCreation from '@/components/DeliverCreation.vue';
  import DeliverService from '@/services/DeliverService';
  import DeliverUpdate from '@/components/DeliverUpdate.vue';
  import Order from '@/components/Order.vue';
  import { ElMessage } from 'element-plus';

  const DeliveryHome = defineComponent({
    name: "DeliveryHome",
    data() {
      return {
        deliver: null as any,
        ordersAvailable: null as any
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

          const orders = await DeliverService.getOrders(this.deliver.IdDeliveryDriver);

          if (orders.length > 0) {
            this.ordersAvailable = orders;
          }
        }
      }
    },
    async mounted() {
      await this.reload();
    }
  });
  export default DeliveryHome;
</script>