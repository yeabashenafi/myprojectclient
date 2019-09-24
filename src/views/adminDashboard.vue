<template>
<span>
   <v-layout>

   </v-layout>
   <v-layout>
     <v-card max-width="30%" max-height="20%" class="ml-5 mt-10 mb-10" color="gray darken-4" dark >
       <v-flex class="ml-3">
         <p color="gray darken-2" class="display-1 ">{{$route.params.username}}</p>
         <v-card flat @click="account" class="mb-5"  color="gray darken-4" width="100%">Accounts</v-card>
         <v-card flat @click="yourAccount" class="mb-5" color="gray darken-4" width="100%" >Your account</v-card>
         <v-card flat @click="logins" class="mb-5" width="100%" color="gray darken-4" >Log-ins</v-card>
         <v-card flat @click="recipes" class="mb-5" width="100%" color="gray darken-4">Recipes</v-card>
         <v-card flat @click="add" class="mb-5" width="100%" color="gray darken-4">Add an admin</v-card>
       </v-flex>



     </v-card>
     <all-accounts v-if="accs" class="ml-10 mb-10"/>
     <your-account v-if="yact" class="ml-10 mt-10 mb-10"/>
     <logins v-if="lIns" class="ml-5 mt-10 mb-10" />
     <recipe-contents v-if="rcps" class="ml-5 mt-10"/>
     <add-admin v-if="addAd" class="mt-7" />
   </v-layout>
</span>
</template>
<script>
import Logins from '../components/Logins.vue'
import RecipeContents from '../components/RecipeContents.vue'
import allAccounts from '../components/allAccounts.vue';
import yourAccount from '../components/yourAccount.vue';
import addAdmin from '../components/addAdmin.vue';
import {APIService} from '../APIService';
const apiService = new APIService();
export default {
  name: "adminDashboard",
  components:{
    allAccounts,
    yourAccount,
    Logins,
    RecipeContents,
    addAdmin

  },
  data(){
    return{

    accs: true,
    yact: false,
    lIns: false,
    rcps: false,
    addAd: false,
    }
  },
  methods:{
     account(){
       this.accs = true
       this.yact = false
       this.lIns = false
       this.rcps = false
       this.addAd = false
     },
     yourAccount(){
         this.accs = false
         this.yact = true
         this.lIns = false
         this.rcps = false
         this.addAd = false
     },
     logins(){
       this.accs = false
         this.yact = false
         this.lIns = true
         this.rcps = false
         this.addAd = false
     },
     recipes(){
       this.accs = false
         this.yact = false
         this.lIns = false
         this.rcps = true
         this.addAd = false
     },
     add(){
       this.addAd = true
       this.accs = false
       this.yact = false
       this.lIns = false
       this.rcps = false
     }
  }
}
</script>
<style scoped>

</style>
