<template>
  <el-card class="box-card" style="max-width:560px">
    <template #header>
        <div class="card-header">
            <span>Create your new Product</span>
        </div>
    </template>
    <el-form v-on:keyup.enter="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="Name" prop="productName">
            <el-input v-model="ruleForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="productDescription">
            <el-input v-model="ruleForm.productDescription"></el-input>
        </el-form-item>
        <el-form-item label="Picture">
            <input required="true" type="file" accept="image/*" v-on:change="checkBeforeUpload">
        </el-form-item>
        <el-form-item label="Prices & Sizes (leave blank if not wanted)">
            <el-input v-model="ruleForm.productSmall" placeholder="Small Price"></el-input>
            <el-input v-model="ruleForm.productMedium" placeholder="Medium Price"></el-input>
            <el-input v-model="ruleForm.productLarge" placeholder="Large Price"></el-input>
            <el-input v-model="ruleForm.productExtraLarge" placeholder="Extra Large Price"></el-input>
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

  const ProductCreation = defineComponent({
    name: "ProductCreation",
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
                productName: "",
                productDescription: "",
                productPicture: null as any,
                productSmall: "",
                productMedium: "",
                productLarge: "",
                productExtraLarge: ""
            },
            errorMessage: "",
            rules: {
                restaurantName: [
                    { required: true, message: 'Please input a name for your product', trigger: 'blur' },
                    { validator: validateName, message: "Wrong product name format", trigger: 'blur' }
                ],
                productDescription: [
                    { required: false },
                    { validator: validateName, message: "Wrong product description format", trigger: 'blur' }
                ],
                productPicture: [
                    { required: true, message: 'Please upload a file for your product', trigger: 'blur'  },
                ],
                productSmall: [
                    { required: false },
                    { validator: validatePrice, message: "Wrong product price format", trigger: 'blur' }
                ],
                productMedium: [
                    { required: true, message: 'Please input size for your product', trigger: 'blur' },
                    { validator: validatePrice, message: "Wrong product price format", trigger: 'blur' }
                ],
                productLarge: [
                    { required: false },
                    { validator: validatePrice, message: "Wrong product price format", trigger: 'blur' }
                ],
                productExtraLarge: [
                    { required: false },
                    { validator: validatePrice, message: "Wrong product price format", trigger: 'blur' }
                ],
            }
        }
    },
    props: {
        id: Number
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
                this.ruleForm.productPicture = file;
            }
        },
        async createProduct() {

            let formData = new FormData();
            formData.append("File", this.ruleForm.productPicture, this.ruleForm.productPicture.name);

            const newProduct = {
                Name: this.ruleForm.productName,
                Description: this.ruleForm.productDescription,
                Picture: this.ruleForm.productPicture.name,
                Size: [
                    { "Small": this.ruleForm.productSmall},
                    { "Medium": this.ruleForm.productMedium},
                    { "Large": this.ruleForm.productLarge},
                    { "ExtraLarge": this.ruleForm.productExtraLarge},
                ],
            };
            try {
                const created = await RestaurantsService.createProduct(this.id, newProduct);

                try {

                    this.$emit('forceReload');
                    const uploaded = await UploadService.uploadFile(formData);
                    ElMessage.success(`Product created!`);
                } catch(error) {
                    ElMessage.error('Product file can\'t be uploaded');
                }
            }
            catch(error) {
                ElMessage.error('Product cannot be created');
            }
        }
    },
  });
  export default ProductCreation;
</script>