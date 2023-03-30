<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:model-value', 'close-dialog']);

const handleClose = () => {
  emit('update:model-value', false);
  emit('close-dialog');
};

const handleSave = () => {
  emit('save');
};
</script>

<template>
  <div class="text-center">
    <v-dialog
      :model-value="modelValue"
      width="500px"
      persistent
    >
      <v-card>
        <v-card-title v-if="title" class="px-6">
          <span v-html="title"/>
        </v-card-title>

        <v-divider/>

        <v-card-text class="p-0">
          <slot/>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn color="error" @click="handleClose">
            Close
          </v-btn>

          <v-btn color="primary" @click="handleSave">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
