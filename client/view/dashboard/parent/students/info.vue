<template>
  <v-container mb-3>
    <template v-for="(child,i) in children">
      <v-card :key="i" class="pa-4">
        <v-layout row wrap>
          <v-flex xs2>
            <picture-input
              ref="pictureInput"
              @change="saveImage(child.image)"
              width="100"
              height="100"
              margin="16"
              accept="image/*"
              :prefill="getImage(child.image)"
              size="5"
              radius="50"
              :hideChangeButton="true"
              :zIndex="100"
              >
            </picture-input>
          </v-flex>
          <v-flex xs10>
            <v-expansion-panel class="elevation-0">
              <v-expansion-panel-content>
                <div slot="header" class="display-1">{{ `${child.firstname} ${child.lastname}` }}</div>
                <v-form v-model="valid" class="pa-4">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field label="Name" v-model="child.firstname" prepend-icon="people" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Name" v-model="child.lastname" prepend-icon="people_outline" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="E-mail" v-model="child.email" prepend-icon="email" required ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-menu
                        ref="menu"
                        lazy
                        :close-on-content-click="false"
                        v-model="child.menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        min-width="290px"
                        :return-value.sync="child.dateBirthday"
                      >
                        <v-text-field slot="activator" label="Date of Birthday" :value="showDate(child.dateBirthday)" prepend-icon="event" readonly required></v-text-field>
                        <v-date-picker v-model="child.dateBirthday" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="child.menu = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.menu[i].save(child.dateBirthday)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Grade" v-model="child.grade" prepend-icon="school" readonly></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Date of Enrollment" :value="showDate(child.dateEnrolled)" prepend-icon="schedule" readonly></v-text-field>
                    </v-flex>
                    <v-flex xs12 text-xs-right>
                      <v-btn color="red" class="white--text">Cancel</v-btn>
                      <v-btn color="green" class="white--text">Save</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import utils from '../../../../utils/moment.utils';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    children: [
      {
        studentID: 1,
        firstname: 'Nathalia',
        lastname: 'Miranda',
        email: 'nscmiranda@outlook.com',
        dateBirthday: '',
        grade: 5,
        dateEnrolled: '2016-09-06',
        menu: false,
        image: 'default.jpg',
      },
      {
        studentID: 2,
        firstname: 'Guilherme',
        lastname: 'Miranda',
        email: 'gccmiranda@outlook.com',
        dateBirthday: '',
        grade: 12,
        dateEnrolled: '2016-09-06',
        menu: false,
        image: '1.png',
      },
    ],
  }),
  created() {
    this.fetchImg();
  },
  methods: {
    ...mapActions('images', [
      'getImageURLStudent',
    ]),
    getImage(img) {
      /* eslint-disable */
      return require(`../../../../images/students/${img}`);
      /* eslint-enable */
    },
    showDate(date) {
      return utils.convertInverseToFormattedDate(date);
    },
    saveImage(image) {
      if (image) {
        this.image = image;
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
    fetchImg() {
      this.children.forEach((child) => {
        this.getImageURLStudent({ studentID: child.studentID })
          .then((ret) => {
            console.log(ret);
            child.image = ret.path;
          });
      });
    },
  },
};
</script>

<style scoped>
  .alignItself {
    align-self: center;
  }
</style>
