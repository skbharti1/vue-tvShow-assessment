<template>
  <v-footer color="blue lighten-4" padless>
    <v-layout justify-center wrap>
      <v-flex blue py-4 text-center white--text xs12>
        {{ new Date().getFullYear() }} —
        <strong>{{ footerDescription }} </strong> &copy; <i>Saurabh Bharti</i>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  name: "app-footer",
  components: {},
  props: {
    footerDescription: {
      type: String
    }
  }
};
</script>
