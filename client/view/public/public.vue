<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <topbar></topbar>
        <v-layout>
          <img
            v-for="(image,i) in bgImages"
            :src="getImage(image.src)"
            :alt="image.src"
            :class="image.class"
            :key="i">
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
    ],
  }),
  created() {
    this.changeImage();
  },
  methods: {
    getImage(img) {
      /* eslint-disable */
      return require(`../../assets/img/background/${img}`);
      /* eslint-enable */
    },
    changeImage() {
      let index = 0;
      setInterval(() => {
        this.bgImage = this.bgImages[index];
        index = (index + 1) % this.bgImages.length;
      }, 5000);
    },
  },
};
</script>

<style scoped>
  .fixBgd {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .img {
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 5s;
    animation-direction: alternate;
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

  @keyframes fade1 {
    0% { opacity: 1; }
    25% { opacity: 1; }
    50% {opacity: 1 }
    75% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes fade2 {
    0% { opacity: 0; }
    25% { opacity: 0; }
    50% {opacity: 1 }
    75% { opacity: 1; }
    100% { opacity: 1; }
  }

  @keyframes fade3 {
    0% { opacity: 1; }
    25% { opacity: 1; }
    50% {opacity: 1 }
    75% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes fade4 {
    0% { opacity: 0; }
    25% { opacity: 0; }
    50% {opacity: 1 }
    75% { opacity: 1; }
    100% { opacity: 1; }
  }
</style>

