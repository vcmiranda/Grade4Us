<template>
  <v-container fluid ma-0 pa-0>
    <leftbar class="top"></leftbar>
    <topbar></topbar>
    <router-view class="top"></router-view>
  </v-container>
</template>

<script>
import leftbar from './components/leftbar.vue';
import topbar from './components/topbar.vue';

export default {
  components: {
    leftbar,
    topbar,
  },
};
</script>

<style scoped>
  .top {
    margin-top: 48px !important;
  }
</style>
