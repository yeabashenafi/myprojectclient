<template>
 <span>
   {{$store.getters.searched}}
   <v-card  class="mt-10 mr-12 recipes" width="28%" v-for="recipe in Recipes " v-bind:key="recipe.name">

            <v-card-actions>
                <v-flex >
                    <v-img :src="getImages(recipe.image)" width="300" height="200"></v-img>
                    <v-text-label class="display-1" width="100%">{{recipe.name}}</v-text-label>
                    <p>{{recipe.type}}</p>
                    <p>{{recipe.description}}</p>
                    <p>Cooking time:{{recipe.cookTime}}</p>
                    <v-flex>
                      <v-layout>
                      <heart-icon class="display-1 lime" light color="white"/>
                      <v-btn class="ml-5" @click="viewRecipe(recipe.name)" dark>View</v-btn>
                      </v-layout>
                      <v-btn @click="deleteRecipe(recipe.id)" dark v-if="del">Delete</v-btn>
                      <v-btn @click="editRecipe(recipe.name)" dark v-if="edit">Edit</v-btn>
                    </v-flex>
                    <v-pagination length=5 circle></v-pagination>
                </v-flex>
            </v-card-actions>
        </v-card>

 </span>
</template>
<script>
import HeartIcon from '../../node_modules/vue-material-design-icons/Heart.vue';
import {APIService} from '../APIService';
const apiService = new APIService();
export default {
  data(){
   return{

     Recipes:[],
     edit:false,
     del: false,
   }
  },
  components:{
    HeartIcon
  },
  methods:{
    getRecipe(){
      apiService.getRecipeByName(this.$store.getters.searched).then(
        (data) => {
          this.Recipes = data
        }
      )
    },
    getImages(imageName){
        console.log("hey")

        return require('../assets/images/'+ imageName)
          },
    editRecipe(name){
        this.$router.push({name:'editRecipe',params:{recipe:name}})
          },
    deleteRecipe(id){
       apiService.deleteRecipe(id,this.$store.getters.token).then((data) =>
            {
              console.log(data)
            })
          },
    viewRecipe(name){
      this.$router.push({name:'details',params:{food:name}})
    },
    checkAdmin(){

            var id = this.$store.getters.loggedID
            if(id != ""){
              apiService.getAccountById(id,this.$store.getters.token).then(
                (data) => {
                  console.log(data.type)
                  if (data.type == 'Adminstrtator'){
                    this.edit = true
                    this.del =true
                  }
                }
              )
              console.log("someone's logged in")
            }
          }
  },

  mounted(){
    this.getRecipe()
    this.checkAdmin()
  }
}
</script>
<style>
</style>
