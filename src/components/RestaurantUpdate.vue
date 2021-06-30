<template>
  <el-card class="box-card" style="max-width:560px">
    <template #header>
        <div v-on:click="hide()" class="card-header">
            <span>Update your Restaurant information</span>
        </div>
    </template>
    <div v-if="!hidden">
    <el-form v-on:keyup.enter="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk="true" label-width="120px">
        <el-form-item label="Name" prop="restaurantName">
            <el-input v-model="ruleForm.restaurantName"></el-input>
        </el-form-item>
        <el-form-item label="Banner">
            <input type="file" accept="image/*" v-on:change="checkBeforeUpload">
        </el-form-item>
        <el-button v-on:click="submitForm('ruleForm')" type="primary">Update</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
    import axios, { AxiosResponse } from 'axios';
    import RestaurantsService from '@/services/RestaurantService';
    import { ElMessage } from 'element-plus';

  export default {
    name: "RestaurantUpdate",
    emits: ["forceReload"],
    data(): any {
        const validateName = (rule: any, value: string, callback: Function) => {
            return /[\w',.\s]+/.test(value);
        };
        return {
            hidden: true,
            ruleForm: {
                        restaurantName: "",
                        banner: "",
                    },
                    errorMessage: "",
                    rules: {
                        restaurantName: [
                            { required: true, message: 'Please input a name for your restaurant', trigger: 'blur' },
                            { validator: validateName, message: "Wrong restaurant name format", trigger: 'blur' }
                        ],
                        imageUrl: [
                            { required: true, message: 'Please upload a file for your banner', trigger: 'blur' },
                        ]
                    }
      }
    },
    props: {
        restaurantId: Number
    },
    methods: {
        submitForm(formName: string) {
            (this as any).$refs[formName].validate(async (valid: any) => {
                if (valid) {
                    this.uploadFile();
                } else {
                    return false;
                }
            });
        },
        hide() {
            this.hidden = !this.hidden;
        },
        resetForm(formName: string) {
            (this as any).$refs[formName].resetFields();
        },
        checkBeforeUpload(e: any) {
            const file = e.target.files[0];
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') ;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Banner must be JPG or PNG format!');
            }

            if (!isLt2M) {
                this.$message.error('Banner size can not exceed 2MB!');
            }
            
            if (isJPG && isLt2M) {
                this.ruleForm.banner = file;
            }
        },
        async uploadFile() {
            
            let formData = new FormData();
            formData.append("File", this.ruleForm.banner, this.ruleForm.banner.name);

            const newRestaurant = {
                NameRestaurant: this.ruleForm.restaurantName,
                IdUser: this.$store.getters.getUser.IdUser,
                Banner: this.ruleForm.banner.name,
            };

            try {
                const created = await RestaurantsService.updateRestaurant(newRestaurant, restaurantId);

                const uploaded = await RestaurantsService.uploadFile(formData);
                ElMessage.success(`Restaurant updated!`);
            }
            catch(error) {
                this.$message.error('Restaurant cannot be updated');
            }
        }
    },
  }
</script>