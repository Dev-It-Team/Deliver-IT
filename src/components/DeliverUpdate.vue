<template>
  <el-card class="box-card" style="max-width:560px">
    <template #header>
        <div class="card-header">
            <span>Update your Deliver account</span>
        </div>
    </template>
    <el-form v-on:keyup.enter="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <span>Select a vehicule type   </span>
        <el-select v-model="ruleForm.vehiculeChosen" placeholder="Select" >
            <el-option
            v-for="option in ruleForm.vehiculeOptions"
            :key="option.value"
            :label="option"
            :value="option">
            {{ option }}
            </el-option>
        </el-select>
        <br>
        <br>
        <el-button v-on:click="submitForm('ruleForm')" type="primary">Submit</el-button>
      </el-form>
  </el-card>
</template>

<script lang="ts">
    import axios, { AxiosResponse } from 'axios';
    import DeliverService from '@/services/DeliverService';
    import { ElMessage } from 'element-plus';
import { defineComponent } from '@vue/runtime-core';

    const DeliverUpdate = defineComponent({
    name: "DeliverUpdate",
    emits: ["forceReload"],
    data(): any {
        return {
            ruleForm: {
                        vehiculeOptions: ['Scooter', 'Car', 'Bicycle', 'Moto'],
                        vehiculeChosen: this.deliver.VehiculeType
                    },
                    errorMessage: "",
                    rules: {
                        vehiculeOptions: [
                            { required: true, message: 'Please input vehicule type', trigger: 'blur' },
                        ],
                    }
      }
    },
    props: {
        deliver: null as any,
    },
    methods: {
        submitForm(formName: string) {
            (this as any).$refs[formName].validate(async (valid: any) => {
                if (valid) {
                    this.updateDeliver();
                } else {
                    return false;
                }
            });
        },
        async updateDeliver() {
            const newDeliver = {
                VehiculeType: this.ruleForm.vehiculeChosen,
                IdUser: this.$store.getters.getUser.IdUser,
            };

            try {
                const created = await DeliverService.updateDeliver(newDeliver, this.deliver.IdDeliveryDriver);

                ElMessage.success(`Deliver account updated!`);
                this.$emit('forceReload');
            }
            catch(error) {
                ElMessage.error('Deliver cannot be updated');
            }
        }
    }
  });
  export default DeliverUpdate;
</script>