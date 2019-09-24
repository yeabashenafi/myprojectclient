<template>
 <span class="cont">
     <v-layout mt-10>
         <v-card width=500 class="card "  color="grey">
             <v-card-title class="display-1" >
                 Log-in
             </v-card-title>
             <v-card-action class="action">
                 <v-form ref="form" class="ml-3">
                     <v-text-field  v-model="uname" color="white" :rules="uNameRules" label="User name"></v-text-field>

                     <v-text-field v-model="ppw" :rules="pwRules" color="white" v-on:focus="pass" id="pw" label="Password"></v-text-field>
                     <v-select     v-model="selected"  color="white"    label="Type" :items="options" ></v-select>
                     <v-btn @click="submit" pb-5 >Log-in</v-btn>

                     <v-snackbar top timeout="2000" color="red" v-model="dialog">
                       <span>
                         UnSuccesful login
                         <v-card-actions>
                           please input a valid user info
                         </v-card-actions>
                       </span>
                     </v-snackbar>
                 </v-form>


             </v-card-action>
         </v-card>

     </v-layout>
 </span>
</template>
<script>
const url = "http://localhost:3000/api/accounts/login";
import axios from "axios";
import {APIService} from "../APIService";

const apiService = new APIService();
 export default{


     name: "LogContents",
     data(){
       return{
           dialog:false,
           isValidated:false,
           uname:"",
           ppw:"",
           selected: "",
           l:'',
           accessToken: "",
             options:[
                 'User',
                 'Adminstrtator'
             ],
             accounts:[],
           liattempts:0,
           uNameRules:[ v => !!v || "User name is required"],
           pwRules:[
               v => !!v || "Password is required ",
                v => v && v.length >= 6 || "password must be 6 or greater than 6 characters"
           ]

       }
     },
     methods:{
       pass:function(event){
           var t = document.getElementById('pw');
           t.type = 'password';

       },
       getAccounts(){
            apiService.getAccounts().then((data) => {
                this.accounts = data;

                }
            );
       },
       submit (){
            this.$refs.form.validate();
            this.isValidated = this.$refs.form.validate();


            let acc ={
                 username : this.uname ,
                 password : this.ppw,
                 type : this.selected
            }
            apiService.getAccountsByUsername(acc.username).then( (data) =>{
              console.log(data.length)
              if(this.isValidated && data.length>0){
                 if(data[0].type == acc.type){
                      apiService.login(acc).then((data) =>{
                console.log(data);
                if (data != undefined){
                   this.accessToken = data.id;
                   this.$store.commit('change',true)
                   this.$store.commit('setId',data.username)
                   console.log(this.accessToken+" and the user id will be "+this.$store.getters.loggedID)
                   this.$store.commit('setToken',this.accessToken)
                   var d= new Date();

                   let logDetail ={
                     Username :acc.username,
                     date: d
                   }

                   apiService.addLogin(logDetail,this.$store.getters.token).then(
                     (data) => {
                       console.log(data)
                     })
                   if(acc.type == 'User')
                   {
                   this.$router.push({name: 'dashboard',params:{username:acc.username}})
                   }
                   else{
                     this.$router.push({name: 'adminDashboard',params:{username:acc.username}})
                   }
                }
                else{
                  if (this.isValidated){
                     this.dialog = true
                  }

                }
            });
                 }
                 else{
                if(this.isValidated){
                  this.dialog = true
                }
              }

              }
            }

            )
            /*
*/
}





     },
     mounted(){
  //       this.getAccounts();

     },
     computed:{
         getState(){
           return this.$store.getters.logged
         }
     }
 }
</script>
<style scoped>
.card{
  width:100%;

}
.cont{
  margin-left: 40%;
}
.action{
  background-color: rgba(164, 156, 240, 0.884);
}
</style>
