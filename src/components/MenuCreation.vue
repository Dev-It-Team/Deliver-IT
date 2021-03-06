<template>
  <el-card class="box-card" style="max-width:560px">
    <template #header>
        <div class="card-header">
            <span>Create your new Menu</span>
        </div>
    </template>
    <el-form v-on:keyup.enter="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="Name" prop="menuName">
            <el-input v-model="ruleForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="menuDescription">
            <el-input v-model="ruleForm.menuDescription"></el-input>
        </el-form-item>
        <el-form-item label="Picture">
            <input required="true" type="file" accept="image/*" v-on:change="checkBeforeUpload">
        </el-form-item>
        <el-form-item label="Price">
            <el-input v-model="ruleForm.menuPrice"></el-input>
        </el-form-item>

        <el-checkbox-group
            v-model="ruleForm.menuProductsChosen"
            :min="1"
            :max="4">
            <el-checkbox v-for="product in products" v-bind:key="product._id" :label="product.Name">{{product.Name}}</el-checkbox>
        </el-checkbox-group>

        <br>
        <br>
        
        <el-button v-on:click="submitForm('ruleForm')" type="primary">Submit</el-button>
      </el-form>
  </el-card>
</template>

<script lang="ts">
    import axios, { AxiosResponse } from 'axios';
    import RestaurantsService from '@/services/RestaurantService';
    import UploadService from '@/services/UploadService';
    import { ElMessage } from 'element-plus';
    import { defineComponent } from '@vue/runtime-core';

    const MenuCreation = defineComponent({
    name: "MenuCreation",
    emits: ["forceReload"],
    data(): any {
        const validateName = (rule: any, value: string, callback: Function) => {
            return /[\w',.\s]+/.test(value);
        };
        const validatePrice = (rule: any, value: string, callback: Function) => {
            return /[0-9]{1,3}[.]?[0-9]{1,2}/.test(value);
        };
        return {
            ruleForm: {
                        menuName: "",
                        menuDescription: "",
                        menuPicture: "",
                        menuPrice: "",
                        menuProductsChosen: [],
                        menuProducts: this.products
                    },
                    errorMessage: "",
                    rules: {
                        restaurantName: [
                            { required: true, message: 'Please input a name for your menu', trigger: 'blur' },
                            { validator: validateName, message: "Wrong menu name format", trigger: 'blur' }
                        ],
                        menuDescription: [
                            { validator: validateName, message: "Wrong menu description format", trigger: 'blur' }
                        ],
                        menuPicture: [
                            { required: true, message: 'Please upload a file for your menu', trigger: 'blur'  },
                        ],
                        menuPrice: [
                            { required: true, message: 'Please input a price for your menu', trigger: 'blur' },
                            { validator: validatePrice, message: "Wrong menu price format", trigger: 'blur' }
                        ],
                    }
      }
    },
    props: {
        id: Number,
        products: Array
    },
    methods: {
        submitForm(formName: string) {
            (this as any).$refs[formName].validate(async (valid: any) => {
                if (valid) {
                    this.createProduct();
                } else {
                    return false;
                }
            });
        },
        checkBeforeUpload(e: any) {
            const file = e.target.files[0];
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') ;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                ElMessage.error('Picture must be JPG or PNG format!');
            }

            if (!isLt2M) {
                ElMessage.error('Picture size can not exceed 2MB!');
            }
            
            if (isJPG && isLt2M) {
                this.ruleForm.menuPicture = file;
            }
        },
        async createProduct() {

            let formData = new FormData();
            formData.append("File", this.ruleForm.menuPicture, this.ruleForm.menuPicture.name);

            const newMenu = {
                Name: this.ruleForm.menuName,
                Description: this.ruleForm.menuDescription,
                Picture: this.ruleForm.menuPicture.name,
                Price: this.ruleForm.menuPrice,
                Products: this.ruleForm.menuProductsChosen
            };
            try {
                const created = await RestaurantsService.createMenu(this.id, newMenu);

                try {
                    const uploaded = await UploadService.uploadFile(formData);
                    ElMessage.success(`Menu created!`);
                    this.$emit('forceReload');
                } catch(error) {
                    ElMessage.error('Menu file can\'t be uploaded');
                }
            }
            catch(error) {
                ElMessage.error('Menu cannot be created');
            }
        },
    },
  });
  export default MenuCreation;
</script>