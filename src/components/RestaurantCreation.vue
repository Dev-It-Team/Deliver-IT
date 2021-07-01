<template>
  <el-card class="box-card" style="max-width:560px">
    <template #header>
        <div class="card-header">
            <span>Create your Restaurant</span>
        </div>
    </template>
    <el-form v-on:keyup.enter="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="Name" prop="restaurantName">
            <el-input v-model="ruleForm.restaurantName"></el-input>
        </el-form-item>
        <el-form-item label="Banner">
            <input type="file" accept="image/*" v-on:change="checkBeforeUpload">
        </el-form-item>
        <el-button v-on:click="submitForm('ruleForm')" type="primary">Submit</el-button>
      </el-form>
  </el-card>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import axios, { AxiosResponse } from 'axios';
    import RestaurantsService from '@/services/RestaurantService';
    import UploadService from '@/services/UploadService';
    import { ElMessage } from 'element-plus';

  const RestaurantCreation = defineComponent({
    name: "RestaurantCreation",
    emits: ["forceReload"],
    data() {
        const validateName = (rule: any, value: string, callback: Function) => {
            return /[\w',.\s]+/.test(value);
        };
        return {
            ruleForm: {
                restaurantName: "",
                banner: Object as any,
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
            },
        }
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
        resetForm(formName: string) {
            (this as any).$refs[formName].resetFields();
        },
        checkBeforeUpload(e: any) {
            const file = e.target.files[0];
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') ;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                ElMessage.error('Banner must be JPG or PNG format!');
            }

            if (!isLt2M) {
                ElMessage.error('Banner size can not exceed 2MB!');
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
                const created = await RestaurantsService.createRestaurant(newRestaurant);

                const uploaded = await UploadService.uploadFile(formData);
                ElMessage.success(`Restaurant created!`);
                this.$emit('forceReload');
            }
            catch(error) {
                ElMessage.error('Restaurant cannot be created');
            }
        }
    },
    created() {
      document.title = "Acceuil Restaurants";
    }
  });
  export default RestaurantCreation;
</script>