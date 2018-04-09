<template>
  <v-container mb-3>
    <v-toolbar dense flat>
      <v-btn color='primary' dark @click="createItem">Add Course
        <v-icon dark right>add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      <v-btn flat icon @click="clearFields">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="items" class="elevation-1" :pagination.sync="pagination" :search="search">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.course_id }}</td>
        <td class="text-xs-center">{{ props.item.course_code }}</td>
        <td class="text-xs-center">{{ props.item.course_name }}</td>
        <td class="text-xs-center">{{ props.item.year_name }}</td>
        <td class="text-xs-center">{{ props.item.grade_name }}</td>
        <td class="text-xs-center">{{ props.item.grade_age }}</td>
        <td class="text-xs-center">{{ props.item.teacher_fullname }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip left>
            <v-btn icon class="mx-0" @click="editItem(props.item)" slot="activator">
              <v-icon color="green">edit</v-icon>
            </v-btn>
            <span>Edit Course</span>
          </v-tooltip>
          <v-tooltip left>
            <v-btn icon class="mx-0" @click="manageStudents(props.item)" slot="activator">
              <v-icon color="orange">fa-child</v-icon>
            </v-btn>
            <span>Manage Students</span>
          </v-tooltip>
          <v-tooltip left>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)" slot="activator">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            <span>Delete Course</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Course Code" v-model="editedItem.course_code"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Course Name" v-model="editedItem.course_name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select label="Year" :items="years" v-model="editedItem.year_id" item-value="year_id" item-text="year_name" single-line></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select label="Grade" :items="grades" v-model="editedItem.grade_id" item-value="grade_id" item-text="grade_name" single-line></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select label="Grade" :items="grades" v-model="editedItem.grade_id" item-value="grade_id" item-text="grade_age" single-line append-icon="" readonly></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select label="Teacher" :items="teachers" v-model="editedItem.teacher_id" item-value="teacher_id" item-text="teacher_fullname" single-line></v-select>
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
    dialog: false,
    search: '',
    pagination: { rowsPerPage: 10 },
    editedIndex: true,
    headers: [
      { text: 'Course ID', align: 'center', value: 'course_id' },
      { text: 'Course Code', align: 'center', value: 'course_code' },
      { text: 'Course Name', align: 'center', value: 'course_name' },
      { text: 'Year', align: 'center', value: 'year_name' },
      { text: 'Grade', align: 'center', value: 'grade_name' },
      { text: 'Grade Age', align: 'center', value: 'grade_age' },
      { text: 'Teacher', align: 'center', value: 'teacher_fullname' },
      { text: 'Actions', align: 'center', value: 'name', sortable: false },
    ],
    items: [
      {
        course_id: 1,
        course_code: 'CUL-1222',
        course_name: 'Culinary',
        year_id: 1,
        year_name: '2017/2018',
        grade_id: 14,
        grade_name: 'Grade 12',
        grade_age: '17-18',
        teacher_id: 1,
        teacher_fullname: 'Vitor Miranda',
      },
      {
        course_id: 2,
        course_code: 'ETH-5585',
        course_name: 'Ethics',
        year_id: 1,
        year_name: '2017/2018',
        grade_id: 13,
        grade_name: 'Grade 11',
        grade_age: '16-17',
        teacher_id: 2,
        teacher_fullname: 'Sabrina Negrelli',
      },
      {
        course_id: 3,
        course_code: 'HOC-8599',
        course_name: 'Hockey',
        year_id: 1,
        year_name: '2017/2018',
        grade_id: 12,
        grade_name: 'Grade 10',
        grade_age: '15-16',
        teacher_id: 3,
        teacher_fullname: 'Pablo Vittar',
      },
    ],
    editedItem: {
      course_code: '',
      course_name: '',
      year_name: '',
      grade_id: '',
      grade_name: '',
      grade_age: '',
      teacher_id: '',
      teacher_fullname: '',
    },
    years: [
      { year_id: 1, year_name: '2017/2018' },
      { year_id: 2, year_name: '2018/2019' },
      { year_id: 3, year_name: '2019/2020' },
    ],
    grades: [
      { grade_id: 12, grade_name: 'Grade 10', grade_age: '15-16' },
      { grade_id: 13, grade_name: 'Grade 11', grade_age: '16-17' },
      { grade_id: 14, grade_name: 'Grade 12', grade_age: '17-18' },
      { grade_id: 15, grade_name: 'Grade 12+', grade_age: '18-21' },
    ],
    teachers: [
      { teacher_id: 1, teacher_fullname: 'Vitor Miranda' },
      { teacher_id: 2, teacher_fullname: 'Sabrina Negrelli' },
      { teacher_id: 3, teacher_fullname: 'Pablo Vittar' },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === false ? 'New Item' : 'Edit Item';
    },
  },
  methods: {
    ...mapActions('navigation', [
      'sendToNamedRoute',
    ]),
    clearFields() {
      this.search = '';
    },
    createItem() {
      this.dialog = true;
      this.editedIndex = false;
      this.editedItem = {};
    },
    editItem(course) {
      this.dialog = true;
      this.editedIndex = true;
      this.editedItem = {
        index: this.items.indexOf(course),
        course_code: course.course_code,
        course_name: course.course_name,
        year_id: course.year_id,
        grade_id: course.grade_id,
        teacher_id: course.teacher_id,
      };
    },
    deleteItem(course) {
      const index = this.items.indexOf(course);
      this.items.splice(index, 1);
    },
    closeItem() {
      this.dialog = false;
    },
    saveItem() {
      this.editedItem.year_name = this.years.find(year => year.year_id === this.editedItem.year_id).year_name;
      this.editedItem.grade_name = this.grades.find(grade => grade.grade_id === this.editedItem.grade_id).grade_name;
      this.editedItem.grade_age = this.grades.find(grade => grade.grade_id === this.editedItem.grade_id).grade_age;
      this.editedItem.teacher_fullname = this.teachers.find(teacher => teacher.teacher_id === this.editedItem.teacher_id).teacher_fullname;
      if (this.editedIndex) {
        this.items[this.editedItem.index].course_code = this.editedItem.course_code;
        this.items[this.editedItem.index].course_name = this.editedItem.course_name;
        this.items[this.editedItem.index].year_id = this.editedItem.year_id;
        this.items[this.editedItem.index].year_name = this.editedItem.year_name;
        this.items[this.editedItem.index].grade_id = this.editedItem.grade_id;
        this.items[this.editedItem.index].grade_name = this.editedItem.grade_name;
        this.items[this.editedItem.index].grade_age = this.editedItem.grade_age;
        this.items[this.editedItem.index].teacher_id = this.editedItem.teacher_id;
        this.items[this.editedItem.index].teacher_fullname = this.editedItem.teacher_fullname;
      } else {
        this.items.push(this.editedItem);
      }
      this.dialog = false;
    },
    manageStudents(course) {
      this.sendToNamedRoute({
        routeName: 'adminCourseStudents',
        course: {
          course_id: course.course_id,
          course_name: course.course_name,
          course_code: course.course_code,
        },
      });
    },
  },
};
</script>
