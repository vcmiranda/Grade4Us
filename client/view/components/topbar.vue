<template>
  <v-toolbar app class="elevation-0 transparent" dense fixed>
    <v-toolbar-title class="ml-3 pt-2">
      <router-link to="/">
        <img src="./../../assets/img/logo/logo.png" width="150px;">
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-x :close-on-content-click="false" :nudge-width="200" :nudge-bottom="45" v-model="menu" lazy>
      <v-avatar slot="activator" class="white mr-2" size="36px">
        <span class="teal--text title">C</span>
      </v-avatar>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar slot="activator" class="white mr-2" size="44px">
                <span class="teal--text headline">C</span>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
              <v-list-tile-sub-title>email@email.com</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list class="pb-0 pt-0">
          <v-list-tile to="#">
            <v-list-tile-action>
              <v-icon>mdi-account</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>My Account</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="#">
            <v-list-tile-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Coach Dashboard</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="#">
            <v-list-tile-action>
              <v-icon>mdi-trophy</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Organizer Dashboard</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile to="#">
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
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
};
</script>
