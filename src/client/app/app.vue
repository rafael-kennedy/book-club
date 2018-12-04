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
    <UiTabs
      v-if="user"
      type="text"
    >
      <UiTab title="Nominate Books" />
      <UiTab title="Vote" />
      <UiTab title="Upcoming Meetings" />
    </UiTabs>
    <div v-else>
      <h1>Welcome to a generic book club app!</h1>
      <p>Please log in by clicking the icon above to get started!</p>
    </div>
  </div>
</template>


<script>
  import Login from '../components/login.vue';
  export default {
    name: "App",
    components: {
      Login
    },
    data() {
      return {
        user: null
      }
    },
    provide() {
      return {alert: this.alert}
    },
    methods: {
      alert(message) {
        this.$refs.snackbox.createSnackbar({message})
      }
    }
  };
</script>

<!--GLOBAL STYLES-->
<style>
  .default-margin {
    margin: 1em;
  }
  html {
    min-height: 100vh;
    min-width: 100vw;
  }
  body {
    margin: 0;
  }

</style>
