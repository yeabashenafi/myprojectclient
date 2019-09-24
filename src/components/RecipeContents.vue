 <template>
 <v-flex>

      <v-layout class="ml-10">

              <v-btn class="mr-5" @click="goTo('Ethiopian')" color="brown" >Ethiopian</v-btn>
              <v-btn class="mr-5" @click="goTo('Western')" color="green">Western</v-btn>
              <v-btn class="mr-5" @click="goTo('Desserts')" color="lime">Desserts</v-btn>
              <v-btn class="mr-5" @click="goTo('Carb-Free')" color="teal">Carb-Free</v-btn>



      </v-layout>

        <v-flex class="ml-10 mb-10" >
        <v-card  @hover="color='red'" class="mt-10 mr-12 recipes" width="28%" max-height="450" v-for="food in Foods " v-bind:key="food.name">
            <v-card-title></v-card-title>
            <v-card-actions @click="viewRecipe(food.name)">
                <v-flex  v-if="val"  >

                    <v-img :src="getImages(food.image)" width="300" height="200"></v-img>
                    <v-text-label class="display-1" max-width="100%">{{food.name }}</v-text-label>
                    <p>{{food.type}}</p>
                    <p>{{food.description}}</p>
                    <p>Cooking time:{{food.cookTime}}</p>
                    <v-flex>



                       <v-btn @click="deleteRecipe(food.id)" dark v-if="del">Delete</v-btn>

                      <v-btn @click="editRecipe(food.name)" dark v-if="edit">Edit</v-btn>
                      <v-snackbar v-model="dialog" timeout="1000">
                        <p>Succesfully deleted</p>
                      </v-snackbar>

                     </v-flex>
                      </v-layout>

                </v-flex>
            </v-card-actions>
        </v-card>









  </v-flex>
  </v-flex>
</template>
<script>
import HeartIcon from '../../node_modules/vue-material-design-icons/Heart.vue';

import {APIService} from "../APIService"
import { setTimeout } from 'timers';
const apiService = new APIService();
 export default{
     name: 'RecipeContents',
     components:{
        HeartIcon,
     },
     data(){
         return{
            dialog:false,
            img:require('../assets/'+'food56.jpg'),
            name:'pizza.jpg',
            val: true,
            edit:false,
            del: false,
            pagination: 0,
             Foods:[

             ],
             images:[]


         }
     },
     methods:{

         goTo(recipeType){
             this.$router.push({name:'recipesSpecific',params:{post_slug:recipeType}})
         },
         Confirm(){
             this.dialog = true;
         },
         viewRecipe(name){
             this.$router.push({name:'details',params:{food:name}})
            },
          getRecipes(){
            apiService.getRecipes().then((data) =>{
              this.Foods = data
              console.log(this.Foods.length)
              this.pagination = ((this.Foods.length/3)+1).toFixed(0);



            }
            )


          },
          editRecipe(name){
            this.$router.push({name:'editRecipe',params:{recipe:name}})
          },
          deleteRecipe(id){
            apiService.deleteRecipe(id,this.$store.getters.token).then((data) =>
            {
              console.log(data)
              if(data = undefined){
                this.dialog = true
                var delay = 1000
                setTimeout(()=>{
                  this.getRecipes()
                },delay)
              }
            })
          },
          getImages(imageName){
              console.log("hey")

              return require('../assets/images/'+ imageName)
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
          },
          pages(){

          return this.pagination

     },




     },
     mounted(){
       this.getRecipes(),
       this.checkAdmin(),

       this.$root.$on('Sort', () => {

         var temp;
         var arr = [];
         var min_index;
         console.log(typeof this.Foods);
         for(var i=0;i < this.Foods.length;i++){
           arr.push(this.Foods[i].name) ;
           //arr.Sort();
         }
         arr.sort();
         console.log(arr)
         for(var j=0;j < arr.length;j++){
           for(var i=0;i < this.Foods.length;i++){

           if(this.Foods[i].name == arr[j]){

             temp = this.Foods[j]
             this.Foods[j] = this.Foods[i]
             this.Foods[i] = temp
             console.log(j+' '+this.Foods[i].name)
             this.val = false
             this.val = true

           //}
         }
         }
         }
         console.log(this.Foods[0].name)
       }),

       this.$root.$on('SortDesc',() => {
         var temp;
         var arr = [];
         var min_index;
         console.log(typeof this.Foods);
         for(var i=0;i < this.Foods.length;i++){
           arr.push(this.Foods[i].name) ;
           //arr.Sort();
         }
         arr.sort();
         arr.reverse();
         console.log(arr)
         for(var j=0;j < arr.length;j++){
           for(var i=0;i < this.Foods.length;i++){

           if(this.Foods[i].name == arr[j]){

             temp = this.Foods[j]
             this.Foods[j] = this.Foods[i]
             this.Foods[i] = temp
             console.log(j+' '+this.Foods[i].name)
             this.val = false
             this.val = true
           }}}
       })
     }
 }
</script>
<style scoped>
  .recipes{
     float:left;
  }
  .iholder{
      max-height:50%;

  }

</style>
