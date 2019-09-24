<template>
  <v-container>
      <v-layout>
          <span>
            <log-contents></log-contents>
          </span>
      </v-layout>
  </v-container>

</template>
<script>
import LogContents from '../components/LogContents.vue'
  export default{
    name: 'login',
    components:{
      LogContents,
    }
  }
</script>
<style>
</style>