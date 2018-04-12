<template>
  <v-container fluid>
    <v-toolbar dense flat>
      <v-btn color='primary' dark @click="createItem">Add Teacher
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
        <td class="text-xs-center">{{ props.item.user_id }}</td>
        <td class="text-xs-center">{{ props.item.firstname }}</td>
        <td class="text-xs-center">{{ props.item.lastname }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
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
                <v-text-field label="First Name" v-model="editedItem.firstname" prepend-icon="fas fa-user"></v-text-field>
              </v-flex>
              <v-flex xs12 px-2>
                <v-text-field label="Last Name" v-model="editedItem.lastname" prepend-icon="far fa-user"></v-text-field>
              </v-flex>
              <v-flex xs12 px-2>
                <v-text-field label="Email" v-model="editedItem.email" prepend-icon="email"></v-text-field>
              </v-flex>
              <v-flex xs12 px-2>
                <v-text-field label="Phone" v-model="editedItem.phone" prepend-icon="fa-phone"></v-text-field>
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
// import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    search: '',
    pagination: { rowsPerPage: 10 },
    editedIndex: true,
    headers: [
      { text: 'Teacher ID', align: 'center', value: 'user_id' },
      { text: 'First Name', align: 'center', value: 'firstname' },
      { text: 'Last Name', align: 'center', value: 'lastname' },
      { text: 'Email', align: 'center', value: 'email' },
      { text: 'Phone', align: 'center', value: 'phone' },
      { text: 'Actions', align: 'center', value: 'name', sortable: false },
    ],
    items: [
      {
        user_id: 1,
        firstname: 'Vitor',
        lastname: 'Miranda',
        email: 'vcmiranda@outlook.com',
        phone: '6479379470',
      },
      {
        user_id: 2,
        firstname: 'Sabrina',
        lastname: 'Negrelli',
        email: 'snegrelli@gmail.com',
        phone: '226935470',
      },
      {
        user_id: 3,
        firstname: 'Pablo',
        lastname: 'Vittar',
        email: 'pv@yahoo.com',
        phone: '6494473470',
      },
    ],
    editedItem: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
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
    editItem(teacher) {
      this.dialog = true;
      this.editedIndex = true;
      this.editedItem = {
        index: this.items.indexOf(teacher),
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        email: teacher.email,
        phone: teacher.phone,
      };
    },
    deleteItem(teacher) {
      const index = this.items.indexOf(teacher);
      this.items.splice(index, 1);
    },
    closeItem() {
      this.dialog = false;
    },
    saveItem() {
      if (this.editedIndex) {
        this.items[this.editedItem.index].firstname = this.editedItem.firstname;
        this.items[this.editedItem.index].lastname = this.editedItem.lastname;
        this.items[this.editedItem.index].email = this.editedItem.email;
        this.items[this.editedItem.index].phone = this.editedItem.phone;
      } else {
        this.items.push(this.editedItem);
      }
      this.dialog = false;
    },
  },
};
</script>
