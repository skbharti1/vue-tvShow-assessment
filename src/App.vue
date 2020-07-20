<template>
  <v-app>
    <app-header
      :showNavLink="showNavLink"
      :links="navLinkUrl"
      :defaultPageUrl="defaultPageUrl"
      :headerMainTitle="headerMainTitle"
    />
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <app-footer v-bind:footerDescription="footerDescription" />
  </v-app>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      showNavLink: true,
      footerDescription: "TV Shows",
      headerMainTitle: "TV Shows",
      navLinkUrl: [
        {
          label: "Home",
          url: "/"
        },
        {
          label: "About",
          url: "/about"
        }
      ],
      defaultPageUrl: "/"
    };
  }
};
</script>
