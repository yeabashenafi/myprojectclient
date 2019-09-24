<template>
<v-container>
    <v-layout  :key="name">


              <v-card  width="100%">
                  <v-card-title></v-card-title>
                  <v-card-actions>
                      <v-flex>
                          <v-img :src="getImages(Food[0].image)" color="gray"  width="100%"></v-img>
                          <v-text-label class="display-2 font-weight-black" color="white">{{Food[0].name}}</v-text-label>
                          <div>
                          <p><span class="font-weight-black">Type: </span><span>{{Food[0].type }}</span></span>


                          <p>{{Food[0].description}}</p>

                          <p>
                          <span class="font-weight-black">Contributor:</span>
                          <span>{{Food[0].contributor}}</span>
                          </p>
                          <p>
                          <span class="font-weight-black">Cooking time </span>
                          <span>: {{Food[0].cookTime}}</span>
                          </p>
                          <p class="font-weight-black">Ingredients:</P>
                          <p v-for="ingredient in Food[0].ingredients" :key='ingredient' class="ml-3">{{ingredient}}</p>
                          <p class="font-weight-black">Steps:</p>
                          <p v-for="step in Food[0].steps" :key='step' class="ml-3">{{step}}</p>
                          </div>
                      </v-flex>
                  </v-card-actions>

              </v-card>




  </v-layout>
</v-container>
</template>
<script>
 import {APIService} from '../APIService'
 import RecipeContents from '../components/RecipeContents.vue'
 const apiService = new APIService();
 export default{

     data(){
         return{
             name: this.$route.params.food,
             Food:[]

         }
     },
     methods:{
       getRecipe(){

         apiService.getRecipeByName(this.name).then(
           (data) =>{

             this.Food = data
             console.log(this.Food[0].name)
           }
         )
       },
       getImages(imagename){
           return require('../assets/images/'+ imagename)
       }
     },
     mounted(){
       this.getRecipe();
     }
 }
</script>
<style scoped>
</style>
