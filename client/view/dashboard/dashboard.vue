<template>
  <v-container fluid ma-0 pa-0>
    <leftbar class="top"></leftbar>
    <topbar></topbar>
    <router-view class="top"></router-view>

    <v-dialog :value="profile" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Profile</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 px-2>
              <v-toolbar dense color="blue" class="white--text">
                <v-toolbar-title>Personal</v-toolbar-title>
              </v-toolbar>
            </v-flex>
            <v-flex xs12 px-2 pt-3>
              <v-text-field label="First Name" v-model="editedUser.firstname" prepend-icon="fas fa-user"></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-text-field label="Last Name" v-model="editedUser.lastname" prepend-icon="far fa-user"></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-text-field label="Email" v-model="editedUser.email" prepend-icon="email"></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-text-field label="Phone" mask="(###) ###-####" v-model="editedUser.phone" prepend-icon="fa-phone"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="toggleProfile">Cancel</v-btn>
          <v-btn color="green" class="white--text" @click="saveItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import leftbar from './components/leftbar.vue';
import topbar from './components/topbar.vue';

export default {
  components: {
    leftbar,
    topbar,
  },
  data: () => ({
    editedUser: {},
  }),
  created() {
    this.editedUser = this.user;
  },
  computed: {
    ...mapState('layout', [
      'profile',
    ]),
    ...mapState('auth', [
      'user',
    ]),
  },
  methods: {
    ...mapMutations('layout', [
      'toggleProfile',
    ]),
    ...mapActions('auth', [
      'updateUser',
    ]),
    saveItem() {
      this.updateUser(this.editedUser);
      this.toggleProfile();
    },
  },
};
</script>

<style scoped>
  .top {
    margin-top: 48px !important;
  }
</style>
