<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/useUsersStore.js';
import { generateUUID } from '@/helpers/id-generators.js';
import { requiredValidationRules, maxLengthValidationRules, minLengthValidationRules } from '@/helpers/rules.js';
import BaseDialog from '@/components/base/BaseDialog.vue';

const usersStore = useUsersStore();

const router = useRouter();

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:model-value']);

const userName = ref(null);
const form = ref(null);

const addUser = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    console.error('Comment is not valid!');

    return;
  }

  usersStore.addUser({
    id: generateUUID(),
    name: userName.value,
  });

  emits('update:model-value', false);
  userName.value = null;

  if (router.currentRoute.value.name !== 'requests') {
    router.push({ path: '/requests', query: { tab: 'users' } });
  }
};
</script>

<template>
  <BaseDialog
    :model-value="modelValue"
    title="Add new user"
    @save="addUser"
    @close-dialog="emits('update:model-value', false)"
  >
    <v-form ref="form">
      <v-text-field
        v-model="userName"
        autofocus
        label="Add user name"
        counter
        :rules="[...requiredValidationRules, ...maxLengthValidationRules(50), ...minLengthValidationRules()]"
      />
    </v-form>
  </BaseDialog>
</template>
