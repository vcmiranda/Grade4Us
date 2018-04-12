<template>
  <v-toolbar app :color="barColor" class="elevation-10" dense fixed clipped-left>
    <v-toolbar-side-icon v-if="!user.parent_id" dark @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <img :src="getImage(logo)" @click="sendHome" :class="logoSize">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y :close-on-content-click="false" v-model="menu">
      <v-btn v-if="$vuetify.breakpoint.smAndUp" color="transparent" dark class="elevation-0" slot="activator">Hi, {{ `${user.firstname} ${user.lastname}` }}</v-btn>
      <v-btn v-else color="transparent" dark class="elevation-0" slot="activator"><v-icon>mdi-logout</v-icon></v-btn>
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
          <v-list-tile @click="openDashboard">
            <v-list-tile-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>My Dashboard</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="openProfile">
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
    logoSize() {
      return {
        'logo150 pointer': this.$vuetify.breakpoint.mdAndUp,
        'logo100 pointer': this.$vuetify.breakpoint.smAndDown,
      };
    },
  },
  methods: {
    ...mapMutations('layout', [
      'toggleDrawer',
      'showLoginBtn',
      'hideLoginBtn',
      'toggleProfile',
    ]),
    ...mapActions('auth', [
      'logout',
    ]),
    ...mapActions('navigation', [
      'sendToDashboard',
      'sendToHome',
    ]),
    getImage(img) {
      /* eslint-disable */
      return require(`../../../assets/img/logo/${img}`);
      /* eslint-enable */
    },
    sendHome() {
      this.hideLoginBtn();
      this.sendToHome();
    },
    openDashboard() {
      this.sendToDashboard(this.user);
      this.menu = false;
    },
    openProfile() {
      this.toggleProfile();
      this.menu = false;
    },
    logoutUser() {
      this.showLoginBtn();
      this.logout();
      this.menu = false;
    },
  },
  props: {
    source: String,
  },
};
</script>

<style scoped>
  .logo150 {
    width: 150px;
  }
  .logo100 {
    width: 100px;
  }
</style>
