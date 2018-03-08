<template>
  <v-app light>
    <leftbar></leftbar>
    <topbar></topbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
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

