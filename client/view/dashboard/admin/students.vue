<template>
  <v-container fluid>
    <v-toolbar dense flat>
      <v-btn color='primary' dark @click="createItem">Add Student
        <v-icon dark right>add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      <v-btn flat icon @click="clearFields">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" :search="search">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.student_id }}</td>
        <td class="text-xs-center">{{ props.item.firstname }}</td>
        <td class="text-xs-center">{{ props.item.lastname }}</td>
        <td class="text-xs-center">{{ showDate(props.item.date_birthday) }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ showDate(props.item.date_enrolled) }}</td>
        <td class="text-xs-center">{{ props.item.current_student ? 'Yes' : 'No'}}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="green">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
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
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menuEnrollment"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="editedItem.date_enrolled"
              >
                <v-text-field slot="activator" label="Date of Enrollment" :value="showDate(editedItem.date_enrolled)" prepend-icon="event" readonly></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="editedItem.date_enrolled"
                  @change="save"
                  min="2000-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 px-2>
              <v-toolbar dense color="blue" class="white--text">
                <v-toolbar-title>Parent / Guardian</v-toolbar-title>
              </v-toolbar>
            </v-flex>
            <v-flex xs6 px-2 pt-3>
              <v-text-field label="First Name" v-model="editedItem.resp_lastname" prepend-icon="fas fa-user"></v-text-field>
            </v-flex>
            <v-flex xs6 px-2 pt-3>
              <v-text-field label="Last Name" v-model="editedItem.resp_lastname" prepend-icon="far fa-user"></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-text-field label="Email" v-model="editedItem.resp_email" prepend-icon="email"></v-text-field>
            </v-flex>
            <v-flex xs12 px-2>
              <v-switch label="Current Student?" v-model="editedItem.current_student"></v-switch>
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
// import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    menuBirthday: false,
    menuEnrollment: false,
    search: '',
    pagination: { rowsPerPage: 10 },
    editedIndex: true,
    headers: [
      { text: 'Student ID', align: 'center', value: 'student_id' },
      { text: 'First Name', align: 'center', value: 'firstname' },
      { text: 'Last Name', align: 'center', value: 'lastname' },
      { text: 'Date of Birthday', align: 'center', value: 'date_birthday' },
      { text: 'Email', align: 'center', value: 'email' },
      { text: 'Date Enrolled', align: 'center', value: 'date_enrolled' },
      { text: 'Current Student?', align: 'center', value: 'current_student' },
      { text: 'Actions', align: 'center', value: 'name', sortable: false },
    ],
    items: [
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
        current_student: false,
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
        current_student: true,
      },
      {
        student_id: 3,
        firstname: 'Talles',
        lastname: 'Smith',
        date_birthday: '2007-11-01',
        email: 'ts@ts.com',
        date_enrolled: '2016-11-06',
        resp_firstname: 'Bob',
        resp_lastname: 'Smith',
        resp_email: 'bsmith@bs.ca',
        current_student: true,
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
  computed: {
    formTitle() {
      return this.editedIndex === false ? 'New Item' : 'Edit Item';
    },
  },
  methods: {
    clearFields() {
      this.search = '';
    },
    createItem() {
      this.dialog = true;
      this.editedIndex = false;
      this.editedItem = {};
    },
    editItem(student) {
      this.dialog = true;
      this.editedIndex = true;
      this.editedItem = {
        index: this.items.indexOf(student),
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
    deleteItem(student) {
      const index = this.items.indexOf(student);
      this.items.splice(index, 1);
    },
    closeItem() {
      this.dialog = false;
    },
    saveItem() {
      if (this.editedIndex) {
        this.items[this.editedItem.index].firstname = this.editedItem.firstname;
        this.items[this.editedItem.index].lastname = this.editedItem.lastname;
        this.items[this.editedItem.index].date_birthday = this.editedItem.date_birthday;
        this.items[this.editedItem.index].email = this.editedItem.email;
        this.items[this.editedItem.index].date_enrolled = this.editedItem.date_enrolled;
        this.items[this.editedItem.index].resp_firstname = this.editedItem.resp_firstname;
        this.items[this.editedItem.index].resp_lastname = this.editedItem.resp_lastname;
        this.items[this.editedItem.index].resp_email = this.editedItem.resp_email;
        this.items[this.editedItem.index].current_student = this.editedItem.current_student;
      } else {
        this.items.push(this.editedItem);
      }
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
