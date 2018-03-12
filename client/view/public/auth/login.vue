<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 sm8 md4 lg3 class="text-xs-center">
        <span class="display-1 white--text">Login to Grade4Us</span>
        <v-card flat color="white" class="ma-3 pa-3">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field box label="E-mail" type="email" v-model="credentials.email" :rules="emailRules" required></v-text-field>
            <v-text-field box label="Password" type="password" v-model="credentials.password" required></v-text-field>
            <v-btn block color="primary" class="my-3" @click="loginUser">login</v-btn>
            <v-btn block color="primary" class="my-3">Recover Password</v-btn>
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
    credentials: {
      email: '',
      password: '',
    },
    valid: false,
  }),
  computed: {
    ...mapState('validation', [
      'emailRules',
    ]),
    ...mapState('auth', [
      'user',
    ]),
  },
  methods: {
    ...mapMutations('auth', [
      'showLoginBtn',
    ]),
    ...mapActions('auth', [
      'login',
    ]),
    loginUser() {
      this.showLoginBtn();
      this.login({
        email: this.credentials.email,
        password: this.credentials.password,
      });
    },
  },
};
</script>
