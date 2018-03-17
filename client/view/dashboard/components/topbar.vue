<template>
  <v-toolbar app :color="barColor" class="elevation-10" dense fixed clipped-left>
    <v-toolbar-side-icon dark @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-3 pt-2">
      <img :src="getImage(logo)" width="150px;" @click="sendHome" class="pointer">
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
  mounted() {
    if (!Object.keys(this.user).length) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
    barColor() {
      if (this.user.admin_id) {
        return 'primary';
      } else if (this.user.teacher_id) {
        return 'accent';
      }
      return 'secondary';
    },
  },
  methods: {
    ...mapMutations('layout', [
      'toggleDrawer',
      'showLoginBtn',
      'hideLoginBtn',
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
      this.hideLoginForm();
      this.hideLoginBtn();
      this.$router.push('/');
    },
    logoutUser() {
      this.showLoginBtn();
      this.hideLoginForm();
      this.logout();
    },
  },
  props: {
    source: String,
  },
};
</script>
