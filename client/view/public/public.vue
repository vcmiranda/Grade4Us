<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <topbar></topbar>
        <v-layout>
          <div
            v-for="(image, i) in bgImages"
            :style="{ backgroundImage: 'url(' + getImage(image.src) + ')' }"
            :alt="image.src"
            :class="image.class"
            :key="i"></div>
          <router-view></router-view>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import topbar from './components/topbar.vue';

export default {
  components: {
    topbar,
  },
  data: () => ({
    bgImages: [
      { src: 'bgd1.jpg', class: 'fixBgd img img1' },
      { src: 'bgd2.jpg', class: 'fixBgd img img2' },
      { src: 'bgd3.jpg', class: 'fixBgd img img3' },
      { src: 'bgd4.jpg', class: 'fixBgd img img4' },
      { src: 'bgd1.jpg', class: 'fixBgd img img5' },
    ],
  }),
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
  .fixBgd {
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  .img {
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 24s;
    background-size: cover;
    background-position: center center;
  }

  .img1 {
    animation-name: fade1;
  }

  .img2 {
    animation-name: fade2;
  }

  .img3 {
    animation-name: fade3;
  }

  .img4 {
    animation-name: fade4;
  }

  .img5 {
    animation-name: fade5;
  }

  @keyframes fade1 {
    0% { opacity: 1; }
    20.83333333333333% { opacity: 1; }
    25% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes fade2 {
    0% { opacity: 0; }
    20.83333333333333% { opacity: 0; }
    25% { opacity: 1; }
    45.83333333333333% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes fade3 {
    0% { opacity: 0; }
    45.83333333333333% { opacity: 0; }
    50% { opacity: 1; }
    70.83333333333333% { opacity: 1; }
    75% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes fade4 {
    0% { opacity: 0; }
    70.83333333333333% {opacity: 0; }
    75% { opacity: 1; }
    95.83333333333333% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes fade5 {
    0% { opacity: 0; }
    95.83333333333333% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>

