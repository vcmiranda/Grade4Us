<template>
  <v-container mb-3>
    <v-expansion-panel class="elevation-0">
      <v-expansion-panel-content v-for="(course, i) in courses" :key="i">
        <div slot="header" class="display-1">{{ `${course.course_name} - ${course.course_code}` }}</div>
        <v-form v-model="valid" class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Course Code" v-model="course.course_code" prepend-icon="people" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Course Name" v-model="course.course_name" prepend-icon="people_outline" required></v-text-field>
            </v-flex>
              <v-select :items="grades" v-model="course.grade_id" label="Grade" item-value="grade_id" item-text="grade_name" prepend-icon="school" @input="setGrade(course.gradeID)" single-line></v-select>
            <v-flex xs12>
              <v-text-field label="Grade Age" v-model="course.grade_age" prepend-icon="school" readonly></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Number of Students" v-model="course.numberOfStudents" prepend-icon="school" readonly></v-text-field>
            </v-flex>
            <v-flex xs12 text-xs-right>
              <v-btn color="red" class="white--text">Cancel</v-btn>
              <v-btn color="green" class="white--text" @click="print(course)">Save</v-btn>
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
  }),
  mounted() {
    this.listGrade();
    this.listCourse();
    console.log(this.courses);
  },
  computed: {
    ...mapState('grades', [
      'grades',
    ]),
    ...mapState('courses', [
      'courses',
    ]),
  },
  methods: {
    // getImage(img) {
    //   /* eslint-disable */
    //   return require(`../../../../assets/img/${img}`);
    //   /* eslint-enable */
    // },
    ...mapActions('grades', [
      'listGrade',
    ]),
    ...mapActions('courses', [
      'listCourse',
    ]),
    setGrade(grade) {
      console.log(grade);
    },
    print(course) {
      console.log(course);
    },
  },
};
</script>

<style scoped>
  .alignItself {
    align-self: center;
  }
</style>
