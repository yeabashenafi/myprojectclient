<template>
  <v-flex>
      <v-layout>
              <v-btn class="mr-5" @click="goTo('Ethiopian')" color="brown lighten-3" >Ethiopian</v-btn>
              <v-btn class="mr-5" @click="goTo('Western')" color="green">Western</v-btn>
              <v-btn class="mr-5" @click="goTo('Desserts')" color="lime">Desserts</v-btn>
              <v-btn class="mr-5" @click="goTo('Carb-Free')" color="teal">Carb-Free</v-btn>
      </v-layout>
    <v-layout v-if="val">
      <v-card class="mt-10 mr-12 recipes" width="28%" v-for="recipe in Recipes " v-bind:key="recipe.name">
            <v-card-title></v-card-title>
            <v-card-actions @click="viewRecipe(recipe.name)">
                <v-flex >
                    <v-img :src="getImages(recipe.image)" width="300" height="200"></v-img>
                    <v-text-label class="display-1" width="100%">{{recipe.name}}</v-text-label>
                    <p>{{recipe.type}}</p>
                    <p>{{recipe.description}}</p>
                    <p>Cooking time:{{recipe.cookTime}}</p>
                    <v-flex>
                     <v-layout >


                     <!-- <v-btn @click="deleteRecipe(recipe.id)" dark v-if="del">Delete</v-btn>
                      <v-btn @click="editRecipe(recipe.name)" dark v-if="edit">Edit</v-btn>-->

                     </v-layout>
                      </v-flex>

                </v-flex>
            </v-card-actions>
        </v-card>
      </v-layout>
  </v-flex>
</template>
<script>
import HeartIcon from '../../node_modules/vue-material-design-icons/Heart.vue';
import {APIService} from '../APIService';
const apiService = new APIService();
  export default{
    components:{
     HeartIcon
    },
     data(){
       return{
        Recipes:[

        ],
        val: true
       }

     },
     methods:{

         goTo(recipeType){
             this.$router.push({name:'recipesSpecific',params:{post_slug:recipeType}})
             this.val = false
             this.getRecipes()
             console.log(this.Recipes)
             this.val = true
         },
       getRecipes(){
         apiService.getRecipeByType(this.$route.params.post_slug).then(
           (data) => {
             this.Recipes = data
             //console.log(this.Recipes)
           })
       },

         viewRecipe(name){
             this.$router.push({name:'details',params:{food:name}})
            },
       getImages(imageName){
              console.log("hey")

              return require('../assets/images/'+ imageName)
          },
     },
     mounted(){
       this.getRecipes()
       //console.log(this.$route.params.post_slug);

       this.val = true
     }
  }
</script>
<style scoped>
</style>
