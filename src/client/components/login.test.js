import { mountWithInjections } from "../../test/utils/mount-with-injections";

import subject from "./login.vue";

describe("login component", () => {
  test("displays button when not logged in", () => {
    const wrapper = mountWithInjections(subject, {
      propsData: { value: null }
    });
    expect(wrapper).toMatchSnapshot();
  });

  test("displays logout button when logged in", () => {
    const wrapper = mountWithInjections(subject, {
      propsData: { value: { email: "fake" } }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
