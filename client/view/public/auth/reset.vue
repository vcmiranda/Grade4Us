<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row wrap justify-center align-center>
      <v-flex xs10 sm6 md4 lg3 class="text-xs-center">
        <v-alert :type="message ? message.type : 'success'" dismissible class="ma-0" :value="alert" @click="clear">
          {{ message ? message.text : '' }}
        </v-alert>
        <v-card flat color="white" class="ma-0 pa-3">
          <span :class="classTxt">Forgot Password</span>
          <v-form v-model="valid" ref="form" lazy-validation class="mt-3">
            <v-text-field box label="E-mail" type="email" v-model="credentials.email" :rules="emailRules" required></v-text-field>
            <v-btn block color="primary" class="my-3" @click="rstPassword" :loading="loading" :disabled="loading">
              Send
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data: () => ({
    credentials: {},
    valid: false,
  }),
  computed: {
    ...mapState('validation', [
      'emailRules',
    ]),
    ...mapState('auth', [
      'loading',
      'message',
    ]),
    alert() {
      if (this.message) {
        return true;
      }
      return false;
    },
    classTxt() {
      return {
        'display-1 primary--text': this.$vuetify.breakpoint.lgAndUp,
        'headline primary--text': this.$vuetify.breakpoint.mdAndDown,
      };
    },
  },
  methods: {
    ...mapMutations('layout', [
      'showLoginBtn',
      'hideUserFormLogin',
    ]),
    ...mapMutations('auth', [
      'clearMessage',
    ]),
    ...mapActions('auth', [
      'resetPassword',
    ]),
    rstPassword() {
      this.showLoginBtn();
      this.resetPassword({
        email: this.credentials.email,
      });
    },
    clear() {
      if (this.message.type === 'success') {
        this.clearMessage();
        this.hideUserFormLogin();
        this.$refs.form.reset();
      } else {
        this.clearMessage();
        this.$refs.form.reset();
      }
    },
  },
};
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
