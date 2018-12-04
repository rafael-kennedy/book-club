import { shallowMount } from "@vue/test-utils";
import subject from "./app.vue";

describe("main app component", () => {
  test("displays welcome message when not logged in", () => {
    const wrapper = shallowMount(subject);
    expect(wrapper).toMatchSnapshot();
  });

  test("displays tabs component when logged in", () => {
    const wrapper = shallowMount(subject);
    debugger;
    wrapper.vm.user = { email: "fake" };
    expect(wrapper).toMatchSnapshot();
  });
});
