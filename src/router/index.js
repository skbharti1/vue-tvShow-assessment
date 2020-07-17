import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/search/:keyword",
    name: "Search Results",
    component: SearchResults // () =>
    // import(
    //   /* webpackChunkName: "search-results" */ "../views/SearchResults.vue"
    // )
  },
  {
    path: "/shows/:id/:name",
    name: "Show Details",
    component: () =>
      import(/* webpackChunkName: "show-details" */ "../views/ShowDetails.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
