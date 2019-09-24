 <template>
<span>
  <v-layout>
        <v-spacer></v-spacer>
        <v-label class="display-1" color="brown">Hey {{$route.params.username}}</v-label>

  </v-layout>
  <v-layout>
      <v-card class="ml-0" color="gray darken-4" dark >
         <v-card-actions>
             <v-flex >
                 <v-card class="mb-5 " color="gray darken-4" @click="recipes" elevation=0>Your recipes</v-card>
                 <v-card class="mb-5"   color="gray darken-4" @click="account" elevation=0>Your account</v-card>
                 <v-card @click="wishlist" color="gray darken-4" elevation=0>Wishlist</v-card>
             </v-flex>

        </v-card-actions>

     </v-card>
     <your-account v-if="yAt" class="ml-5"/>
     <your-recipes v-if="yRp" class="ml-5"/>
  </v-layout>

    <v-container>


    </v-container>
</span>
</template>
<script>
import yourAccount from "../components/yourAccount.vue"
import yourRecipes from "../components/yourRecipes.vue"
  export default{

    name: "Dashboard",
    components:{
        yourAccount,
        yourRecipes
    },
    data(){
        return{
            yAt: true,
            yRp: false,
            wLst:false,
        }
    },
    methods:{
        recipes(){
          this.yRp = true;
          this.wLst = false;
          this.yAt = false;
        },
        account(){
           this.yRp = false;
          this.wLst = false;
          this.yAt = true;

        },
        wishlist(){
          this.yRp = false;
          this.wLst = true;
          this.yAt = false;
        }
    }
  }
</script>
