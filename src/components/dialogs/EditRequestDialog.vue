<script setup>
import BaseDialog from '@/components/base/BaseDialog.vue';
import CreateForm from '@/components/CreateForm.vue';

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
</script>

<template>
  <BaseDialog
    :model-value="modelValue"
    title="Edit request"
    :show-footer="false"
    @close-dialog="emits('update:model-value', false)"
  >
    <CreateForm
      :min-width="400"
      :request-id="requestId"
      @save-request="emits('update:model-value', false)"
    />
  </BaseDialog>
</template>
