import { shallowMount } from "@vue/test-utils";
import { routes } from "@/router/index.js";
import app from "@/App.vue";
import appHeader from "@/components/Header.vue";
import appFooter from "@/components/Footer.vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vue from "vue";

describe("In App Component", () => {
  let appWrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    const vuetify = new Vuetify({});

    const router = new VueRouter({ routes });
    Vue.use(VueRouter);

    appWrapper = shallowMount(app, {
      Vue,
      vuetify,
      router
    });
  });

  afterEach(() => {
    appWrapper.destroy();
  });

  it("Is a Vue instance", () => {
    expect(appWrapper.isVueInstance).toBeTruthy();
  });

  it("Renders the correct markup", () => {
    expect(appWrapper.html()).toContain("</v-app-stub>");
  });

  describe("It should load appHeader component", () => {
    it("It should load the app-header", () => {
      expect(appHeader).toBeTruthy();
    });

    it("It should have a <app-header-stub></app-header-stub>", () => {
      expect(appWrapper.html()).toContain("</app-header-stub>");
    });
  });

  it("It should have a <v-main-stub></v-main-stub>", () => {
    expect(appWrapper.html()).toContain("</v-main-stub>");
  });

  it("It should have a <router-view-stub></router-view-stub>", () => {
    expect(appWrapper.html()).toContain("</router-view-stub>");
  });

  describe("It should load appFooter component", () => {
    it("It should load the app-footer", () => {
      expect(appFooter).toBeTruthy();
    });

    it("It should have a <app-footer-stub></app-footer-stub>", () => {
      expect(appWrapper.html()).toContain("</app-footer-stub>");
    });
  });
});
