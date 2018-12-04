<template>
  <div>
    <UiIconButton
      icon="account_box"
      dropdown-position="bottom right"
      type="secondary"
      @click="openModal"
    />
    <UiModal
      ref="modal"
      title="Login"
    >
      <div
        v-if="!value"
        class="default-margin dropdown-reposition"
      >
        <UiTextbox
          v-model="email"
          floating-label
          label="Email"
          placeholder="Enter your email address"
        />
        <UiTextbox
          v-model="password"
          floating-label
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <UiButton
          :disabled="!formValid"
          color="primary"
          @click="login"
        >
          Login
        </UiButton>
        Don't have an account yet?
        <UiButton
          :disabled="!formValid"
          @click="register"
        >
          Register
        </UiButton>
      </div>
      <div v-else>
        <UiButton @click="logout">
          Logout
        </UiButton>
      </div>
    </UiModal>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: "Login",
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
