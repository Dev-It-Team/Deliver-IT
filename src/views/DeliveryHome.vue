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

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import DeliverCreation from '@/components/DeliverCreation.vue';
  import DeliverService from '@/services/DeliverService';
  import DeliverUpdate from '@/components/DeliverUpdate.vue';
  import { ElMessage } from 'element-plus';

  const DeliveryHome = defineComponent({
    name: "DeliveryHome",
    data() {
      return {
        deliver: null
      }
    },
    components: {
      DeliverCreation,
      DeliverUpdate
    },
    created() {
      document.title = "Delivers Home";
    },
    methods: {
      async reload() {
        const result = await DeliverService.getDeliver(this.$store.getters.getUser.IdUser);
        
        if (result) {
          this.deliver = result;
        }
      }
    },
    async mounted() {
      await this.reload();
    }
  });
  export default DeliveryHome;
</script>