<template>
 <span>
     <v-card mt-10>
         <v-card-title>
           <account-icon class="display-1"></account-icon>
           Your Account
         </v-card-title>
         <v-card-actions>
           <v-flex>
             <v-flex>
             <v-label>First name</v-label>
             <v-text-field class="ml-3" v-model="account[0].fname"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>Last name</v-label>
             <v-text-field class="ml-3" v-model="account[0].lname"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>Username</v-label>
             <v-text-field class="ml-3" v-model="account[0].username"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>Account Type</v-label>
             <v-text-field class="ml-3" readonly=true v-model="account[0].type"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>E-mail</v-label>
             <v-text-field class="ml-3" v-model="account[0].email"></v-text-field>
             </v-flex>
           </v-flex>
           <v-dialog>hey</v-dialog>
         </v-card-actions>
          <v-btn @click="editAccount" color="yellow" >Edit your Account</v-btn>


          <v-btn @click="confirm" class="ml-5" color="red">Delete your account</v-btn>
     </v-card>
     <v-dialog v-model="dialog" max-width="30%">
                        <v-card>
                          <v-card-title color="brown">Confirm your choices</v-card-title>
                          <v-btn color="red" class="ml-10" @click="deleteAccount">Delete</v-btn>
                          <v-btn @click="goBack" class="ml-5">Return</v-btn>
                        </v-card>
          </v-dialog>
      <v-snackbar timeout="1000" v-model="edited">

      </v-snackbar>

      <v-snackbar timeout="1000" v-model="deleted">

      </v-snackbar>

 </span>
</template>
<script>
 import AccountIcon from '../../node_modules/vue-material-design-icons/Account.vue';
 import {APIService} from '../APIService';
import { setTimeout } from 'timers';
 const apiService = new APIService();
 export default{
     name: "yourAccount",
     components:{
         AccountIcon
     },
     data(){
         return{
           edited:false,
           deleted:false,
           account: [],
           dialog: false
         }

     },
     methods:{
         getUserInfo(){
             apiService.getAccountsByUsername(this.$route.params.username
             ).then(data => {

                    this.account = data
                    console.log(this.$route.params.username)


             })

         },
         confirm(){
           this.dialog = true
         },
         goBack(){
          this.dialog = false
         },
         editAccount(){
           let data= {
             fname:this.account[0].fname,
             lname:this.account[0].lname,
             username:this.account[0].username,
             email:this.account[0].email,
             id: this.account[0].id

           }
           apiService.editAccount(data,this.$store.getters.token).then((data) => {
             console.log(data)
             if (data != undefined){

               this.edited = true

             }
           })
         } ,
         deleteAccount(){
           apiService.deleteAccount(this.account[0].id,this.$store.getters.token).then(
             (data) => {
               this.edited = true
               var delay = 1000
               setTimeout(() =>{
                 this.$store.commit('change',false)
                 this.$router.push({'name':'home'})
               },delay)

             }
           )
         }
     },
     mounted(){
         this.getUserInfo()
     }
 }

</script>
<style>
</style>
