<template>
  <v-layout>

      <v-card color="grey" width="70%" class="mt-10 ml-10 mb-10">
        <v-card-title class="display-1">Edit {{$route.params.recipe}}</v-card-title>
        <v-card-actions>
          <v-flex width=300 class="ml-3">
            <v-label dark >Name</v-label>
            <v-text-field v-model="Food[0].name"></v-text-field>
            <v-label dark>Type</v-label>
            <v-text-field v-model="Food[0].type"></v-text-field>
            <v-label dark>cookTime</v-label>
            <v-text-field v-model="Food[0].cookTime"></v-text-field>
            <v-label dark>description</v-label>
            <v-text-field v-model="Food[0].description"></v-text-field>
            <v-label dark>Ingredients</v-label>
            <br >
            <template v-for="ingredient in Food[0].ingredients.length">


              <v-label class="ml-5" v-bind:key="ingredient" >Ingredient{{ingredient}}</v-label>
              <v-text-field class="ml-3" v-model="Food[0].ingredients[ingredient-1]" v-bind:key="ingredient"></v-text-field>
            </template>
            <v-label dark></v-label>
            <v-label dark>Steps</v-label>
            <br>
            <template v-for="step in Food[0].steps.length">
              <v-label class="ml-3" v-bind:key="step">Step{{step}}</v-label>
              <v-text-field class="ml-3" v-model="Food[0].steps[step-1]" v-bind:key="step"></v-text-field>
            </template>

             <v-layout>
               <v-btn color="cyan" class="ml-10" @click="dialog = true">Edit</v-btn>
             </v-layout>

             <v-dialog v-model="dialog" max-width="30%">
               <v-card>
                        <v-card-title color="brown">Confirm your choices</v-card-title>
                         <v-btn color="red" class="ml-10" @click="edit">Confirm</v-btn>
                         <v-btn @click="goBack" class="ml-5">Return</v-btn>
                        </v-card>
             </v-dialog>
             <v-snackbar v-model="success" top timeout="1000">
               <p>Succesfully edited</p>
             </v-snackbar>
          </v-flex>
        </v-card-actions>
      </v-card>


  </v-layout>
</template>
<script>
import {APIService} from '../APIService'
import { setTimeout } from 'timers';
const apiService = new APIService();

 export default{
   name : 'EditRecipe',
   data(){
     return{
       Food:[],
       dialog:false,
       success:false,
     }
   },
   methods:{
      getRecipe(){
       apiService.getRecipeByName(this.$route.params.recipe).then(
         (data) =>{
           console.log(typeof data)
           this.Food = data
         }
         )
      },
      goBack(){
        this.dialog = false;
      },
      edit(){
        this.dialog = false
        let data={
          name: this.Food[0].name,
          type: this.Food[0].type,
          cookTime: this.Food[0].cookTime,
          description: this.Food[0].description,
          ingredients: this.Food[0].ingredients,
          steps: this.Food[0].steps,
          id :this.Food[0].id
        }
        apiService.editRecipe(data).then((data) => {
             console.log(data)
             if(data != undefined){
               this.success = true
               var delay = 1000
               setTimeout(() => {
                 this.$router.go(-1);
               },delay)
             }
        })
      }
   },
   mounted(){
     this.getRecipe()
   }
 }
</script>
<style>
</style>
