<template>
  <v-app light>
    <v-content>
      <router-view class="topbar"></router-view>
    </v-content>
  </v-app>
</template>

<style scoped>
.topbar {
  position: fixed;
  overflow: hidden;
  top: 0;
  width: 100%;
}
</style>

