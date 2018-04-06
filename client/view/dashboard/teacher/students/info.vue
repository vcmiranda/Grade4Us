<template>
  <v-container mb-3>
    <v-expansion-panel class="elevation-0">
      <v-expansion-panel-content v-for="(course, i) in courses" :key="i">
        <div slot="header" class="display-1">{{ `${course.course_name} - ${course.course_code}` }}</div>
         <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md8>
                <v-text-field label="Description" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Value" v-model="editedItem.calories"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.birthDate }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.studentId }}</td>
        <td class="text-xs-right">{{ props.item.dateEnrolled }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    
      dialog: false,
      headers: [
        {
          text: 'Full name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Birth date', value: 'birthDate' },
        { text: 'Email', value: 'email' },
        { text: 'Student ID', value: 'studentId' },
        { text: 'Date enrolled', value: 'dateEnrolled' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        email: 0,
        studentId: 0,
        dateEnrolled: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        email: 0,
        studentId: 0,
        dateEnrolled: 0
      }    
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
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },
  watch: {
      dialog (val) {
        val || this.close();
      }
    },
  created () {
      this.initialize();
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
     initialize () {
        this.items = [
          {
            name: 'Frozen Yogurt',
            birthDate: 159,
            email: 6.0,
            studentId: 24,
            dateEnrolled: 4.0
          },
          {
            name: 'Ice cream sandwich',
            birthDate: 237,
            email: 9.0,
            studentId: 37,
            dateEnrolled: 4.3
          },
          {
            name: 'Eclair',
            birthDate: 262,
            email: 16.0,
            studentId: 23,
            dateEnrolled: 6.0
          },
          {
            name: 'Cupcake',
            birthDate: 305,
            email: 3.7,
            studentId: 67,
            dateEnrolled: 4.3
          },
          {
            name: 'Gingerbread',
            birthDate: 356,
            email: 16.0,
            studentId: 49,
            dateEnrolled: 3.9
          },
          {
            name: 'Jelly bean',
            birthDate: 375,
            email: 0.0,
            studentId: 94,
            dateEnrolled: 0.0
          },
          {
            name: 'Lollipop',
            birthDate: 392,
            email: 0.2,
            studentId: 98,
            dateEnrolled: 0
          },
          {
            name: 'Honeycomb',
            birthDate: 408,
            email: 3.2,
            studentId: 87,
            dateEnrolled: 6.5
          },
          {
            name: 'Donut',
            birthDate: 452,
            email: 25.0,
            studentId: 51,
            dateEnrolled: 4.9
          },
          {
            name: 'KitKat',
            birthDate: 518,
            email: 26.0,
            studentId: 65,
            dateEnrolled: 7
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem);
        } else {
          this.items.push(this.editedItem);
        }
        this.close();
      }
  },
};
</script>

<style scoped>
  .alignItself {
    align-self: center;
  }
</style>
