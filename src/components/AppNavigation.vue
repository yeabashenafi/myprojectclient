<template>
  <span >
    <v-navigation-drawer app v-model="drawer" class="side-nav gray darken-4 mt-10" height="100%" width="20%" dark disable-resize-watcher>
      <v-spacer></v-spacer>
      <v-flex  offset-xs11 >
        <v-card color="red">
        <close-icon @click="drawer=!drawer"></close-icon>
        </v-card>
      </v-flex>

      <v-card  flat  class="route  font-weight-black " to="/">Home</v-card>
        <v-card flat class="route mt-5   font-weight-black" to="/about">About us</v-card>
        <v-card flat class="route mt-5 font-weight-black" to="/recipes">Recipes</v-card>

        <v-card flat v-if="loggedIn"  class="mt-5  font-weight-black " @click="gotoDash()">Dashboard</v-card>

        <v-card v-show="!loggedIn" flat class="route mt-5  font-weight-black" to="/sign-in">Sign-up</v-card>
        <v-card v-show="loggedIn" flat class="route  mt-5  font-weight-black" to="/addRecipes">Add recipe</v-card>
        <v-card v-if="!loggedIn" flat  class="route  mt-5 font-weight-black " to="/login" >Log-in</v-card>

        <v-card v-show="loggedIn" elevate=x0 @click="logOut" flat class=" mt-5 font-weight-black"  >Log-out</v-card>


    </v-navigation-drawer>

    <v-toolbar app color="gray darken-4"  height="80%" dark>
        <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up  ">
            <menu-icon class="display-1"></menu-icon>
        </v-toolbar-side-icon>

        <v-toolbar-title class="ml-10 mb-2">{{appTitle}}</v-toolbar-title>
         <v-spacer></v-spacer>
        <v-card  flat  class="route hidden-sm-and-down ml-5 font-weight-black " to="/">Home</v-card>
        <v-card flat class="route hidden-sm-and-down ml-3 font-weight-black" to="/about">About us</v-card>
        <v-card flat class="route hidden-sm-and-down ml-3 font-weight-black" to="/recipes">Recipes</v-card>

        <v-card flat v-if="loggedIn"  class="hidden-sm-and-down font-weight-black ml-3" @click="gotoDash()">Dashboard</v-card>

        <v-card v-show="!loggedIn" flat class="route hidden-sm-and-down ml-3 font-weight-black" to="/sign-in">Sign-up</v-card>
        <v-card v-show="loggedIn" flat class="route hidden-sm-and-down ml-3 font-weight-black" to="/addRecipe">Add recipe</v-card>
        <v-card v-if="!loggedIn" flat  class="route hidden-sm-and-down font-weight-black ml-3" to="/login" >Log-in</v-card>

        <v-card v-show="loggedIn" elevate=x0 @click="logOut" flat class="ml-3 hidden-sm-and-down font-weight-black"  >Log-out</v-card>


    </v-toolbar>
  </span>
</template>
<script>
import {APIService} from '../APIService';
import MenuIcon from '../../node_modules/vue-material-design-icons/Menu.vue'
import CloseIcon from '../../node_modules/vue-material-design-icons/Close.vue'

const apiService = new APIService();
  export default{
      name : 'AppNavigation',
      components:{
      MenuIcon,
      CloseIcon
      },
      data(){
          return{

              appTitle: 'My recipe app',
              drawer: false,
              items:[
                  {title:'Home'},
                  {title: 'Sign-up' },
                  {title: 'Log-in'}
              ],




          }
      },
      methods:{
          logOut(){
             apiService.logout(this.$store.getters.token).then(
                 (
                     data => {
                         this.$store.commit('setToken',"")
                         this.$store.commit('setId',"")
                         this.$store.commit('change',false)
                         this.$router.push({'name':'home'})
                     }

                 )

             )
          },
          gotoDash(){

          apiService.getAccountById(this.$store.getters.loggedID,this.$store.getters.token).then(
            (data) => {
              if (data.type == 'User'){
                this.$router.push({name:'dashboard',params:{username:data.username}})
              }
              else if(data.type == 'Adminstrtator'){
                this.$router.push({name: 'adminDashboard',params:{username:data.username}})
              }
            }
)


      }
      },
      mounted(){
          console.log(this.$store.getters.logged)
      },
      computed:{
          loggedIn(){

              return this.$store.getters.logged
          }
      }
  }
</script>
<style>
 .lo{
   color:blue;
 }
 .route{
   color:white;
 }
 .side-nav{
   margin-top: 10%;
 }
</style>
