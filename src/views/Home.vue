<template>
  <div class="home">
    <h1 class="mainTitle">
        Deliver'IT account management page
    </h1>

    <div v-if="user">
    <h2>
        {{ user.Name }} {{ user.FirstName }}'s  Account
    </h2>

    <p>
        Email used: {{ user.Email }}
    </p>
    <p>
        Your birthdate: {{ user.BirthDate }}
    </p>
    <p>
        Your current address: {{ user.Address }}
    </p>
    <p v-if='isDeliver'>
        Please not that your current address is also your payment adress.
    </p>
    <p v-else-if="isRestaurant">
        Please not that your current address is also your restaurant adress.
    </p>
    <br>
    <p>
        Member since: {{ user.InscriptionDate }}
    </p>
    <p>
        Has: {{ user.PatronageNb }} patronage coupons
    </p>
    <br>
    <p>
        Patronage code:
    </p>
    <p>
        {{ user.PatronageCode }}
    </p>
    
    <br>

    <UserUpdate v-on:forceReload="reload" :user="user"/>

    </div>
    <div v-else>   
        Error while loading profile, please check again in a few minutes.
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import AuthService from '../services/AuthService';
    import UserUpdate from '@/components/UserUpdate.vue';

    const Home = defineComponent({
        name: "Home",
        data() {
            return {
                user: null,
                isDeliver: false,
                isRestaurant: false
            }
        },
        components: {
            UserUpdate
        },
        created() {
            document.title = "Home";
        },
        methods: {
            async reload() {
                this.user = await AuthService.recoverUserInformation(this.$store.getters.getUser.IdUser);
                this.isDeliver = this.user.UserFlag == '2';
                this.isRestaurant = this.user.UserFlag == '1';
            }
        },
        async mounted() {
            await this.reload();
        },
    });
    export default Home;
</script>