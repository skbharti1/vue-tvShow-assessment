import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";
import About from "../views/About.vue";
import ShowDetails from "../views/ShowDetails.vue";

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
    component: About
  },
  {
    path: "/search/:keyword",
    name: "Search Results",
    component: SearchResults
  },
  {
    path: "/shows/:id/:name",
    name: "Show Details",
    component: ShowDetails
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
