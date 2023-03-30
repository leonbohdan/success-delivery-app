<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/useUsersStore.js';
import { VDataTable } from 'vuetify/labs/components';
import AddUserDialog from '@/components/AddUserDialog.vue';

const userStore = useUsersStore();

const showAddUserDialog = ref(false);

const headers = ref([
  {
    key: 'id',
    title: 'Id',
    sortable: false,
    filterable: false,
  }, {
    key: 'name',
    title: 'Name',
    align: 'center',
    sortable: false,
  },{
    key: 'actions',
    title: 'Actions',
    align: 'center',
    sortable: false,
  },
]);

const deleteUser = (id) => {
  console.log('deleteUser id', id);
};

const addRequest = (userId) => {
  console.log('addRequest userId', userId);
};

const showAllUserRequest = (userId) => {
  console.log('showAllUserRequest userId', userId);
};
</script>

<template>
  <v-card border>
    <v-expand-transition>
      <v-row dense align="center">
        <v-col class="pa-4 mr-auto">
          <v-btn
            color="primary"
            @click="showAddUserDialog = true"
          >
            Add user
          </v-btn>
        </v-col>
      </v-row>
    </v-expand-transition>

    <VDataTable
      :items-per-page="50"
      :headers="headers"
      :items="userStore.users"
      item-value="id"
    >
      <template #item.actions="{ item }">
        <v-btn
          icon
          size="small"
          elevation="0"
          @click="showAllUserRequest(item.props.title.id)"
        >
          <v-icon icon="mdi-timetable"/>

          <v-tooltip
            activator="parent"
            location="bottom"
          >
            Show all user requests
          </v-tooltip>
        </v-btn>
        
        <v-btn
          icon
          size="small"
          elevation="0"
          @click="addRequest(item.props.title.id)"
        >
          <v-icon icon="mdi-plus-box-outline"/>

          <v-tooltip
            activator="parent"
            location="bottom"
          >
            Add request
          </v-tooltip>
        </v-btn>

        <v-btn
          icon
          size="small"
          elevation="0"
          @click="deleteUser(item.props.title.id)"
        >
          <v-icon icon="mdi-delete"/>

          <v-tooltip
            activator="parent"
            location="bottom"
          >
            Delete user
          </v-tooltip>
        </v-btn>
      </template>
    </VDataTable>
  </v-card>

  <AddUserDialog
    v-model="showAddUserDialog"
  />
</template>
