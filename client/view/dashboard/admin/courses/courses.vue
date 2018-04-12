<template>
  <v-container fluid>
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

    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
    >
      <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3 pa-1>
        <v-card>
          <v-card-title>
            <h4>{{ props.item.course_name }}</h4>
            <v-spacer></v-spacer>
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
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>fa-barcode</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Course ID:</v-list-tile-content>
              <v-list-tile-content class="customAlignEnd">{{ props.item.course_id }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>fa-book</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Course Code:</v-list-tile-content>
              <v-list-tile-content class="customAlignEnd">{{ props.item.course_code }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>fa-arrows-alt-v</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Year:</v-list-tile-content>
              <v-list-tile-content class="customAlignEnd">{{ props.item.year_name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>fa-birthday-cake</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Grade:</v-list-tile-content>
              <v-list-tile-content class="customAlignEnd">{{ props.item.grade_name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Grade Age:</v-list-tile-content>
              <v-list-tile-content class="customAlignEnd">{{ props.item.grade_age }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>fa-graduation-cap</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Teacher:</v-list-tile-content>
              <v-list-tile-content class="customAlignEnd">{{ props.item.teacher_fullname }}</v-list-tile-content>
            </v-list-tile>
            <v-list-group prepend-icon="email" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content class="customAlignStart">Subjects:</v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="subject in props.item.subjects" :key="subject.subject_id">
                <v-list-tile-content class="customAlignEnd">{{ subject.subject_name }}</v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 px-2>
                <v-toolbar dense color="blue" class="white--text">
                  <v-toolbar-title>General Information</v-toolbar-title>
                </v-toolbar>
              </v-flex>
              <v-flex xs12 px-2 pt-3>
                <v-text-field label="Course Code" v-model="editedItem.course_code" prepend-icon="fa-barcode"></v-text-field>
              </v-flex>
              <v-flex xs12 px-2>
                <v-text-field label="Course Name" v-model="editedItem.course_name" prepend-icon="fa-book"></v-text-field>
              </v-flex>
              <v-flex xs6 px-2>
                <v-select label="Grade" :items="grades" v-model="editedItem.grade_id" item-value="grade_id" item-text="grade_name" prepend-icon="fa-arrows-alt-v" single-line></v-select>
              </v-flex>
              <v-flex xs6 px-2>
                <v-select label="Grade Age" :items="grades" v-model="editedItem.grade_id" item-value="grade_id" item-text="grade_age" single-line prepend-icon="fa-birthday-cake" append-icon="" readonly></v-select>
              </v-flex>
              <v-flex xs6 px-2>
                  <v-select label="Year" :items="years" v-model="editedItem.year_id" item-value="year_id" item-text="year_name" prepend-icon="event" single-line></v-select>
                </v-flex>
              <v-flex xs6 px-2>
                <v-select label="Teacher" :items="teachers" v-model="editedItem.teacher_id" item-value="teacher_id" item-text="teacher_fullname" prepend-icon="fa-graduation-cap" single-line></v-select>
              </v-flex>
              <v-flex xs12 px-2>
                <v-toolbar dense color="blue" class="white--text">
                  <v-toolbar-title>Subjects</v-toolbar-title>
                </v-toolbar>
              </v-flex>
              <v-flex xs12 px-2>
                <v-select
                  label="Add subjects to be marked"
                  chips
                  tags
                  solo
                  prepend-icon="filter_list"
                  append-icon=""
                  clearable
                  v-model="chips"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
                      :selected="data.selected"
                    >
                      {{ data.item }};
                    </v-chip>
                  </template>
                </v-select>
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
    rowsPerPageItems: [5, 10, 15, 20, 25],
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
        course_code: 'LNG1120',
        course_name: 'Language',
        year_id: 1,
        year_name: '2017/2018',
        grade_id: 7,
        grade_name: 'Grade 5',
        grade_age: '09-10',
        teacher_id: 1,
        teacher_fullname: 'Vitor Miranda',
        subjects: [
          { subject_id: 1, subject_name: 'Reading' },
          { subject_id: 2, subject_name: 'Writing' },
          { subject_id: 3, subject_name: 'Communication' },
          { subject_id: 4, subject_name: 'Media Literacy' },
        ],
      },
      {
        course_id: 2,
        course_code: 'SAT4540',
        course_name: 'Science and Technology',
        year_id: 1,
        year_name: '2017/2018',
        grade_id: 7,
        grade_name: 'Grade 5',
        grade_age: '09-10',
        teacher_id: 2,
        teacher_fullname: 'Sabrina Negrelli',
        subjects: [
          { subject_id: 5, subject_name: 'General' },
        ],
      },
      {
        course_id: 3,
        course_code: 'MAT3398',
        course_name: 'Mathematics',
        year_id: 1,
        year_name: '2017/2018',
        grade_id: 7,
        grade_name: 'Grade 5',
        grade_age: '09-10',
        teacher_id: 3,
        teacher_fullname: 'Pablo Vittar',
        subjects: [
          { subject_id: 6, subject_name: 'Number Sense and Numeration' },
          { subject_id: 7, subject_name: 'Measurement' },
          { subject_id: 8, subject_name: 'Geometry and Spatial Sense' },
          { subject_id: 9, subject_name: 'Patterning and Algebra' },
          { subject_id: 10, subject_name: 'Management and Probability' },
        ],
      },
    ],
    editedItem: {
      course_id: null,
      course_code: '',
      course_name: '',
      year_name: '',
      year_id: null,
      grade_id: null,
      grade_name: '',
      grade_age: '',
      teacher_id: null,
      teacher_fullname: '',
    },
    chips: null,
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
        course_id: course.course_id,
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
      this.editedItem.subjects = this.chips.map(chip => chip);
      this.editedItem.year_name = this.years.find(year => year.year_id === this.editedItem.year_id).year_name;
      this.editedItem.grade_name = this.grades.find(grade => grade.grade_id === this.editedItem.grade_id).grade_name;
      this.editedItem.grade_age = this.grades.find(grade => grade.grade_id === this.editedItem.grade_id).grade_age;
      this.editedItem.teacher_fullname = this.teachers.find(teacher => teacher.teacher_id === this.editedItem.teacher_id).teacher_fullname;
      if (this.editedIndex) {
        this.items[this.editedItem.index].course_id = this.editedItem.course_id;
        this.items[this.editedItem.index].course_code = this.editedItem.course_code;
        this.items[this.editedItem.index].course_name = this.editedItem.course_name;
        this.items[this.editedItem.index].year_id = this.editedItem.year_id;
        this.items[this.editedItem.index].year_name = this.editedItem.year_name;
        this.items[this.editedItem.index].grade_id = this.editedItem.grade_id;
        this.items[this.editedItem.index].grade_name = this.editedItem.grade_name;
        this.items[this.editedItem.index].grade_age = this.editedItem.grade_age;
        this.items[this.editedItem.index].teacher_id = this.editedItem.teacher_id;
        this.items[this.editedItem.index].teacher_fullname = this.editedItem.teacher_fullname;
        this.items[this.editedItem.index].subjects = this.editedItem.subjects;
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
    remove(item) {
      this.editedItem.subjects.splice(this.editedItem.subjects.indexOf(item), 1);
      this.editedItem.subjects = [...this.editedItem.subjects];
    },
  },
};
</script>

<style scoped>
.customAlignEnd {
  align-items: flex-end !important;
}
.customAlignStart {
  align-items: flex-start !important;
}
</style>
