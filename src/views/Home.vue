<template>
  <div class="home">
    <v-container>
      <h4 v-if="error" style="text-align: center; color: red">{{ error }}</h4>
      <v-row justify="center" v-if="dataFetchingDone">
        <v-expansion-panels popout v-model="panel">
          <v-expansion-panel
            v-for="(genre, i) in showsBasedOnGenresArray"
            :key="i"
          >
            <v-expansion-panel-header>{{
              genre.genreName
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <custom-panel :showsBasedOnGenre="genre"></custom-panel>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CustomPanel from "@/components/Panel.vue";
import { getShows } from "@/services/shows-services/shows-services.js";

export default {
  name: "Home",
  components: {
    CustomPanel
  },
  data() {
    return {
      error: null,
      showsList: null,
      showsBasedOnGenres: {},
      showsBasedOnGenresArray: [],
      dataFetchingDone: false,
      panel: 0
    };
  },
  mounted() {
    this.getShowsOnDashboard();
  },
  methods: {
    async getShowsOnDashboard() {
      const result = await getShows().catch(err => {
        this.error = err;
      });

      if (result) {
        this.showsList = result;
        this.filterShowsBasedOnGenres();
      }
    },
    filterShowsBasedOnGenres() {
      this.showsList.map(show => {
        if (show.genres)
          show.genres.map(genre => {
            if (this.showsBasedOnGenres[genre])
              this.showsBasedOnGenres[genre].showsList.push(show);
            else {
              const genreObj = {
                genreName: genre,
                showsList: [show]
              };
              this.showsBasedOnGenres[genre] = genreObj;
            }
          });
      });
      this.sortGenreByName();
      this.dataFetchingDone = true;
    },
    sortGenreByName() {
      for (var genre in this.showsBasedOnGenres)
        this.showsBasedOnGenresArray.push(this.showsBasedOnGenres[genre]);

      this.showsBasedOnGenresArray.sort((genreA, genreB) => {
        var nameA = genreA.genreName.toUpperCase();
        var nameB = genreB.genreName.toUpperCase();

        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
    }
  }
};
</script>
