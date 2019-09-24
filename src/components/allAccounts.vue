<template>
<v-layout>
 <v-layout v-if="accts" wrap>

        <v-card class="mt-10 mr-12 recipes" width="28%" v-for="account in Accounts " v-bind:key="account.usernname">
            <v-card-actions >
                <v-flex max-width="28%">
                  <v-text-label class="display-1">{{account.fname}} {{account.lname}}</v-text-label>
                    <p>{{account.type}}</p>
                    <p>{{account.email}}</p>
                    <p>{{account.username}}</p>
                    <v-btn dark @click="editPage(account.username)">Change</v-btn>

                </v-flex>
            </v-card-actions>
        </v-card>


  </v-layout>
  <span v-if="editaccts">
     <v-card class="mt-10">
         <v-card-title>
           <account-icon class="display-1"></account-icon>
           Edit Account
         </v-card-title>
         <v-card-actions>
           <v-flex>
             <v-flex>
             <v-label>First name</v-label>
             <v-text-field class="ml-3" v-model="edAccount[0].fname"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>Last name</v-label>
             <v-text-field class="ml-3" v-model="edAccount[0].lname"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>Username</v-label>
             <v-text-field class="ml-3" v-model="edAccount[0].username"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>Account Type</v-label>
             <v-text-field class="ml-3" readonly=true v-model="edAccount[0].type"></v-text-field>
             </v-flex>
             <v-flex>
             <v-label>E-mail</v-label>
             <v-text-field class="ml-3" v-model="edAccount[0].email"></v-text-field>
             </v-flex>
           </v-flex>

         </v-card-actions>
          <v-btn @click="editAccount" color="yellow" >Confirm Edit</v-btn>

          <v-btn @click="deleteAccount" class="ml-5" color="red">Delete account</v-btn>
     </v-card>

     <v-snackbar top v-model="success" timeout="1000">
       <p>succesfully deleted</p>
     </v-snackbar>

     <v-snackbar top v-model="edited" timeout="1000">
        <p>succesfully edited</p>
     </v-snackbar>

  </span>
</v-layout>
</template>
<script>
import {APIService} from '../APIService';
const apiService = new APIService();
export default {
  data(){
    return{
      success:false,
      edited: false,
      Accounts:[],
      edAccount: [],
      accts:true,
      editaccts:false
    }
  },
  methods:{
     getAccounts(){
      apiService.getAccounts().then(
        (data) => {
          this.Accounts = data

        }
      )
    },
    editPage(username){
      this.accts = false
      this.editaccts = true
      apiService.getAccountsByUsername(username).then(
        (data) => {
          this.edAccount = data
          console.log(this.edAccount)
        }
        )
    },
    editAccount(){
      let Data= {
             fname:this.edAccount[0].fname,
             lname:this.edAccount[0].lname,
             username:this.edAccount[0].username,
             email:this.edAccount[0].email,
             id: this.edAccount[0].id

           }
      apiService.editAccount(Data,this.$store.getters.token).then(
        (data) => {
          if (data != undefined) {
             var delay = 1000;
          this.edited = true
          setTimeout(() => {
            this.editaccts = false
            this.accts = true
            this.getAccounts()
          },delay)



          }

        }
        )
    },
    deleteAccount(){
      apiService.deleteAccount(this.edAccount[0].id,this.$store.getters.token).then(
        (data) => {

          var delay = 1000;
          this.success = true
          setTimeout(() => {
            this.editaccts = false
            this.accts = true
            this.getAccounts()
          },delay)

        }
        )
    }
  },
  mounted(){
    this.getAccounts()
  }
}
</script>
<style scoped>

</style>
