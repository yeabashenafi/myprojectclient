<template>
 <v-container fill width>
     <v-layout>
         <v-card width= 500 class="grey">
             <v-card-title>
                 Add a recipe
             </v-card-title>
             <v-card-actions>
                 <v-form id="form"  @submit.prevent="false" name ="form" class="ml-3"  ref="form" enctype="multipart/form-data">
                    <v-text-field v-model="Foods.name" :rules="Rules" label="Name of the food"></v-text-field>
                    <v-text-field v-model="Foods.description" :rules="Rules" label="Description"></v-text-field>
                    <v-label>Rating</v-label>
                    <v-text-field :rules="Rules" label="Select image" v-model='imageName' @click='pickFile'></v-text-field>
                    <v-select v-model="Foods.type" :rules="Rules" :items="foodtypes" label="type of food"></v-select>
                    <input type="file" style="display:none" name="image" ref="image" accept="image/*" @change="onFilePicked">
                    <v-layout>
                        <v-text-field width="70%" :rules="Rules" v-model="Foods.cooktime" label="Cooking time" class="mr-5"></v-text-field>
                        <v-select width="30%" :rules="Rules" v-model="selected" :items="options" label="Hours or Minutes"></v-select>
                    </v-layout>

                        <v-label class="display-1">Contributor:{{contributor  }}</v-label>


                    <template v-for="ingredient in ingredients">
                        <v-text-field v-model="Foods.ingredients[ingredient-1]" :rules="Rules" :label="label1[ingredient-1]"  v-bind:key="ingredient" append-icon="mdi-plus" @click:append="addIngredient"></v-text-field>
                    </template>

                    <template v-for="step in steps">
                        <v-text-field v-model="Foods.Steps[step-1]" :rules="Rules" :label="label[step-1]"  v-bind:key="step" append-icon="mdi-plus" @click:append="addStep"></v-text-field>

                    </template>

                    <v-btn   color="white" form="form" @click="add"  >Add</v-btn>

                       <v-snackbar top timeout="1000" v-model="dialog"  >
                         <p>
                          Added succesfully
                         </p>
                       </v-snackbar>



                 </v-form>

                 </v-card-actions>
         </v-card>
     </v-layout>
 </v-container>
</template>
<script>
 import {APIService} from '../APIService';
 import axios from 'axios';
 const apiService = new APIService();
    export default{
        component:{

        },
        data(){
            return{
                isValidated:false,
                dialog: false,
                label: ['Steps'],
                label1: ['Ingredients'],
                ingredients: 1,
                steps: 1,
                Rules:[ v => !!v || "The input is required"],
                path:'localhost:3000/api/recipes/uploadImage',
                imagePath:'hello',
                imageName: '',
                imageURL: '',
                imageFile: '',
                image:'',
                contributor: '',
                Foods:
                    {
                        name: '',
                        type:'',
                        image:'',
                        cooktime:'',
                        description:'',
                        ingredients:[
                            '',
                        ],
                        Steps:[
                            '',


                        ],
                        rating:'',



                    },
                selected: '',

                foodtypes:[
                    'Ethiopian',
                    'Western',
                    'Desserts',
                    'Carb-Free'
                ],
                options:['Hours',
                'mins'],
                field_output: null
            }
        },
        methods:{
            pickFile(){
                this.$refs.image.click()
            },
            submitForm(){

              let data={
                  image:this.imageURL
              }

              console.log(form);
                apiService.createRecipe(data,this.$store.getters.token).then(data => {
                  console.log(data);
               })


            },
            add(){
               this.$refs.form.validate()
               this.isValidated = this.$refs.form.validate;

               if(this.isValidated){

               this.Foods.image = this.imageURL
               this.Foods.cooktime =   this.Foods.cooktime + ' ' + this.selected

               var x = document.getElementById('form').elements.image.files[0]
               console.log(x)

               apiService.uploadImage(x,this.$store.getters.token,this.$store.getters.loggedID,this.Foods.name).then(data => {
                   console.log(data);
               });

               let data={
                   name : this.Foods.name,
                   type: this.Foods.type,
                   image: this.imageName,
                   cookTime: this.Foods.cooktime,
                   contributor:this.contributor,
                   description: this.Foods.description,
                   ingredients: this.Foods.ingredients,
                   steps: this.Foods.Steps,
               }

               apiService.createRecipe(data,this.$store.getters.token).then((data) =>{
                   console.log(data),
                   this.dialog = true
               })
               }

            },

            addIngredient(){
                if(this.label1 == 'Ingredients'){
                  this.label1[0] = 'Ingredient' + this.ingredients
                }
               this.ingredients++;
               this.label1[this.ingredients - 1] = 'Ingredient' + this.ingredients
            },

            addStep(){


              if (this.label== 'Steps'){
                  this.label[0] = 'Step' + this.steps
              }
              this.steps++;
              this.label[this.steps - 1] = 'Step' + this.steps

            },

             getUsername(){
                var id = this.getUserId
                apiService.getAccountById(id,this.$store.getters.token).
                then((data => {
                    this.contributor = data.username
                }
                ))
             },

            onFilePicked(e){
                const files = e.target.files
                if (files[0] !== undefined){
                    this.imageName = files[0].name

                    if (this.imageName.lastIndexOf('.') <= 0){
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load',() => {
                        this.imageURL = fr.result

                        //this.imageURL = URL.createObjectURL(files[0])
                        this.imageFile = files[0]
                    })
                }
                else{
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageURL = ''
                }
            }
        },
        mounted(){
           this.getUsername()


        },
        computed:{
            getUserId(){
                 return this.$store.getters.loggedID
            }
        }
    }
</script>
<style>
.form{
    width: 100%;
}
</style>
