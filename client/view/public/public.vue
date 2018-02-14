<template>
  <v-app light>
    <v-container fluid ma-0 pa-0 class="background">
      <v-layout row wrap>
        <v-flex xs12>
          <topbar class="topbar"></topbar>
          <v-card>
            <v-card-media class="Bgd topbar" :src="getImage('bgd1.jpg')" height="100vh">
              <v-content>
                <router-view></router-view>
              </v-content>
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import topbar from '../components/topbar.vue';

export default {
  components: {
    topbar,
  },
  methods: {
    getImage(img) {
      /* eslint-disable */
      return require(`../../assets/img/background/${img}`);
      /* eslint-enable */
    },
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

  .Bgd .card__media__content {
    min-height: 100vh;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }

  .Bgd .card__media__content {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  }
</style>

