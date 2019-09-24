<template>
  <v-container>
      <v-layout>
          <span>
            
            <sign-contents></sign-contents>
          </span>  
      </v-layout>
  </v-container>
</template>
<script>
 import SignContents from '../components/SignContents.vue' 

 export default{
     name: 'Signin',
     components: {
         SignContents,
     }
 }
 
</script>
<style>
</style>