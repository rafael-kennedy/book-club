import { shallowMount } from "@vue/test-utils";

const genericUser = () => ({
  email: "test@test.com",
  _id: "1"
});

export const mountWithInjections = (
  component,
  opts = {},
  user = genericUser()
) =>
  shallowMount(component, {
    ...opts,
    provide() {
      return {
        alert: jest.fn,
        user
      };
    }
  });
