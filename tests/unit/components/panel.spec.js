import { shallowMount } from "@vue/test-utils";
import panel from "@/components/Panel.vue";
import Vuetify from "vuetify";
import appCard from "@/components/Card.vue";
import Vue from "vue";
import { mockedShowData } from "../mocked-data/mocked-data.js";

describe("In panel component", () => {
  let panelWrapper;

  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    panelWrapper = shallowMount(panel, {
      Vue,
      vuetify,
      propsData: {
        showsBasedOnGenre: {
          genre: "GenreName",
          showsList: [mockedShowData, mockedShowData, mockedShowData]
        }
      },
      data() {
        return {
          showsList: [],
          error: null,
          length: 0,
          page: 0,
          itemsPerPage: 6,
          numberOfPages: 1
        };
      }
    });
  });

  afterEach(() => {
    panelWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(panelWrapper.isVueInstance).toBeTruthy();
  });

  it("It renders the correct markup", () => {
    expect(panelWrapper.html()).toContain("<div>");
  });

  describe("It should load app-card component", () => {
    it("It should load the app-card", () => {
      expect(appCard).toBeTruthy();
    });
  });

  it("It loads Panel Component with Show Data", () => {
    panelWrapper.vm.onStart();
    expect(panelWrapper.vm.length).toEqual(3);
  });

  it("It loads Panel Component with Show Data in responsive view", () => {
    panelWrapper.setData({ itemsPerPage: 3 });

    panelWrapper.vm.onStart();
    expect(panelWrapper.vm.length).toEqual(3);
  });
});
