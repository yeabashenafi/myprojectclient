<template>
  <v-container fill width>
      <v-layout >
          <v-card   width=500 color="grey">
              <v-card-title class="display-1">Sign-up</v-card-title>
              <v-card-actions class="ml-3">
                  <v-form class="form" v-model="valid" ref="form" >
                      <v-text-field v-model="fname" color="white"   :rules='nameRules'  label= 'First name' required></v-text-field>
                      <v-text-field v-model="lname" color="white"  :rules='nameRules'  label= 'Last Name'  required></v-text-field>
                      <v-text-field v-model="uname" color="white"  :rules='unameRules' label= 'User name'  required></v-text-field>
                      <v-text-field v-model="email" color="white"  :rules='emailRules' label= 'E-mail'></v-text-field>
                      <v-select     v-model="selected" color="white" label="type" :items="options" ></v-select>

                      <v-text-field v-model="pw" color="white"   :rules='pwRules' v-on:focus="pass" id="pw" label= 'Password' required></v-text-field>
                      <v-text-field v-model="pww" color="white"   :rules='pw2Rules' v-on:focus="pass" id="pww" label= 'Confirm Password'></v-text-field>
                      <v-btn @click="submit" color="white"  class="{red:!valid,green:valid}" >Sign-up</v-btn>
                  </v-form>

              </v-card-actions>
          </v-card>
          <v-snackbar top timeout="2000" color="red" v-model="dialog">

            <span>
              <p class="font-weight-black">Unsuccessful Sign-up attempt</p>
              <v-card-actions>
              Username already exists
            </v-card-actions>

            </span>


          </v-snackbar>
          <v-snackbar top timeout="5000"  v-model="success">
             <span>
               <p class="font-weight-black">Successfully signed-up</p>
               <p>
               Use the whole features of MyRecipeApp
             </p>
             </span>

          </v-snackbar>
      </v-layout>
  </v-container>
</template>
<script>
import {APIService} from '../APIService';
import axios from "axios"
import { setTimeout } from 'timers';
const API_URL = 'http://localhost:3000';
const url = API_URL +'/api/tests';
const apiService = new APIService();
 export default{
     name : 'SignContents',
     data(){
         return{
             accounts:[

                 ],
             isValidated:false,
             dialog:false,
             success:false,
             fname:'',
             lname:'',
             uname:'',
             email:'',
             selected:'',
             pw:'',
             ppw:'',
             options:[
                 'User',

             ],
             no_Of_tests :0,
             images:{
               visibile:require('../assets/download.png'),
           },
             nameRules:[ v => !!v || "The input is required"],
             unameRules:[
                 v => !! v || "user name is required",
                 v => /.+[0-9]/.test(v) || "User name must end with numbers"
             ],
             pwRules:[
                 v => !! v || "password field can't be empty",
                 v => v && v.length >= 6 || "Password must be greater than 6 characters"
             ],
             pw2Rules:[
                 v => !! v || "password field can't be empty",
                 v => v && v.length >= 6 || "password must be gretater than 6 characters",
                 v => v === this.pw || "the password values must match"
                              ],
             emailRules:[
                 v => !! v || "E-mail is required",
                 v => /.+@.+\..+/.test(v) || "E-mail must be valid "
             ]
         }

     },
     methods:{
         pass:function(event){
              var temp = document.getElementById('pw');
              var temp2 = document.getElementById('pww');
              temp.type = "password";
              temp2.type = "password";
         },
         submit (){
             this.$refs.form.validate()
             this.isValidated = this.$refs.form.validate()
             if(this.isValidated){
                 let data={
                 fname: this.fname,
                 lname: this.lname,
                 email: this.email,
                 type: this.selected,
                 username: this.uname,
                 password: this.pw
             }

             if(!this.checkExistAccounts()){


              apiService.createAccount(data)
              this.success = true
              this.$store.commit('change',true)

              var delay = 3000;
              setTimeout(() => {
                this.$router.push({'name':'home'})

              },delay)



             }
             else{
                  this.dialog = true
             }
             }









         },
         checkExistAccounts(){
             var i;
             for(i =0; i< this.accounts.length; i++){
                if(this.uname == this.accounts[i].username){
                    return true
                }
             }
             return false
         },
         getAccounts(){
             apiService.getAccounts() .then((data) => {
                  this.accounts = data;
             }

             );
         }


     },
     mounted(){

      this.getAccounts()
     },
 }
</script>
<style>
 .tf{
width:100%;
 }
 .form{
width:100%;
}
</style>
