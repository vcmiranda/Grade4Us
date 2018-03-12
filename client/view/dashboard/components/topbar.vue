<template>
  <v-toolbar app color="primary" class="elevation-10" clipped-left dense fixed>
    <v-toolbar-side-icon dark @click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-3 pt-2">
      <router-link to="/">
        <img src="../../../assets/img/logo/logo.png" width="150px;">
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y :close-on-content-click="false" v-model="menu">
      <v-btn color="transparent" dark class="elevation-0" slot="activator">Hi, {{ `${user.firstname} ${user.lastname}` }}</v-btn>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>mdi-school</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ `${user.firstname} ${user.lastname}` }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list class="pb-0 pt-0">
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
  }),
  computed: {
    ...mapState('auth', [
      'user',
    ]),
  },
  methods: {
    ...mapMutations('layout', [
      'toggleDrawer',
      'showLoginBtn',
      'toggleLoginForm',
    ]),
    ...mapActions('auth', [
      'logout',
    ]),
    logoutUser() {
      this.showLoginBtn();
      this.toggleLoginForm();
      this.logout();
    },
  },
  props: {
    source: String,
  },
};
</script>
