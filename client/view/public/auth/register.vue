<template>
  <v-container fluid fill-height class="white pa-0" :class="{ 'grey lighten-4 ' : this.$vuetify.breakpoint.width > 600 }">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card :flat="this.$vuetify.breakpoint.width < 600">
          <v-card-title>
            <span class="headline pl-3 pt-3">Register</span>
          </v-card-title>
          <v-layout wrap class="pr-4 pl-4 pb-4">
            <v-flex xs12 class="pl-2 pr-2">
              <v-text-field label="Email" type="email" name="email"></v-text-field>
            </v-flex>
            <v-flex xs12 class="pl-2 pr-2">
              <v-text-field label="Confirm Email" type="email" name="email"></v-text-field>
            </v-flex>
            <v-flex xs12 class="pl-2 pr-2">
              <v-text-field label="Password" type="password" name="password"></v-text-field>
            </v-flex>
            <v-flex xs12 class="pl-2 pr-2">
              <v-text-field label="Confirm Password" type="password" name="password"></v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-right">
              <v-btn class="primary">Register</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

