<template>
  <div>
    <ui-icon-button
      icon="account_box"
      dropdown-position="bottom right"
      @click="openModal"
      type="secondary"
    >
    </ui-icon-button>
    <ui-modal ref="modal" title="Login">
      <div v-if="!value" class="default-margin dropdown-reposition">
        <ui-textbox
          floating-label
          label="Email"
          placeholder="Enter your email address"
          v-model="email"
        ></ui-textbox>
        <ui-textbox
          floating-label
          label="Password"
          type="password"
          placeholder="Enter your password"
          v-model="password"
        ></ui-textbox>
        <ui-button @click="login" :disabled="!formValid" color="primary">Login</ui-button>
        Don't have an account yet?
        <ui-button @click="register" :disabled="!formValid">Register</ui-button>
      </div>
      <div v-else>
        <ui-button @click="logout">Logout</ui-button>
      </div>
    </ui-modal>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: "login",
    props: {
      value: {type: Object}
    },
    inject: ['alert'],
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      formValid() {
        return this.email && this.password && this.password.length > 8;
      }
    },
    methods: {
      openModal() {
        this.$refs.modal.open();
      },
      closeModal() {
        this.$refs.modal.close();
      },
      async login() {
        try {
          const user = await api.login(this.email, this.password);
          this.$emit('input', user);
          this.closeModal();
        } catch (err) {
          this.alert('Error Logging in: ' + err.message);
        }

      },
      logout() {
        debugger;
      },
      async register() {
        try {
          await api.register(this.email, this.password);
          this.alert('You have been successfully registered!')
        } catch (err) {
          this.alert('Error Registering: ' + err.message);
          return;
        }
        this.login();
      }
    }
  };
</script>

<style scoped>

</style>
