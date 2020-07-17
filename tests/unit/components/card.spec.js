import { routes } from "@/router/index.js";
import { shallowMount } from "@vue/test-utils";
import card from "@/components/Card.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vue from "vue";

describe("In card component", () => {
  let cardWrapper;

  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    const router = new VueRouter({ routes });
    Vue.use(VueRouter);

    cardWrapper = shallowMount(card, {
      Vue,
      vuetify,
      router,
      propsData: {
        data: {
          id: "",
          name: "",
          image: { medium: "" },
          type: "",
          language: "",
          rating: { average: "" }
        }
      }
    });
  });

  afterEach(() => {
    cardWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(cardWrapper.isVueInstance).toBeTruthy();
  });

  it("It renders the correct markup", () => {
    expect(cardWrapper.html()).toContain("v-card");
  });
});
