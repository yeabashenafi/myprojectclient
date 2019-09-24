<template>
  <v-layout >
    <v-card @click="goto(recipe.name)" class="mr-12 recipes" width="28%" v-for="recipe in Recipes " v-bind:key="recipe.name">
            <v-card-title></v-card-title>
            <v-card-actions>
                <v-flex >
                    <v-img :src="getImages(recipe.image)" width="300" height="200"></v-img>
                    <v-text-label class="display-1" width="100%">{{recipe.name}}</v-text-label>
                    <p>{{recipe.type}}</p>
                    <p>{{recipe.description}}</p>
                    <p>Cooking time:{{recipe.cookTime}}</p>
                    <v-btn dark @click="edit(recipe.name)">Edit</v-btn>
                </v-flex>
            </v-card-actions>
    </v-card>

  </v-layout>
</template>
<script>
 import {APIService} from '../APIService'
 const apiService = new APIService();

 export default{
   name: 'yourRecipes',
   data(){
     return{
       Recipes:[],
       hasRecipe:false
     }
   },
   methods:{
     getRecipe(){
      apiService.getRecipeByContributor(this.$route.params.username).then(
        (data) => {
          console.log(data)
          this.Recipes = data
        }
      )
     },
     getImages(imageName){

       return require('../assets/images/'+ imageName)
     },
     goto(name){
        this.$router.push({name:'details',params:{food:name}})
     },
     edit(name){
       this.$router.push({name:'editRecipe',params:{recipe:name}})
     }
   },
   mounted(){
     this.getRecipe()
   }
 }

</script>
<style>

</style>
