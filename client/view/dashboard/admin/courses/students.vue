<template>
 <v-container fluid>
   <v-toolbar dense flat>
      <v-btn color='primary' dark @click="addItem">Add Student
        <v-icon dark right>add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      <v-btn flat icon @click="clearFields">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>

    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="filteredStudents"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
    >
      <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3 pa-1>
        <v-card>
          <v-card-title>
            <v-toolbar dense class="elevation-0">
              <h4>{{ props.item.student_fullname }}</h4>
              <v-spacer></v-spacer>
              <v-btn icon @click="deleteItem(props.item)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Birthday:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.date_birthday }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Email:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Student to Course: {{ `${createItem.course_name} (${createItem.course_code})` }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select label="Student" :items="students" v-model="createItem.student_id" item-value="student_id" item-text="student_fullname" single-line></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select label="Birthday" :items="students" v-model="createItem.student_id" item-value="student_id" item-text="date_birthday" single-line append-icon="" readonly></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select label="Email" :items="students" v-model="createItem.student_id" item-value="student_id" item-text="email" single-line append-icon="" readonly></v-select>
              </v-flex>
            </v-layout>
          </v-container>
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
import { mapActions } from 'vuex';

export default {
  data: () => ({
    search: '',
    rowsPerPageItems: [5, 10, 15, 20, 25],
    pagination: { rowsPerPage: 10 },
    dialog: false,
    createItem: {},
    items: [
      {
        student_id: 1,
        course_id: 1,
        student_fullname: 'John Malkovich',
        date_birthday: '2007-09-06',
        email: 'jm@jm.ca',
      },
      {
        student_id: 2,
        course_id: 1,
        student_fullname: 'Morgan Burnett',
        date_birthday: '2008-02-17',
        email: 'mb@mb.ca',
      },
      {
        student_id: 3,
        course_id: 1,
        student_fullname: 'Talles Smith',
        date_birthday: '2007-11-01',
        email: 'ts@ts.com',
      },
      {
        student_id: 4,
        course_id: 1,
        student_fullname: 'Paulo Otavio',
        date_birthday: '2007-09-06',
        email: 'jm@jm.ca',
      },
      {
        student_id: 5,
        course_id: 1,
        student_fullname: 'Adelaide Constantin',
        date_birthday: '2008-02-17',
        email: 'mb@mb.ca',
      },
      {
        student_id: 6,
        course_id: 2,
        student_fullname: 'Karen Ulsa',
        date_birthday: '2007-11-01',
        email: 'ts@ts.com',
      },
      {
        student_id: 7,
        course_id: 3,
        student_fullname: 'Melvin Wood',
        date_birthday: '2007-09-06',
        email: 'jm@jm.ca',
      },
      {
        student_id: 8,
        course_id: 3,
        student_fullname: 'Donovan McNabb',
        date_birthday: '2008-02-17',
        email: 'mb@mb.ca',
      },
      {
        student_id: 9,
        course_id: 3,
        student_fullname: 'Barbra Silverman',
        date_birthday: '2007-11-01',
        email: 'ts@ts.com',
      },
    ],
    students: [
      {
        student_id: 10,
        student_fullname: 'Melvin Wood',
        date_birthday: '2007-09-06',
        email: 'jm@jm.ca',
      },
      {
        student_id: 11,
        student_fullname: 'Donovan McNabb',
        date_birthday: '2008-02-17',
        email: 'mb@mb.ca',
      },
      {
        student_id: 12,
        student_fullname: 'Barbra Silverman',
        date_birthday: '2007-11-01',
        email: 'ts@ts.com',
      },
    ],
  }),
  created() {
    if (!Object.keys(this.$route.params).length) {
      this.sendToNamedRoute({ routeName: 'adminCourses' });
    } else {
      this.createItem.course_id = this.$route.params.course_id;
      this.createItem.course_name = this.$route.params.course_name;
      this.createItem.course_code = this.$route.params.course_code;
    }
  },
  computed: {
    filteredStudents() {
      return this.items.filter(student => student.course_id === this.$route.params.course_id);
    },
  },
  methods: {
    ...mapActions('navigation', [
      'sendToNamedRoute',
    ]),
    clearFields() {
      this.search = '';
    },
    closeItem() {
      this.dialog = false;
    },
    saveItem() {
      this.items.push({
        student_id: this.createItem.student_id,
        course_id: this.createItem.course_id,
        student_fullname: this.students.find(student => student.student_id === this.createItem.student_id).student_fullname,
        date_birthday: this.students.find(student => student.student_id === this.createItem.student_id).date_birthday,
        email: this.students.find(student => student.student_id === this.createItem.student_id).email,
      });
      this.dialog = false;
    },
    addItem() {
      this.dialog = true;
    },
    deleteItem(student) {
      const index = this.items.indexOf(student);
      this.items.splice(index, 1);
    },
  },
};
</script>
