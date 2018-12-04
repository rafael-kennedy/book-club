<template>
  <div>
    <ui-snackbar-container ref="snackbox" :queue-snackbars="true" position="right">

    </ui-snackbar-container>
    <ui-toolbar
      remove-brand-divider
      text-color="white"
      type="colored"
      background-color="primary"
      :raised="false"
    >
      Book Club App
      <template slot="actions">
        <login v-model="user"></login>
      </template>
    </ui-toolbar>
    <ui-tabs
      type="text"
      v-if="user"
    >
      <ui-tab title="Nominate Books">

      </ui-tab>
      <ui-tab title="Vote">

      </ui-tab>
      <ui-tab title="Upcoming Meetings">

      </ui-tab>
    </ui-tabs>
    <div v-else>
      <h1>Welcome to a generic book club app!</h1>
      <p>Please log in by clicking the icon above to get started!</p>

    </div>
  </div>

</template>


<script>
  import Login from '../components/login.vue';
  export default {
    name: "app",
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
