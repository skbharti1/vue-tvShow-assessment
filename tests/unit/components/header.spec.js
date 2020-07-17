import { routes } from "@/router/index.js";
import { shallowMount } from "@vue/test-utils";
import appHeader from "@/components/header.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vue from "vue";

describe("In header component", () => {
  let appHeaderWrapper;

  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    const router = new VueRouter({ routes });
    Vue.use(VueRouter);

    appHeaderWrapper = shallowMount(appHeader, {
      Vue,
      vuetify,
      router,
      propsData: {
        showNavLink: "",
        headerMainTitle: "",
        links: [],
        defaultPageUrl: ""
      }
    });
  });

  afterEach(() => {
    appHeaderWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(appHeaderWrapper.isVueInstance).toBeTruthy();
  });

  it("It renders the correct markup", () => {
    expect(appHeaderWrapper.html()).toContain("v-app-bar");
  });

  it("It must have an input field", () => {
    expect(appHeaderWrapper.findAll("v-input-text-stub")).toBeTruthy();
  });

  it("searchShow() will not route to /search/:keyword, if no keyword is provided", async () => {
    await appHeaderWrapper.vm.searchShow();
    expect(appHeaderWrapper.vm.$route.path).toBe("/");
  });

  it("searchShow() will route to /search/:keyword, if keyword is provided", async () => {
    appHeaderWrapper.setData({ keyword: "keyword" });
    await appHeaderWrapper.vm.searchShow();
    expect(appHeaderWrapper.vm.$route.path).toBe("/search/keyword");
  });
});
