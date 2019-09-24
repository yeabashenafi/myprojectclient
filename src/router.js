import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/sign-in",
      name: "signin",
      component: () =>
        import("./views/Signin.vue")
    },
    {
      path: "/addRecipe",
      name: "addr",
      component: () =>
        import("./views/addRecipe.vue")

    },
    {
         path: '/dashboard/:username',
         name: 'dashboard',
         component: () =>
            import ("./views/Dashboard.vue")
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () =>
         import("./views/Recipes.vue")
    },

    {
      path: "/recipes/:post_slug",
      name: "recipesSpecific",
      component: () =>
        import("./views/Ethiopian.vue")

    },
    {
      path: "/recipes/western",
      name:"western",
      component: () =>
        import("./views/Western.vue")
    },
    {
      path:"recipes/carbfree",
      name:"carbfree",
      component: ( ) =>
         import("./views/CarbFree.vue")
    },
    {
      path:"/recipes/desserts",
      name:"desserts",
      component: () =>
        import("./views/Dessert.vue")
    },
    {
       path: "/recipes/:food",
       name: "details",
       component: () =>
         import("./views/RecipeDetails.vue")
    },
    {
      path: "editRecipe/:recipe",
      name: "editRecipe",
      component:() =>
        import("./views/EditRecipe.vue")

    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./views/LogIn.vue")
    },
    {
      path: '/admin/:username',
      name: 'adminDashboard',
      component: () =>
        import("./views/adminDashboard.vue")
    }
  ]
});
