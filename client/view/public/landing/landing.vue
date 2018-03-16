<template>
  <v-container fluid ma-0 pa-0 fill-height align-center>
    <v-layout row wrap>
      <v-flex v-if="!loginForm" xs12 text-xs-center class="textContainer display-4 white--text">
        {{ text.title }}
      </v-flex>
      <v-flex v-else>
        <login></login>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapState } from 'vuex';
import Login from '../auth/login.vue';

export default {
  components: {
    Login,
  },
  data: () => ({
    text: {
      title: 'Grade4Us',
    },
  }),
  computed: {
    ...mapState('layout', [
      'loginForm',
    ]),
  },
};
</script>

<style scoped>
  .textContainer {
    margin: 0 auto;
    width: 100%;
    position: absolute;
    z-index: 10;
    top: 40%;
    transform:translateY(-50%);
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color: white;
    text-transform: uppercase;
    text-shadow:4px 4px 0 rgba(0,0,0,0.4);
  }
</style>
