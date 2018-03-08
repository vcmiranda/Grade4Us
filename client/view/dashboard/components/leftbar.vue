<template>
  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app :value="drawer">
    <v-list dense>
      <template v-for="item in items">
        <v-layout row v-if="item.heading" align-center :key="item.heading" >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    items: [
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Admin Section',
        model: true,
        children: [
          { icon: 'add', text: 'Manage Teachers Accounts' },
          { icon: 'add', text: 'Manage Students Accounts' },
          { icon: 'add', text: 'Manage Parents Accounts' },
        ],
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Teacher Section',
        model: false,
        children: [
          { icon: 'add', text: 'Manage Classes' },
          { icon: 'add', text: 'Manage Students' },
        ],
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Parent Section',
        model: false,
        children: [
          { icon: 'add', text: 'Manage Children' },
          { icon: 'add', text: 'Visualize Grades' },
        ],
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
    ],
  }),
  computed: {
    ...mapState('layout', [
      'drawer',
    ]),
  },
  props: {
    source: String,
  },
};
</script>
