<template>
  <div>
    <h4 v-if="!showData && error" style="text-align: center; color: red">
      {{ error }}
    </h4>
    <v-container fill-height v-if="showData">
      <v-row :align="'center'" :justify="'center'">
        <v-col :sm="12" :md="5" :lg="5">
          <v-img
            v-if="showData.image && showData.image.original"
            width="450"
            height="500"
            lazy-src="../assets/lazy-image-1021-2048x1206.jpg"
            :src="showData.image.original"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-img
            v-if="!(showData.image && showData.image.original)"
            width="450"
            height="500"
            src="../assets/lazy-image-1021-2048x1206.jpg"
          >
          </v-img>
        </v-col>

        <v-col :sm="12" :offset-md="1" :md="5" :offset-lg="1" :lg="5">
          <h1>{{ showData.name }}</h1>
          <h4>
            Language: {{ showData.language }} | Rating:
            <span v-if="showData.rating && showData.rating.average"
              >{{ showData.rating.average }}/10</span
            >
            <span v-if="!(showData.rating && showData.rating.average)"
              >N/A</span
            >
            <v-icon color="yellow darken-3">mdi-star</v-icon>
          </h4>
          <v-chip
            class="ma-2"
            color="grey"
            label
            text-color="white"
            v-for="(genre, index) in showData.genres"
            :key="index"
          >
            <v-icon left>mdi-label</v-icon>
            {{ genre }}
          </v-chip>

          <br />
          <br />
          <span
            :style="{ textAlign: 'justify' }"
            v-html="showData.summary"
          ></span>
        </v-col>
      </v-row>

      <br /><br />

      <v-row :align="'center'" :justify="'center'">
        <v-col :sm="12" :offset-md="1" :md="4" :offset-lg="1" :lg="4">
          <v-card class="pa-2 grey lighten-5" tile>
            <v-card-title>
              Show Info:
            </v-card-title>
            <v-card-text>
              <b>Network:</b> <span :class="flagIconClassObj"></span> &nbsp;
              <span v-if="showData.network">{{ showData.network.name }}</span>
              <br />
              <b>Language:</b> {{ showData.language }}
              <br />
              <b>Schedule:</b> {{ scheduleDays }} at
              <span v-if="showData.schedule">{{ showData.schedule.time }}</span>
              ({{ showData.runtime }} min)
              <br />
              <b>Status:</b> {{ showData.status }}
              <br />
              <b>Show Type:</b> {{ showData.type }}
              <br />
              <b>Genres:</b> {{ genres }}
              <br />
              <v-rating
                v-model="rating"
                dense
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                readonly
              ></v-rating>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col :sm="12" :offset-md="1" :md="6" :offset-lg="1" :lg="6">
          <v-card class="pa-2 grey lighten-5" tile>
            <span>Previous Episode</span>
            <div v-if="previousEpisode">
              <v-row :align="'center'" :justify="'center'">
                <v-col :align="'center'">
                  <v-img
                    v-if="previousEpisode.image && previousEpisode.image.medium"
                    height="147.97"
                    width="264.25"
                    lazy-src="../assets/lazy-image-1021-2048x1206.jpg"
                    :src="previousEpisode.image.medium"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-img
                    v-if="
                      !(previousEpisode.image && previousEpisode.image.medium)
                    "
                    height="147.97"
                    width="264.25"
                    src="../assets/lazy-image-1021-2048x1206.jpg"
                  >
                  </v-img>
                </v-col>
                <v-col :md="12" :lg="6">
                  <v-card-text>
                    <h3>{{ previousEpisode.name }}</h3>
                    <h5>
                      Episode {{ previousEpisode.season }}x{{
                        previousEpisode.number
                      }}; {{ previousEpisode.airdate }}
                    </h5>
                    <span
                      :style="{ textAlign: 'justify' }"
                      v-html="previousEpisode.summary"
                    ></span>
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  getShowById,
  getPreviousEpisode
} from "../services/shows-services/shows-services.js";

export default {
  name: "ShowDetails",
  data() {
    return {
      id: "",
      name: "",
      showData: null,
      error: "",
      previousEpisodeError: "",
      scheduleDays: "",
      genres: "",
      rating: 0,
      previousEpisode: null,
      flagIconClassObj: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const result = await getShowById(this.id).catch(err => {
        this.error = err;
      });

      if (result) {
        this.showData = result;

        if (
          this.showData.network &&
          this.showData.network.country &&
          this.showData.network.country.code
        ) {
          const flagIconClass =
            "flag-icon-" + this.showData.network.country.code.toLowerCase();
          this.flagIconClassObj["flag-icon"] = true;
          this.flagIconClassObj[flagIconClass] = true;
        }

        this.scheduleDays =
          this.showData.schedule &&
          this.showData.schedule.days &&
          this.showData.schedule.days.join(", ");

        this.genres = this.showData.genres && this.showData.genres.join(" | ");

        this.rating =
          this.showData.rating &&
          this.showData.rating.average &&
          Math.floor(this.showData.rating.average) / 2;

        if (
          this.showData._links &&
          this.showData._links.previousepisode &&
          this.showData._links.previousepisode.href
        ) {
          const url = this.showData._links.previousepisode.href.substring(21);
          this.fetchPreviousEpisode(url);
        }
      }
    },
    async fetchPreviousEpisode(url) {
      const previousEpisodeResult = await getPreviousEpisode(url).catch(err => {
        this.previousEpisodeError = err;
      });

      if (previousEpisodeResult) this.previousEpisode = previousEpisodeResult;
    }
  }
};
</script>

<style>
@import "../../node_modules/flag-icon-css/css/flag-icon.css";
</style>
