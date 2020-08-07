<template>
  <v-card
    class="mx-auto"
    max-width="400"
    min-height="375"
    max-height="375"
    v-if="data"
  >
    <router-link
      :to="{ name: 'Show Details', params: { id: data.id, name: data.name } }"
    >
      <v-img
        v-if="data.image"
        height="248px"
        class="white--text align-end"
        lazy-src="../assets/lazy-image-1021-2048x1206.jpg"
        :src="data.image.medium"
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
        v-if="!data.image"
        height="248px"
        class="white--text align-end"
        src="../assets/lazy-image-1021-2048x1206.jpg"
      >
      </v-img>
    </router-link>
    <v-card-subtitle class="pb-0"
      ><span style="color: black;">{{ data.name }}</span
      ><br />{{ data.language }} | {{ data.type }}</v-card-subtitle
    >
    <v-card-actions>
      <span>
        <v-icon color="amber">mdi-star</v-icon>
        <span v-if="data.rating">{{ data.rating.average }}</span>
        <span v-if="!data.rating.average">N/A</span>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    data: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow-y: auto;
  height: 150px;
}
</style>
