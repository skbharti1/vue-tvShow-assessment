import { routes } from "@/router/index.js";
import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import { get250Shows } from "@/services/shows-services/shows-services.js";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import customPanel from "@/components/Panel.vue";
import Vue from "vue";
import { mockedShowData } from "../mocked-data/mocked-data.js";

// Mock module with Jest mock functions
jest.mock("@/services/shows-services/shows-services.js");

describe("In Home view component", () => {
  let homeWrapper;

  // create local vue instance
  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    const router = new VueRouter({ routes });
    Vue.use(VueRouter);

    homeWrapper = shallowMount(Home, {
      Vue,
      vuetify,
      router,
      data() {
        return {
          error: null,
          showsList: null,
          showsBasedOnGenres: {},
          showsBasedOnGenresArray: [],
          dataFetchingDone: false,
          panel: 0
        };
      }
    });
  });

  afterEach(() => {
    homeWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(homeWrapper.isVueInstance).toBeTruthy();
  });

  it("It renders the correct markup", () => {
    expect(homeWrapper.html()).toContain('<div class="home">');
  });

  it("div element should have class='home'", () => {
    expect(homeWrapper.attributes("class")).toBe("home");
  });

  describe("It should load custom-panel component", () => {
    it("It should load the custom-panel", () => {
      expect(customPanel).toBeTruthy();
    });
  });

  it("fetch some shows to display", async () => {
    const items = [mockedShowData, mockedShowData, mockedShowData];

    // Control mock to resolve with an array
    get250Shows.mockResolvedValue(items);

    await homeWrapper.vm.getShowsOnDashboard();

    expect(homeWrapper.vm.showsList).toBe(items);
  });

  it("It would return error if any error occured", async () => {
    const error = new Error("Async error");

    // Control mock to rejected state
    get250Shows.mockRejectedValue(error);

    await homeWrapper.vm.getShowsOnDashboard();

    expect(homeWrapper.vm.error).toBe(error);
  });
});
