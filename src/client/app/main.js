import Vue from "vue";
import keenUI from "keen-ui";
import App from "./app.vue";
import "keen-ui/dist/keen-ui.css";

// destructuring the install function out;
const { install, ...keenUIComponents } = keenUI;

// This is a construct for having one easy place to register overrides or
// wrappers around ui component libraries, allowing for us to apply global
// changes to everywhere we use ui components.

const globalComponents = {
  ...keenUIComponents
  // UiSomeOverRide: SomeComponent
};
Object.entries(keenUIComponents).forEach(([key, component]) =>
  Vue.component(key, component)
);

new Vue({
  el: "#app",
  render: h => h(App)
});
