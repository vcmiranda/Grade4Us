<template>
  <v-navigation-drawer app :class="barColor" dark stateless hide-overlay :value="drawer">
    <v-list dense>
      <template v-for="item in menuItems">
        <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.path" :active-class="textColor">
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ child.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :key="item.text">
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
    if (this.$vuetify.breakpoint.xsOnly || this.user.parent_id) {
      this.closeDrawer();
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
    textColor() {
      if (this.user.admin_id) {
        return 'red--text';
      } else if (this.user.teacher_id) {
        return 'blue-grey--text';
      }
      return 'orange--text';
    },
    menuItems() {
      const menuItems = [];
      if (this.user && this.user.admin_id) {
        menuItems.push({
          children: [
            { icon: 'add', text: 'Manage Teachers Accounts', path: '/dashboard/admin/teachers' },
            { icon: 'add', text: 'Manage Courses Accounts', path: '/dashboard/admin/courses' },
            { icon: 'add', text: 'Manage Students Accounts', path: '/dashboard/admin/students' },
          ],
        });
      }
      if (this.user && this.user.teacher_id) {
        menuItems.push({
          children: [
            { icon: 'add', text: 'Manage Courses', path: '/dashboard/teacher/courses' },
            { icon: 'add', text: 'Manage Report Cards', path: '/dashboard/teacher/reports' },
          ],
        });
      }
      if (this.user && this.user.parent_id) {
        menuItems.push({
          children: [
            { icon: 'add', text: 'Manage Children', path: '/dashboard/parent/students' },
            { icon: 'add', text: 'Visualize Report Cards', path: '/dashboard/parent/reports' },
          ],
        });
      }
      return menuItems;
    },
  },
  methods: {
    ...mapMutations('layout', [
      'toggleDrawer',
      'closeDrawer',
    ]),
  },
};
</script>
