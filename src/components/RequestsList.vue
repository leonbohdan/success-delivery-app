<script setup>
import { ref } from 'vue';
import { useRequestsStore } from '@/stores/useRequestsStore.js';
import { VDataTable } from 'vuetify/labs/components';

const requestsStore = useRequestsStore();

const headers = ref([
  {
    key: 'requestType',
    title: 'Request type',
    align: 'center',
    sortable: false,
  }, {
    key: 'destination',
    title: 'Destination (from - to)',
    align: 'center',
    sortable: false,
  }, {
    key: 'parcelType',
    title: 'Parcel Type',
    align: 'center',
    sortable: false,
  }, {
    key: 'date',
    title: 'Dispatch date',
    align: 'center',
    sortable: true,
  }, {
    key: 'description',
    title: 'Description',
    align: 'center',
    sortable: false,
  }, {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    sortable: false,
  },
]);

const editRequest = (id) => {
  console.log('editRequest id', id);
};

const deleteRequest = (id) => {
  console.log('deleteRequest id', id);
};
</script>

<template>
  <v-card border>
    <VDataTable
      :items-per-page="50"
      :headers="headers"
      :items="requestsStore.requests"
      item-value="id"
    >
      <template #item.destination="{ item }">
        {{ item.props.title.from }} - {{ item.props.title.to }}
      </template>

      <template #item.actions="{ item }">
        <v-btn
          icon
          size="small"
          elevation="0"
          @click="editRequest(item.props.title.id)"
        >
          <v-icon icon="mdi-pencil"/>

          <v-tooltip
            activator="parent"
            location="bottom"
          >
            Edit request
          </v-tooltip>
        </v-btn>

        <v-btn
          icon
          size="small"
          elevation="0"
          @click="deleteRequest(item.props.title.id)"
        >
          <v-icon icon="mdi-delete"/>

          <v-tooltip
            activator="parent"
            location="bottom"
          >
            Delete request
          </v-tooltip>
        </v-btn>
      </template>
    </VDataTable>
  </v-card>
</template>
