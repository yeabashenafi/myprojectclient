import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'vue-material-design-icons/styles.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VueMaterial,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.use(VueMaterial);