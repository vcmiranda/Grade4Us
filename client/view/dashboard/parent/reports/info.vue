<template>
  <v-container fluid>
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="courses"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
    >
      <v-flex slot="item" slot-scope="props" xs12 md6 pa-2>
        <v-card>
          <v-card-title class="accent">
            <h4 class="white--text">{{ `${props.item.course_name} - ${props.item.course_code}` }}</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-container fluid class="scrollBar">
            <v-layout row wrap v-for="student in props.item.students" :key="student.student_id" align-center>
              <v-flex xs6>
                {{ `${student.firstname} ${student.lastname}` }}
              </v-flex>
              <v-flex xs4 class="text-xs-right">
                {{ student.date_birthday }}
              </v-flex>
              <v-flex xs2 class="text-xs-right">
                <v-tooltip left>
                  <v-btn icon class="ma-0 pa-0" @click="editItem(props.item.course_id, props.item.subjects, student)" :disabled="!props.item.subjects" slot="activator">
                    <v-icon color="green">edit</v-icon>
                  </v-btn>
                  <span>To enable this feature you have to add some skills to this course.</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-data-iterator>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Add/Edit Marks</span>
        </v-card-title>
        <v-card-title>
          <span class="headline">Student: {{ `${editedItem.firstname} ${editedItem.lastname}` }}</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 px-2>
              <v-toolbar dense color="blue" class="white--text">
                <v-toolbar-title>Skills</v-toolbar-title>
              </v-toolbar>
            </v-flex>
            <v-flex xs12 px-2 pt-3>
              <v-container fluid>
                <v-layout row wrap v-for="skill in editedItem.skills" :key="skill.skill_id" align-center>
                  <v-flex xs12 px-2>
                    <v-toolbar dense color="grey" class="white--text">
                      <v-toolbar-title>{{ skills.find(row=>row.skill_id===skill.skill_id).skill_name }}</v-toolbar-title>
                    </v-toolbar>
                  </v-flex>
                  <v-flex xs3 px-2>
                    <v-select :items="marks" v-model="skill.mark" label="Mark" item-value="mark_id" item-text="mark_name" single-line></v-select>
                  </v-flex>
                  <v-flex xs9 class="text-xs-right">
                    <v-text-field multi-line label="Feedback" v-model="skill.feedback"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 px-2>
              <v-toolbar dense color="blue" class="white--text">
                <v-toolbar-title>Subjects</v-toolbar-title>
              </v-toolbar>
            </v-flex>
            <v-flex xs12 px-2 pt-3>
              <v-container fluid>
                <v-layout row wrap v-for="mark in editedItem.marks" :key="mark.subject_id" align-center>
                  <v-flex xs12 px-2>
                    <v-toolbar dense color="grey" class="white--text">
                      <v-toolbar-title>{{ editedItem.subjects.find(row=>row.subject_id===mark.subject_id).subject_name }}</v-toolbar-title>
                    </v-toolbar>
                  </v-flex>
                  <v-flex xs3 px-2>
                    <v-select :items="marks" v-model="mark.mark" label="Mark" item-value="mark_id" item-text="mark_name" single-line></v-select>
                  </v-flex>
                  <v-flex xs9 class="text-xs-right">
                    <v-text-field multi-line label="Feedback" v-model="mark.feedback"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
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
import utils from '../../../../utils/moment.utils';

export default {
  data: () => ({
    valid: false,
    dialog: false,
    menuBirthday: false,
    menuEnrollment: false,
    search: '',
    rowsPerPageItems: [5, 10, 15, 20, 25],
    pagination: { rowsPerPage: 10 },
    marks: [
      { mark_id: 1, mark_name: 'A+' },
      { mark_id: 2, mark_name: 'A' },
      { mark_id: 3, mark_name: 'A-' },
      { mark_id: 4, mark_name: 'B+' },
      { mark_id: 5, mark_name: 'B' },
      { mark_id: 6, mark_name: 'B-' },
      { mark_id: 7, mark_name: 'C+' },
      { mark_id: 8, mark_name: 'C' },
      { mark_id: 9, mark_name: 'C-' },
      { mark_id: 10, mark_name: 'D+' },
      { mark_id: 11, mark_name: 'D' },
      { mark_id: 12, mark_name: 'D-' },
      { mark_id: 13, mark_name: 'F' },
    ],
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
            current_student: false,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. ' },
              { skill_id: 2, mark: 'B', feedback: 'Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A-', feedback: 'In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'C+', feedback: 'Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'B-', feedback: 'Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'D', feedback: 'Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'A-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
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
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'B+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'A-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
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
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'D+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'B', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'C-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'C', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
          {
            student_id: 4,
            firstname: 'John',
            lastname: 'Malkovich',
            date_birthday: '2007-09-06',
            email: 'jm@jm.ca',
            date_enrolled: '2016-09-06',
            resp_firstname: 'Erin',
            resp_lastname: 'Malkovich',
            resp_email: 'emalkovich@em.ca',
            current_student: false,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'C', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'C', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'C-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'B-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
          {
            student_id: 5,
            firstname: 'Morgan',
            lastname: 'Burnett',
            date_birthday: '2008-02-17',
            email: 'mb@mb.ca',
            date_enrolled: '2016-10-06',
            resp_firstname: 'Tiki',
            resp_lastname: 'Burnett',
            resp_email: 'tBurnett@tb.ca',
            current_student: true,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'D', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'D+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'D-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'D', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
          {
            student_id: 6,
            firstname: 'Talles',
            lastname: 'Smith',
            date_birthday: '2007-11-01',
            email: 'ts@ts.com',
            date_enrolled: '2016-11-06',
            resp_firstname: 'Bob',
            resp_lastname: 'Smith',
            resp_email: 'bsmith@bs.ca',
            current_student: true,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'A-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
          {
            student_id: 7,
            firstname: 'John',
            lastname: 'Malkovich',
            date_birthday: '2007-09-06',
            email: 'jm@jm.ca',
            date_enrolled: '2016-09-06',
            resp_firstname: 'Erin',
            resp_lastname: 'Malkovich',
            resp_email: 'emalkovich@em.ca',
            current_student: false,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'B', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'B+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'A-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'C', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
          {
            student_id: 8,
            firstname: 'Morgan',
            lastname: 'Burnett',
            date_birthday: '2008-02-17',
            email: 'mb@mb.ca',
            date_enrolled: '2016-10-06',
            resp_firstname: 'Tiki',
            resp_lastname: 'Burnett',
            resp_email: 'tBurnett@tb.ca',
            current_student: true,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'C', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'B-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
          {
            student_id: 9,
            firstname: 'Talles',
            lastname: 'Smith',
            date_birthday: '2007-11-01',
            email: 'ts@ts.com',
            date_enrolled: '2016-11-06',
            resp_firstname: 'Bob',
            resp_lastname: 'Smith',
            resp_email: 'bsmith@bs.ca',
            current_student: true,
            skills: [
              { skill_id: 1, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 2, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 3, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 5, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { skill_id: 6, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
            ],
            marks: [
              { subject_id: 1, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lectus placerat, auctor magna sit amet, pretium nisi. Suspendisse potenti. Nulla scelerisque libero justo, quis efficitur sapien vehicula vitae. In sit amet finibus eros, sed bibendum risus. Cras tempor arcu ut libero volutpat luctus. Sed sed mauris nunc. Morbi lorem tellus, feugiat sit amet luctus a, mattis non tortor. Cras auctor nunc id posuere blandit. Duis varius semper nisl, et consectetur nulla bibendum id. Sed congue, dui eu iaculis tincidunt, augue turpis lobortis nunc, ut elementum erat tellus vel ipsum. Suspendisse imperdiet velit nec turpis mattis, eu feugiat justo malesuada. Vivamus dui mauris, porta id tellus eget, aliquet pretium quam. Cras imperdiet elementum velit, vitae pretium orci laoreet in. Fusce feugiat tincidunt ultricies. Sed nec vulputate ligula. Curabitur orci augue, tempus eget neque quis, condimentum tristique nibh.' },
              { subject_id: 2, mark: 'A+', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc vel urna eleifend interdum. Nulla sed libero dignissim, efficitur massa sed, fringilla ante. Sed tellus mauris, consequat ut finibus at, feugiat id sapien. Maecenas nec euismod tellus, vel sodales arcu. Quisque rutrum ante a turpis lobortis, ac feugiat dui elementum. Maecenas suscipit felis ligula, ornare commodo orci sollicitudin id. Curabitur molestie congue magna, sit amet venenatis nisi ultrices sed. In vel nisl quis justo dapibus egestas. Quisque vitae tristique orci. Nunc nisi ante, luctus in pellentesque vel, consequat et nunc. Nunc placerat bibendum magna. Morbi ultrices pulvinar nisi, in sollicitudin tortor elementum at. Cras varius, purus eu lacinia posuere, enim lacus vehicula tellus, sit amet posuere tellus nulla eget libero. Morbi ex tellus, vulputate luctus eros non, cursus tristique tortor.' },
              { subject_id: 3, mark: 'A-', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac justo quis diam placerat placerat vitae quis nunc. Quisque dignissim ligula dignissim, gravida nisl vitae, vulputate lacus. Phasellus et ex sit amet est faucibus molestie non blandit orci. Etiam sed pretium augue. Sed dictum, justo nec efficitur pretium, neque felis tincidunt turpis, eu porttitor elit leo a nisi. Vivamus viverra, nibh in congue ultricies, risus velit dictum tellus, sagittis pharetra ex justo vel diam. Ut euismod turpis vitae est gravida, eu convallis odio auctor. Fusce rhoncus metus ut consequat tincidunt. Quisque dapibus pharetra neque, a condimentum enim porttitor eget.' },
              { subject_id: 4, mark: 'A', feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie urna eget tortor tincidunt, id aliquam mauris tincidunt. Sed leo tellus, venenatis eu viverra sit amet, auctor non odio. Nulla et sem at justo auctor fringilla at sed ante. Nullam eros lorem, rutrum iaculis sagittis sit amet, viverra sit amet ipsum. Vestibulum porttitor, tellus eu porttitor scelerisque, nunc metus finibus sem, a aliquam turpis mauris ut augue. Etiam sed dictum arcu. Praesent justo diam, tincidunt non porta quis, molestie vitae nibh. Nunc interdum, justo ut venenatis pulvinar, eros nunc dictum justo, pharetra consequat mi ligula in ex. Sed ac ex eget urna tincidunt venenatis quis quis nunc. Vestibulum eget nunc sit amet sapien consequat accumsan in cursus ipsum. Donec scelerisque velit id lorem pharetra, a convallis velit posuere. Fusce blandit lacus eget risus interdum varius ac sed ipsum. Morbi eget blandit dolor. Maecenas vitae sagittis ligula. Donec in ultrices orci, sed dictum dolor.' },
            ],
          },
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
        students: [
          {
            student_id: 4,
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
            student_id: 5,
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
            student_id: 6,
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
        students: [
          {
            student_id: 7,
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
            student_id: 8,
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
            student_id: 9,
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
      },
    ],
    editedItem: {

    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Grades';
    },
  },
  methods: {
    editItem(courseID, subjects, student) {
      const currentCourse = this.courses.find(course => course.course_id === courseID);
      const index = currentCourse.students.indexOf(student);
      this.editedItem = {
        index,
        subjects,
        student_id: currentCourse.students[index].student_id,
        firstname: currentCourse.students[index].firstname,
        lastname: currentCourse.students[index].lastname,
        date_birthday: currentCourse.students[index].date_birthday,
        email: currentCourse.students[index].email,
        date_enrolled: currentCourse.students[index].date_enrolled,
        resp_firstname: currentCourse.students[index].resp_firstname,
        resp_lastname: currentCourse.students[index].resp_lastname,
        resp_email: currentCourse.students[index].resp_email,
        current_student: currentCourse.students[index].current_student,
        skills: currentCourse.students[index].skills,
        marks: currentCourse.students[index].marks,
      };
      this.dialog = true;
    },
    closeItem() {
      this.dialog = false;
    },
    saveItem() {
      if (this.editedIndex) {
        this.courses[this.editedItem.index].firstname = this.editedItem.firstname;
        this.courses[this.editedItem.index].lastname = this.editedItem.lastname;
        this.courses[this.editedItem.index].date_birthday = this.editedItem.date_birthday;
        this.courses[this.editedItem.index].email = this.editedItem.email;
        this.courses[this.editedItem.index].date_enrolled = this.editedItem.date_enrolled;
        this.courses[this.editedItem.index].resp_firstname = this.editedItem.resp_firstname;
        this.courses[this.editedItem.index].resp_lastname = this.editedItem.resp_lastname;
        this.courses[this.editedItem.index].resp_email = this.editedItem.resp_email;
        this.courses[this.editedItem.index].current_student = this.editedItem.current_student;
        this.courses[this.editedItem.index].skills = this.editedItem.skills;
        this.courses[this.editedItem.index].marks = this.editedItem.marks;
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

<style scoped>
.customAlignEnd {
  align-items: flex-end !important;
}
.scrollBar {
  overflow-y: scroll;
  height: 320px;
}
</style>
