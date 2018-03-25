<template>
  <v-navigation-drawer app :class="barColor" dark stateless hide-overlay :value="drawer">
    <v-list dense>
      <template v-for="item in menuItems">
        <v-layout row v-if="item.heading" align-center :key="item.heading" >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
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
          <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.path">
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
import { mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
  }),
  created() {
    if (this.$vuetify.breakpoint.xsOnly) {
      this.toggleDrawer();
    }
  },
  computed: {
    ...mapState('layout', [
      'drawer',
    ]),
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
    menuItems() {
      const menuItems = [{ heading: 'ROLES' }];
      if (this.user && this.user.admin_id) {
        menuItems.push({
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Admin Section',
          model: false,
          children: [
            { icon: 'add', text: 'Manage Teachers Accounts' },
            { icon: 'add', text: 'Manage Students Accounts' },
            { icon: 'add', text: 'Manage Parents Accounts' },
          ],
        });
      }
      if (this.user && this.user.teacher_id) {
        menuItems.push({
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Teacher Section',
          model: false,
          children: [
            { icon: 'add', text: 'Manage Classes' },
            { icon: 'add', text: 'Manage Students' },
          ],
        });
      }
      if (this.user && this.user.parent_id) {
        menuItems.push({
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Parent Section',
          model: false,
          children: [
            { icon: 'add', text: 'Manage Children', path: '/dashboard/parent/students' },
            { icon: 'add', text: 'Visualize Grades' },
          ],
        });
      }
      menuItems.push(
        { divider: true },
        { heading: 'GENERAL' },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
      );
      return menuItems;
    },
  },
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
