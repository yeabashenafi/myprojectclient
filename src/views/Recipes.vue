<template>
   <span>
     <v-layout>

       <v-text-field class="ml-12" v-model ="toSearch" label="Search for a recipe" @click:append="searchRecipe" append-icon="mdi-search-web" ></v-text-field>
       <v-card class="ml-10 mt-3" flat height="5%">
         <v-layout>
           <span class="mt-1 font-weight-black">Sort</span>
           <v-btn color="grey" class="ml-3" @click="sortRecipesDesc"><sort-descending-icon/></v-btn>
           <v-btn @click="sortRecipes" class="ml-3" color="grey"><sort-ascending-icon/></v-btn>
         </v-layout>
       </v-card>
    </v-layout>

           <recipe-contents v-if="rcpCont"></recipe-contents>
           <searched-recipes v-else />

   </span>
</template>
<script>
  import SortAscendingIcon from '../../node_modules/vue-material-design-icons/SortAscending.vue';
  import SortDescendingIcon from '../../node_modules/vue-material-design-icons/SortDescending.vue';

  import {APIService} from '../APIService'
  import RecipeContents from '../components/RecipeContents.vue'
  import searchedRecipes from '../components/searchedRecipes.vue'
  const apiService = new APIService();
  export default{
      name: 'Recipes',
      data(){
        return{
          rcpCont:true,
          toSearch:'',
          search: false,
          searchedRecipe:[]
        }
      },
      components:{
          RecipeContents,
          searchedRecipes,
          SortAscendingIcon,
          SortDescendingIcon
      },
      methods:{
        searchRecipe(){

          var changed=this.toSearch[0].toUpperCase()+this.toSearch.substr(1);
          if(this.toSearch == changed){
            apiService.getRecipeByName(this.toSearch).then(
            (data) =>
            {
               if( data.length != 0){
                   this.searchedRecipe = data
                   this.$store.commit('setFood',data[0].name)
                   this.rcpCont = false


               }
            })
          }
          else{
            apiService.getRecipeByName(this.toSearch).then(
              (data) => {
                if(data.length == 0){
                  apiService.getRecipeByName(changed).then(
                    (data) =>
                    {

                      this.searchedRecipe = data
                      this.$store.commit('setFood',data[0].name)
                      this.rcpCont = false


                    })
                }
                else{
                  this.searchedRecipe = data
                  this.$store.commit('setFood',data[0].name)
                  this.rcpCont = false

                }
              }
            )
          }


        },
        sortRecipes(){
          this.$root.$emit('Sort')
        },
        sortRecipesDesc(){
          this.$root.$emit('SortDesc')
        }
      }
  }
</script>
<style>
</style>
