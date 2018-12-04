<template>
  <div>
    <UiSnackbarContainer
      ref="snackbox"
      :queue-snackbars="true"
      position="right"
    />
    <UiToolbar
      remove-brand-divider
      text-color="white"
      type="colored"
      background-color="primary"
      :raised="false"
    >
      Book Club App
      <template slot="actions">
        <Login v-model="user" />
      </template>
    </UiToolbar>
    <UiTabs v-if="user" type="text">
      <UiTab title="Nominate Books"> <NominateBooks /> </UiTab>
      <UiTab title="Vote"> Sorry! I'm not a real app yet! </UiTab>
      <UiTab title="Upcoming Meetings"> Sorry! I'm not a real app yet! </UiTab>
    </UiTabs>
    <div v-else>
      <h1>Welcome to a generic book club app!</h1>
      <p>Please log in by clicking the icon above to get started!</p>
    </div>
  </div>
</template>

<script>
import Login from "../components/login.vue";
import NominateBooks from "../components/nominate-books.vue";
export default {
  name: "App",
  components: {
    NominateBooks,
    Login
  },
  data() {
    return {
      user: null
    };
  },
  provide() {
    return { alert: this.alert };
  },
  methods: {
    alert(message) {
      this.$refs.snackbox.createSnackbar({ message });
    }
  }
};
</script>

<!-- GLOBAL STYLES -->
<style>
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.default-margin {
  margin: 1em;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  min-height: 100vh;
  min-width: 100vw;
  font-size: 100%;
}
html,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
body {
  margin: 0;
}
</style>
