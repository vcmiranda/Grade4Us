<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card flat class="white">
          <v-form v-model="valid">
            <v-card-title class="text-xs-center">
              <span class="headline pl-3 pt-3">Login</span>
            </v-card-title>
            <v-layout wrap class="pr-4 pl-4 pb-4">
              <v-flex xs12 class="pl-2 pr-2">
                <v-text-field label="E-mail" type="email" v-model="credentials.email" :rules="credentials.emailRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 class="pl-2 pr-2">
                <v-text-field label="Password" type="password" v-model="credentials.password" required></v-text-field>
              </v-flex>
              <v-flex xs6 class="pl-2 pt-3">
                <router-link to="/register">Register</router-link>
                <router-link to="/recover">Recover</router-link>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn color="primary">Login</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    credentials: {
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
    },
    valid: false,
  }),
};
</script>
