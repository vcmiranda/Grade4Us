<template>
  <v-container fluid ma-0 pa-0>
    <leftbar></leftbar>
    <topbar></topbar>
    <router-view></router-view>
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
.topbar {
  position: fixed;
  overflow: hidden;
  top: 0;
  width: 100%;
}
</style>

