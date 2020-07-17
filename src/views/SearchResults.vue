<template>
  <div>
    <h4
      v-if="!loading && !searchResults && error"
      style="text-align: center; color: red"
    >
      {{ error }}
    </h4>
    <h4
      v-if="!loading && !searchResults && !error"
      style="text-align: center; color: red"
    >
      No result found. Search with other keyword ...
    </h4>
    <v-container v-if="!loading && searchResults">
      <div class="text-center">
        <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
      </div>
      <v-row>
        <v-col
          v-for="(data, index) in showsList"
          :key="`${index}`"
          cols="12"
          md="4"
          lg="2"
        >
          <app-card :data="data.show" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getShowsByKeyword } from "@/services/shows-services/shows-services.js";
import AppCard from "../components/Card.vue";

export default {
  name: "SearchResults",
  components: {
    AppCard
  },
  data() {
    return {
      searchResults: null,
      showsList: [],
      keyword: "",
      error: null,
      length: 0,
      page: 0,
      itemsPerPage: 12,
      numberOfPages: 1,
      loading: true
    };
  },
  watch: {
    page: function(newPageValue) {
      let itemsToSkip = (newPageValue - 1) * this.itemsPerPage;
      let itemsToShow;

      if (newPageValue * this.itemsPerPage > this.length)
        itemsToShow = this.length - itemsToSkip;
      else itemsToShow = this.itemsPerPage;

      this.showsList = [];

      for (let i = itemsToSkip; i < itemsToSkip + itemsToShow; i++)
        this.showsList.push(this.searchResults[i]);
    }
  },
  created() {
    this.keyword = this.$route.params.keyword;
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const result = await getShowsByKeyword(this.keyword).catch(err => {
        this.error = err;
        this.loading = false;
      });

      if (result) {
        this.searchResults = result;
        this.length = this.searchResults.length;
        if (this.length % this.itemsPerPage === 0)
          this.numberOfPages = this.length / this.itemsPerPage;
        else
          this.numberOfPages = Math.trunc(this.length / this.itemsPerPage) + 1;
        this.page = 1;

        this.loading = false;
      }
    }
  }
};
</script>
