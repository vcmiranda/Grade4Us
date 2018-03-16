<template>
  <v-container fluid ma-0 pa-0 class="background">
    <v-layout row wrap>
      <v-flex xs12>
        <topbar class="topbar"></topbar>
        <v-card>
          <v-card-media class="Bgd topbar" :src="getImage(bgImage)" height="100vh">
            <v-content>
              <router-view></router-view>
            </v-content>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import topbar from './components/topbar.vue';

export default {
  data: () => {
    return {
      bgImage: 'bgd1.jpg',
      bgImages: [
        'bgd2.jpg',
        'bgd3.jpg',
        'bgd4.jpg',
        'bgd1.jpg',
    ]
    }
  },
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
    changeImage() {
      let index = 0;

      setInterval(() => {
        this.bgImage = this.bgImages[index];
        index = (index + 1) % this.bgImages.length;
      }, 5000);
    }
  },
  created: function() {
    this.changeImage();
  }
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

<style>
  .Bgd .card__media__background {
    transition: background 1.5s linear;
  }
</style>

