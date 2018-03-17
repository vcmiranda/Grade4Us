<template>
  <v-toolbar app class="elevation-10 transparent" dense fixed>
    <v-toolbar-title class="ml-3 pt-2">
      <img :src="getImage(logo)" width="150px;" @click="sendHome" class="pointer">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="loginBtn" color="transparent" dark class="elevation-0" @click="showLoginForm">Login</v-btn>
    <v-menu v-else offset-y :close-on-content-click="false" v-model="menu">
      <v-btn color="transparent" dark class="elevation-0" slot="activator">{{ `Hi, ${user.firstname} ${user.lastname}` }}</v-btn>
      <v-card>
        <v-list class="pb-0 pt-0">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mdi-school</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ `${user.firstname} ${user.lastname}` }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list class="pb-0 pt-0">
          <v-list-tile @click="sendToDashboard(user)">
            <v-list-tile-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>My Dashboard</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logoutUser">
            <v-list-tile-action>
              <v-icon>mdi-account</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>My Account</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="logoutUser">
            <v-list-tile-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data: () => ({
    menu: false,
    logo: 'logo.png',
  }),
  computed: {
    ...mapState('auth', [
      'user',
    ]),
    ...mapState('layout', [
      'loginBtn',
    ]),
  },
  methods: {
    ...mapMutations('layout', [
      'showLoginBtn',
      'showLoginForm',
      'hideLoginForm',
    ]),
    ...mapActions('auth', [
      'logout',
    ]),
    ...mapActions('navigation', [
      'sendToDashboard',
    ]),
    getImage(img) {
      /* eslint-disable */
      return require(`../../../assets/img/logo/${img}`);
      /* eslint-enable */
    },
    sendHome() {
      this.$router.push('/');
      this.hideLoginForm();
    },
    logoutUser() {
      this.showLoginBtn();
      this.hideLoginForm();
      this.logout();
    },
  },
};
</script>
