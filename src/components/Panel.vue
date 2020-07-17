<template>
  <div>
    <v-container v-if="showsBasedOnGenre">
      <v-row>
        <v-col
          v-for="(show, index) in showsList"
          :key="`${index}`"
          cols="12"
          sm="6"
          md="4"
          lg="2"
        >
          <app-card :data="show" />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import AppCard from "../components/Card.vue";

export default {
  name: "CustomPanel",
  components: {
    AppCard
  },
  props: {
    showsBasedOnGenre: { type: Object }
  },
  data() {
    return {
      showsList: [],
      length: 0,
      page: 0,
      itemsPerPage: 6,
      numberOfPages: 1
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
        this.showsList.push(this.showsBasedOnGenre.showsList[i]);
    }
  },
  mounted() {
    this.onStart();
  },
  methods: {
    onStart() {
      if (this.showsBasedOnGenre && this.showsBasedOnGenre.showsList) {
        this.sortByRatings();
        this.length = this.showsBasedOnGenre.showsList.length;
        if (this.length % this.itemsPerPage === 0)
          this.numberOfPages = this.length / this.itemsPerPage;
        else
          this.numberOfPages = Math.trunc(this.length / this.itemsPerPage) + 1;
        this.page = 1;
      }
    },
    sortByRatings() {
      this.showsBasedOnGenre.showsList.sort((showA, showB) => {
        var ratingA = showA.rating.average;
        var ratingB = showB.rating.average;

        return ratingB - ratingA;
      });
    }
  }
};
</script>
