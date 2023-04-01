<script setup>
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import BaseDialog from '@/components/base/BaseDialog.vue';
import BaseNoData from '@/components/base/BaseNoData.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  matchedRequests: {
    type: Array,
    default: () => ([]),
  },
});

const emits = defineEmits(['update:model-value']);

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
  },
]);
</script>

<template>
  <BaseDialog
    :model-value="modelValue"
    title="Matched requests"
    :show-footer="false"
    :width="'800'"
    @close-dialog="emits('update:model-value', false)"
  >
    <v-card border class="mb-3">
      <VDataTable
        v-if="props.matchedRequests.length"
        :items-per-page="50"
        :headers="headers"
        :items="props.matchedRequests"
        item-value="id"
      >
        <template #item.destination="{ item }">
          {{ item.props.title.from }} - {{ item.props.title.to }}
        </template>
      </VDataTable>

      <BaseNoData v-else/>
    </v-card>
  </BaseDialog>
</template>
