import { routes } from "@/router/index.js";
import { shallowMount } from "@vue/test-utils";
import SearchResults from "@/views/SearchResults.vue";
import { getShowsByKeyword } from "@/services/shows-services/shows-services.js";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import appCard from "@/components/Card.vue";
import Vue from "vue";
import { mockedShowData } from "../mocked-data/mocked-data.js";

// Mock module with Jest mock functions
jest.mock("@/services/shows-services/shows-services.js");

describe("In SearchResults view component", () => {
  let searchResultsWrapper;

  // create local vue instance
  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    const router = new VueRouter({ routes });
    Vue.use(VueRouter);

    searchResultsWrapper = shallowMount(SearchResults, {
      Vue,
      vuetify,
      router,
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
      }
    });
  });

  afterEach(() => {
    searchResultsWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(searchResultsWrapper.isVueInstance).toBeTruthy();
  });

  it("It renders the correct markup", () => {
    expect(searchResultsWrapper.html()).toContain("<div>");
  });

  describe("It should load app-card component", () => {
    it("It should load the app-card", () => {
      expect(appCard).toBeTruthy();
    });
  });

  it("fetch some shows according to search keyword in url params to display", async () => {
    searchResultsWrapper.setData({ keyword: "under" });

    const items = [mockedShowData, mockedShowData, mockedShowData];

    // Control mock to resolve with an array
    getShowsByKeyword.mockResolvedValue(items);

    await searchResultsWrapper.vm.fetchData();

    expect(searchResultsWrapper.vm.searchResults).toBe(items);
  });

  it("It would return error if any error encountered", async () => {
    const error = new Error("Async error");

    getShowsByKeyword.mockRejectedValue(error);

    await searchResultsWrapper.vm.fetchData();

    expect(searchResultsWrapper.vm.error).toBe(error);
  });
});
