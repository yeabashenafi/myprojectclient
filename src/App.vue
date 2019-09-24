<template>
   <v-app>
     <app-navigation></app-navigation>
     <v-content transition="slide-x-transition">
        <router-view></router-view>
     </v-content>
     <v-footer fill width color="grey darken-4" dark  class="footer">@Recipe app,all rights reserved</v-footer>
   </v-app>
</template>
<script>
import AppNavigation from '@/components/AppNavigation';
export default{
  name: 'App',
  components:{
    AppNavigation
  }
}
</script>
<style>
 .footer{
   width:100%;
 }
</style>
