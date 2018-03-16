<template>
  <v-container fluid ma-0 pa-0>
    <topbar class="topbar"></topbar>
    <v-card>
      <transition name="fade">
        <v-card-media class="Bgd topbar" :src="getImage('bgd1.jpg')" height="100vh">
          <router-view></router-view>
        </v-card-media>
      </transition>
    </v-card>
  </v-container>
</template>

<script>
import topbar from './components/topbar.vue';

export default {
  components: {
    topbar,
  },
  data() {
    return {
      items: [
        { src: 'bgd1.jpg' },
        { src: 'bgd2.jpg' },
        { src: 'bgd3.jpg' },
        { src: 'bgd4.jpg' },
      ],
    };
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
    /* overflow: hidden; */
    top: 0;
    width: 100%;
  }

  /* .Bgd .card__media__content {
    min-height: 100vh;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }

  .Bgd .card__media__content {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  } */

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0.7;
  }
</style>

