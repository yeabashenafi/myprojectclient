<template>
  <v-container color="grey" fluid  class="home-contents">

      <v-layout justify-center align-center column pa-5>
          <div color="brown" class="first font-weight-black  text-xs-center mb-10">
               <v-img :src="images.healthy" @click="gotoRecipes" class="img1 pa-10  text-xs-center">
                 <span class="img-text mt-10 display-3">Click here and check out all the recipes for a healthy living </span>
                 </v-img>
        </div>
      </v-layout>
      <v-layout class="flex"  width="100%" >
        <v-card class="card" elevation=0   width="20%" >
          <v-img :src="images.diet" ></v-img>
          <v-card elevation=0 class="route "  @click="addRecipes">
                 You wanted to share the recipes of foods you love,Do it right here.
            </v-card>
        </v-card>
        <v-card elevation =0 width="20%" class="ml-10">
          <v-img :src="images.add" ></v-img>
          <v-card elevation=0  @click="$router.push({name:'login'}) "  >Log-in to get the full features and add your own recipes</v-card>
        </v-card>
        <v-card  width ="20%" elevation=0 class="ml-10">

           <v-img :src=getImages(imageName)></v-img>
           <p>{{last}} </p>
           <p>The latest addition to our collection of recipes ,get new recipes quickly.</p>
        </v-card>

      </v-layout>
      <v-snackbar center class="mb-10" timeout="2000"  v-model="dialog">
         <p>Log-in to add recipes</p>
      </v-snackbar>

  </v-container>
</template>
<script>
import {APIService} from '../APIService'
const apiService = new APIService();
export default{
    name: 'HomeContents',
    components:{

    },
    data(){
        return{
          dialog:false,
          Foods:[],
          imageName:'',
          last:'',
          images:{
                add: require('../assets/56594.png'),
                logo: require('../assets/logo.svg'),
                barbeque: require('../assets/pork-chops-today-181103-main-01_60e7a09865040ff398ed6b3fb9288237.focal-600x300.jpg'),
                healthy: require('../assets/food56.jpg'),
                ethiopian: require('../assets/original-29501-1403038911-15.jpg'),
                diet: require('../assets/56559.png'),

            },
            appTitle: 'My Recipe App',
        }
    },
    methods:{
       gotoRecipes(){

           this.$router.push({name:'recipes'})


       },
       getImages(image){
          return require('../assets/images/'+ image)
      },
       addRecipes(){

         if(this.loggedIn){
           this.$router.push({name:'addr'})
         }
         else{
           this.dialog = true
         }
       },
       getRecipes(){
            apiService.getRecipes().then((data) =>{
              this.Foods = data
              var length =this.Foods.length
              this.last = this.Foods[length-1].name;
              console.log(length)
              this.imageName = this.Foods[length-1].image;
              console.log(this.imageName)
          }
            )


          },
    },
    computed:{
          loggedIn(){

              return this.$store.getters.logged
          }
      },
    mounted(){
      this.getRecipes()
    }
}
</script>
<style scoped>
  .home-contents{

  }
  .first{
    text-align:center;
    display:inlne-block;

  }
  .bbq{

      color:brown;
      height:100%;
  }
  .card{
     border: 0px;
  }
  .route{
    color:black;
    text-decoration:none;
  }
  .div1{
      display: inline-block;
      width:100%;

  }
  .mb-10{
      width:100%;
  }
  .img1{
      color:rgb(251, 253, 255);
      text-align:center;
  }
  .img-text{
    display:inline-block;
    padding-top: 15%;

  }
  .ethio1{
      width:30%;

      margin-left: 0px;
      background-color:brown;
      border:2px ridge;
  }
 .flex{
   padding-left:20%;
 }
 span>div{
     height:10%;
 }
.diet{
    float:left;
    width:30%;
    background-color:brown;
}
.diet>div{
    color:white;
}
.footer{
    width:100%;
}
</style>
