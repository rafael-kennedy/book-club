import { shallowMount } from "@vue/test-utils";
import subject from "./app.vue";

describe("main app component", () => {
  test("matches snapshot", () => {
    const wrapper = shallowMount(subject);
  });
});
