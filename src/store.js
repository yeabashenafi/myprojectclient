import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist"

const vuexPersist = new VuexPersist({
  key:'my-app',
  storage:window.localStorage
})
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedin: false,
    accessToken: "",
    userId : "",
    searchedFood: ""
  },
  mutations: {
    change(state, loggedin){
      state.loggedin = loggedin
    },
    setToken(state,token){
      state.accessToken = token
    },
    setId(state,id){
      state.userId = id
    },
    setFood(state,recipe){
      state.searchedFood = recipe
    }
  },
  getters: {
    logged: state => state.loggedin,
    token:  state => state.accessToken,
    loggedID: state => state.userId,
    searched: state => state.searchedFood
  }
  ,plugins:[vuexPersist.plugin]
});
