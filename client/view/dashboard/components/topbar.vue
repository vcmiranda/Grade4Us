<template>
  <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Grade4Us Dashboard</span>
    </v-toolbar-title>
    <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
      </v-avatar>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
  }),
  methods: {
    ...mapMutations('layout', [
      'toggleDrawer',
    ]),
  },
  props: {
    source: String,
  },
};
</script>