import { mountWithInjections } from "../../test/utils/mount-with-injections";

import subject from "./login.vue";

describe("login component", () => {
  test("displays button when not logged in", () => {
    const wrapper = mountWithInjections(subject);
    expect(wrapper).toMatchSnapshot();
  });
});
