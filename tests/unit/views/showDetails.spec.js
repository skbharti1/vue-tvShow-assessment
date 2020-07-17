import { shallowMount } from "@vue/test-utils";
import showDetails from "@/views/showDetails.vue";
import {
  getShowById,
  getPreviousEpisode
} from "@/services/shows-services/shows-services.js";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { routes } from "@/router/index.js";
import Vue from "vue";
import {
  mockedShowData,
  mockedEpisodeData
} from "../mocked-data/mocked-data.js";

// Mock module with Jest mock functions
jest.mock("@/services/shows-services/shows-services.js");

describe("In ShowDetails view component", () => {
  let showDetailsWrapper;

  // create local vue instance
  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    const router = new VueRouter({ routes });
    Vue.use(VueRouter);

    showDetailsWrapper = shallowMount(showDetails, {
      Vue,
      vuetify,
      router,
      data() {
        return {
          id: 1,
          name: "",
          showData: null,
          error: null,
          previousEpisodeError: null,
          scheduleDays: "",
          genres: "",
          rating: 0,
          previousEpisode: null,
          flagIconClassObj: {}
        };
      }
    });
  });

  afterEach(() => {
    showDetailsWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(showDetailsWrapper.isVueInstance).toBeTruthy();
  });

  it("It renders the correct markup", () => {
    expect(showDetailsWrapper.html()).toContain("<div>");
  });

  it("fetch show details bades on id in url params to display", async () => {
    // Control mock to resolve with an object
    getShowById.mockResolvedValue(mockedShowData);
    getPreviousEpisode.mockResolvedValue(mockedEpisodeData);

    await showDetailsWrapper.vm.fetchData();

    expect(showDetailsWrapper.vm.showData).toBe(mockedShowData);
  });

  it("It would return error if any error encountered for getShowById()", async () => {
    const error = new Error("Async error");

    // control mock to reject state
    getShowById.mockRejectedValue(error);

    await showDetailsWrapper.vm.fetchData();

    expect(showDetailsWrapper.vm.error).toBe(error);
  });

  it("fetch previous episode to display", async () => {
    // Control mock to resolve with an object
    getPreviousEpisode.mockResolvedValue(mockedEpisodeData);

    const url = mockedShowData._links.previousepisode.href.substring(21);

    await showDetailsWrapper.vm.fetchPreviousEpisode(url);

    expect(showDetailsWrapper.vm.previousEpisode).toBe(mockedEpisodeData);
  });

  it("It would return error if any error encountered for getPreviousEpisode()", async () => {
    const error = new Error("Async error");

    // control mock to reject state
    getPreviousEpisode.mockRejectedValue(error);

    const url = mockedShowData._links.previousepisode.href.substring(21);

    await showDetailsWrapper.vm.fetchPreviousEpisode(url);

    expect(showDetailsWrapper.vm.previousEpisodeError).toBe(error);
  });
});
