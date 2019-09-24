<template>
 <v-container>
     <v-layout>
       <v-btn>Hey</v-btn>
     </v-layout>
 </v-container>

</template>
<script>
import APIService from '../APIService'
const apiService = new APIService()
 export default{
     data(){
       Recipes:[]
     },
     methods:{
       getRecipes(){
         apiService.getRecipeByType('Ethiopian').then(
           (data) => {
             console.log(hey+data)
           })
       }
     },
     mounted(){
       this.getRecipes()
     }
 }
</script>
<style scoped>
</style>
