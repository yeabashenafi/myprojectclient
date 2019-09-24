<template>
  <v-layout>
    <p class="display-1"></p>

    <v-data-table color="brown lighten-2" :headers="headers" :items="Logins" width="100%" hide-actions>
      <template slot="headerCell" slot-scope="{header}">
        <span v-text="header.text"></span>
      </template>
      <template slot="items" slot-scope="{login}">
         <tr>
           <td>{{login.id}}</td>
           <td>{{login.date}}</td>
         </tr>
      </template>

    </v-data-table>
  </v-layout>
</template>
<script>
import {APIService} from '../APIService';
const apiService = new APIService();
 export default{

   name:'Logins',
   data(){
     return{
       Logins: [],
       headers:[
         {
       sortable:false,
       text:'Username',
       value:'Username'
         },
         {
        sortable:false,
        text:'Date',
        value:'Date'
         }
       ]
     }
   },
   methods:{
     getLogins(){
       apiService.getLogin(this.$store.getters.token).then(
         (data) => {
           console.log(data)
           this.Logins = data
         }
         )
     }
   },
   mounted(){
     this.getLogins()
   }
 }
</script>
<style></style>
