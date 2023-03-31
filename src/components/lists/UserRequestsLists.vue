<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRequestsStore } from '@/stores/useRequestsStore.js';
import { VDataTable } from 'vuetify/labs/components';
import AgreeDialog from '@/components/dialogs/ConfirmDialog.vue';
import EditRequestDialog from '@/components/dialogs/EditRequestDialog.vue';
import BaseNoData from '@/components/base/BaseNoData.vue';

const requestsStore = useRequestsStore();

const route = useRoute();

const showAgreeDialog = ref(false);
const showEditRequestDialog = ref(false);
const requestId = ref('');
const userId = route.params.id;

const filteredRequests = computed(() => {
  return requestsStore.requests.length
    ? requestsStore.requests.filter((request) => request.userId === userId)
    : [];
});

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
  requestId.value = id;
  showEditRequestDialog.value = true;
};

const deleteRequest = () => {
  requestsStore.deleteRequest(requestId.value);
  showAgreeDialog.value = false;
  requestId.value = null;
};

const handleDeleteRequest = (id) => {
  requestId.value = id;
  showAgreeDialog.value = true;
};
</script>

<template>
  <v-card border>
    <VDataTable
      v-if="filteredRequests.length"
      :items-per-page="50"
      :headers="headers"
      :items="filteredRequests"
      item-value="id"
    >
      <template #item.destination="{ item }">
        {{ item.props.title.from }} - {{ item.props.title.to }}
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex align-center justify-center">
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
            @click="handleDeleteRequest(item.props.title.id)"
          >
            <v-icon icon="mdi-delete"/>

            <v-tooltip
              activator="parent"
              location="bottom"
            >
              Delete request
            </v-tooltip>
          </v-btn>
        </div>
      </template>
    </VDataTable>

    <BaseNoData v-else/>
  </v-card>

  <EditRequestDialog
    v-model="showEditRequestDialog"
    :request-id="requestId"
  />

  <AgreeDialog
    v-model="showAgreeDialog"
    title="Delete request"
    message="Are you sure, do you want to delete this request?"
    @confirm-value="deleteRequest"
  />
</template>
