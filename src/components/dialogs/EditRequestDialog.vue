<script setup>
// import { ref } from 'vue';
// import { useUsersStore } from '@/stores/useUsersStore.js';
import BaseDialog from '@/components/base/BaseDialog.vue';

// const usersStore = useUsersStore();

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  requestId: {
    type: String,
    default: null,
  },
});

const emits = defineEmits(['update:model-value']);

const editRequest = () => {
  console.log('editRequest');

  emits('update:model-value', false);
};
</script>

<template>
  <BaseDialog
    :model-value="modelValue"
    title="Edit request"
    @save="editRequest"
    @close-dialog="emits('update:model-value', false)"
  >
    Edit Form
  </BaseDialog>
</template>
