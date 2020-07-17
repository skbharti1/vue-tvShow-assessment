<template>
  <v-app-bar app color="blue" dark>
    <v-app-bar-nav-icon
      v-if="showNavLink"
      class="hidden-md-and-up"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <router-link :to="defaultPageUrl">
      <v-toolbar-title color="brown lighten-4">
        {{ headerMainTitle }}
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <v-text-field
      class="mx-4 hidden-sm-and-down"
      flat
      dense
      hide-details
      label="Search"
      solo-inverted
      v-model="keyword"
      :append-icon="keyword ? 'search' : 'mdi-microphone'"
      @click:append="searchShow"
      @keyup.enter="searchShow"
      clear-icon="mdi-close-circle"
      clearable
    ></v-text-field>

    <v-spacer></v-spacer>

    <v-item-group v-if="showNavLink" class="hidden-sm-and-down">
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
    </v-item-group>

    <v-icon
      class="hidden-md-and-up"
      @click.stop="showSearchBar = !showSearchBar"
      >search</v-icon
    >

    <v-navigation-drawer
      dark
      color="brown"
      v-model="showSearchBar"
      absolute
      temporary
    >
      <v-text-field
        class="mx-2"
        flat
        dense
        hide-details
        label="Search"
        solo-inverted
        v-model="keyword"
        :append-icon="keyword ? 'search' : 'mdi-microphone'"
        @click:append="searchShow"
        @keyup.enter="searchShow"
        clear-icon="mdi-close-circle"
        clearable
        :style="{ marginTop: '10px' }"
      ></v-text-field>
    </v-navigation-drawer>

    <v-navigation-drawer
      dark
      color="brown"
      v-model="drawer"
      absolute
      temporary
      height="100vh"
    >
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="`${link.label}-header-link`"
          :to="link.url"
        >
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-header",
  props: {
    showNavLink: {
      type: Boolean,
      default: true
    },
    headerMainTitle: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: false
    },
    defaultPageUrl: {
      type: String,
      required: true
    }
  },
  created() {
    if (this.$route.params && this.$route.params.keyword)
      this.keyword = this.$route.params.keyword;
  },
  methods: {
    searchShow() {
      if (this.keyword) this.$router.replace("/search/" + this.keyword);
    }
  },
  data() {
    return {
      drawer: false,
      showSearchBar: false,
      keyword: ""
    };
  }
};
</script>

<style scoped>
.v-application a {
  color: white;
  text-transform: uppercase;
  font-size: 0.875rem;
  text-decoration: none;
  font-weight: 300;
}
.v-navigation-drawer {
  top: 50px;
}
</style>
