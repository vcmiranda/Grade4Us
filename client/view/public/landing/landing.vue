<template>
  <v-container fluid ma-0 pa-0 fill-height align-center>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center :class="classTxt">
        {{ text.title }}
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    text: {
      title: 'Grade4Us',
    },
  }),
  computed: {
    classTxt() {
      return {
        'textContainer display-4 white--text': this.$vuetify.breakpoint.mdAndUp,
        'textContainer display-3 white--text': this.$vuetify.breakpoint.smOnly,
        'textContainer display-2 white--text': this.$vuetify.breakpoint.xsOnly,
      };
    },
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
