import { shallowMount } from "@vue/test-utils";
import appFooter from "@/components/footer.vue";
import Vuetify from "vuetify";
import Vue from "vue";

describe("In footer component", () => {
  let appFooterWrapper;

  beforeEach(() => {
    const vuetify = new Vuetify({});
    Vue.use(Vuetify);

    appFooterWrapper = shallowMount(appFooter, {
      Vue,
      vuetify,
      propsData: { footerDescription: "" }
    });
  });

  afterEach(() => {
    appFooterWrapper.destroy();
  });

  it("Is a vue instance", () => {
    expect(appFooterWrapper.isVueInstance).toBeTruthy();
  });
});
