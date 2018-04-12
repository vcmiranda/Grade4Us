<template>
  <v-container fluid>
    <v-expansion-panel class="elevation-0">
      <v-expansion-panel-content v-for="(course, i) in courses" :key="i">
        <div slot="header" class="display-1">{{ `${course.course_name} - ${course.course_code}` }}</div>
        <v-form v-model="valid" class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                label="Choose skills to evaluate"
                :items="skills"
                v-model="course.skill"
                item-value="skill_id"
                item-text="skill_name"
                prepend-icon="fa-pencil-alt"
                autocomplete
                multiple
                chips
                required>
              </v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                label="Choose subjects to evaluate"
                :items="course.subjects"
                v-model="course.subjectsChosen"
                item-value="subject_id"
                item-text="subject_name"
                prepend-icon="fa-pencil-alt"
                autocomplete
                multiple
                chips
                required>
              </v-select>
            </v-flex>
            <v-flex xs12 text-xs-right>
              <v-btn color="red" class="white--text">Cancel</v-btn>
              <v-btn color="green" class="white--text" @click="print(course)" :disabled="valid">Save</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    skills: [
      { skill_id: 1, skill_name: 'Responsibility' },
      { skill_id: 2, skill_name: 'Organization' },
      { skill_id: 3, skill_name: 'Independent Work' },
      { skill_id: 4, skill_name: 'Collaboration' },
      { skill_id: 5, skill_name: 'Initiative' },
      { skill_id: 6, skill_name: 'Self-Regulation' },
    ],
    courses: [
      {
        teacher_id: 1,
        course_id: 1,
        course_code: 'LNG1120',
        course_name: 'Language',
        grade_name: 'Grade 5',
        subjects: [
          { subject_id: 1, subject_name: 'Reading' },
          { subject_id: 2, subject_name: 'Writing' },
          { subject_id: 3, subject_name: 'Communication' },
          { subject_id: 4, subject_name: 'Media Literacy' },
        ],
      },
      {
        teacher_id: 1,
        course_id: 2,
        course_code: 'SAT4540',
        course_name: 'Science and Technology',
        grade_name: 'Grade 5',
        subjects: [
          { subject_id: 5, subject_name: 'General' },
        ],
      },
      {
        teacher_id: 1,
        course_id: 3,
        course_code: 'MAT3398',
        course_name: 'Mathematics',
        grade_name: 'Grade 5',
        subjects: [
          { subject_id: 6, subject_name: 'Number Sense and Numeration' },
          { subject_id: 7, subject_name: 'Measurement' },
          { subject_id: 8, subject_name: 'Geometry and Spatial Sense' },
          { subject_id: 9, subject_name: 'Patterning and Algebra' },
          { subject_id: 10, subject_name: 'Management and Probability' },
        ],
      },
    ],
  }),
  // mounted() {
  //   this.listGrade();
  //   this.listCourse();
  //   console.log(this.courses);
  // },
  computed: {
    // ...mapState('grades', [
    //   'grades',
    // ]),
    // ...mapState('courses', [
    //   'courses',
    // ]),
  },
  methods: {
    // getImage(img) {
    //   /* eslint-disable */
    //   return require(`../../../../assets/img/${img}`);
    //   /* eslint-enable */
    // },
    // ...mapActions('grades', [
    //   'listGrade',
    // ]),
    // ...mapActions('courses', [
    //   'listCourse',
    // ]),
    // setGrade(grade) {
    //   console.log(grade);
    // },
    print(course) {
      console.log(course);
    },
  },
};
</script>
