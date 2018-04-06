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
                <v-card>
                    <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md2>
                            <v-text-field label="Points" v-model="editedItem.points"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                            <v-text-field label="Feedback" v-model="editedItem.feedback"></v-text-field>
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
                        <td class="text-xs-left">{{ props.item.points }}</td>
                        <td class="text-xs-left">{{ props.item.feedback }}</td>
                        <td class="text-xs-left layout px-0">
                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        </td>
                    </template>
                    </v-data-table>
                </v-card>
            </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import convert from '../../../../utils/moment.utils';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    dialog: false,
    children: [
      {
        studentID: 1,
        firstname: 'Nathalia',
        lastname: 'Miranda',
        feedback: 'nscmiranda@outlook.com',
        dateBirthday: '',
        grade: 5,
        dateEnrolled: '2016-09-06',
        menu: false,
        image: '1.png',
      },
    ],
    headers: [
      {
        text: 'Grade Item',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Points', value: 'points' },
      { text: 'Feedback', value: 'feedback' },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      points: 0,
      feedback: 0,
    },
    defaultItem: {
      name: '',
      points: 0,
      feedback: 0,
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Grade Item';
    }
  },
  created() {
    this.fetchImg();
    this.initialize();
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
      return convert.convertInverseToFormattedDate(date);
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
    initialize() {
      this.items = [
        {
          name: 'Frozen Yogurt',
          points: 159,
          feedback: 6.0,
        },
        {
          name: 'Ice cream sandwich',
          points: 237,
          feedback: 9.0,
        }];
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
  .alignItself {
    align-self: center;
  }
</style>
