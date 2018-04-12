<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6 pa-2 v-for="student in students" :key="student.student_id">
        <v-card>
          <v-card-title class="secondary justify-center display-1">
            <h4 class="white--text">{{ `${student.firstname} ${student.lastname}` }}</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-container fluid class="scrollBar">
            <v-layout row wrap align-center>
              <v-flex xs7 pa-2>
                Date of Birthday
              </v-flex>
              <v-flex xs5 pa-2 class="text-xs-right">
                {{ showDate(student.date_birthday) }}
              </v-flex>
              <v-flex xs7 pa-2>
                Email
              </v-flex>
              <v-flex xs5 pa-2 class="text-xs-right">
                {{ student.email }}
              </v-flex>
              <v-flex xs7 pa-2>
                Date of Enrollment
              </v-flex>
              <v-flex xs5 pa-2 class="text-xs-right">
                {{ showDate(student.date_enrolled) }}
              </v-flex>
              <v-flex xs7 pa-2>
                Parent / Guardian
              </v-flex>
              <v-flex xs5 pa-2 class="text-xs-right">
                {{ `${student.resp_firstname} ${student.resp_lastname}` }}
              </v-flex>
              <v-flex xs7 pa-2>
                Parent / Guardian Email
              </v-flex>
              <v-flex xs5 pa-2 class="text-xs-right">
                {{ student.resp_email}}
              </v-flex>
              <v-flex xs12 px-3 pt-3 class="text-xs-center">
                <v-tooltip left>
                  <v-btn block color="green" class="ma-0 pa-0 white--text" @click="editItem(student)" slot="activator">
                    <v-icon left dark>edit</v-icon>Edit
                  </v-btn>
                  <span>To enable this feature you have to add some skills to this course.</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Student</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 px-2>
              <v-toolbar dense color="blue" class="white--text">
                <v-toolbar-title>Personal</v-toolbar-title>
              </v-toolbar>
            </v-flex>
            <v-flex xs6 px-2 pt-3>
              <v-text-field label="First Name" v-model="editedItem.firstname" prepend-icon="fas fa-user"></v-text-field>
            </v-flex>
            <v-flex xs6 px-2 pt-3>
              <v-text-field label="Last Name" v-model="editedItem.lastname" prepend-icon="far fa-user"></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-text-field label="Email" v-model="editedItem.email" prepend-icon="email"></v-text-field>
            </v-flex>
            <v-flex xs6 px-2>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menuBirthday"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="editedItem.date_birthday"
              >
                <v-text-field slot="activator" label="Date of Birthday" :value="showDate(editedItem.date_birthday)" prepend-icon="event" readonly></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="editedItem.date_birthday"
                  @change="save"
                  min="2000-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6 px-2>
              <v-text-field label="Date of Enrollment" :value="showDate(editedItem.date_enrolled)" prepend-icon="event" readonly></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-toolbar dense color="blue" class="white--text">
                <v-toolbar-title>Parent / Guardian</v-toolbar-title>
              </v-toolbar>
            </v-flex>
            <v-flex xs6 px-2 pt-3>
              <v-text-field label="First Name" v-model="editedItem.resp_lastname" prepend-icon="fas fa-user" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 px-2 pt-3>
              <v-text-field label="Last Name" v-model="editedItem.resp_lastname" prepend-icon="far fa-user" readonly></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-text-field label="Email" v-model="editedItem.resp_email" prepend-icon="email" readonly></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="closeItem">Cancel</v-btn>
          <v-btn color="green" class="white--text" @click="saveItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import utils from '../../../utils/moment.utils';
// import { mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    dialog: false,
    menuBirthday: false,
    menuEnrollment: false,
    students: [
      {
        student_id: 1,
        firstname: 'John',
        lastname: 'Malkovich',
        date_birthday: '2007-09-06',
        email: 'jm@jm.ca',
        date_enrolled: '2016-09-06',
        resp_firstname: 'Erin',
        resp_lastname: 'Malkovich',
        resp_email: 'emalkovich@em.ca',
      },
      {
        student_id: 2,
        firstname: 'Morgan',
        lastname: 'Burnett',
        date_birthday: '2008-02-17',
        email: 'mb@mb.ca',
        date_enrolled: '2016-10-06',
        resp_firstname: 'Tiki',
        resp_lastname: 'Burnett',
        resp_email: 'tBurnett@tb.ca',
      },
    ],
    editedItem: {
      student_id: null,
      firstname: '',
      lastname: '',
      date_birthday: '',
      email: '',
      date_enrolled: '',
      resp_firstname: '',
      resp_lastname: '',
      resp_email: '',
      current_student: '',
    },
  }),
  methods: {
    editItem(student) {
      this.dialog = true;
      this.editedItem = {
        index: this.students.indexOf(student),
        firstname: student.firstname,
        lastname: student.lastname,
        date_birthday: student.date_birthday,
        email: student.email,
        date_enrolled: student.date_enrolled,
        resp_firstname: student.resp_firstname,
        resp_lastname: student.resp_lastname,
        resp_email: student.resp_email,
        current_student: student.current_student,
      };
    },
    closeItem() {
      this.dialog = false;
    },
    saveItem() {
      this.students[this.editedItem.index].firstname = this.editedItem.firstname;
      this.students[this.editedItem.index].lastname = this.editedItem.lastname;
      this.students[this.editedItem.index].date_birthday = this.editedItem.date_birthday;
      this.students[this.editedItem.index].email = this.editedItem.email;
      this.dialog = false;
    },
    showDate(date) {
      return utils.convertInverseToFormattedDate(date);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
};
</script>
