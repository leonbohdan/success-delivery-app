<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/useUsersStore.js';
import { generateUUID } from '@/helpers/id-generators.js';
import { requiredValidationRules, maxLengthValidationRules, minLengthValidationRules } from '@/helpers/rules.js';
import BaseDialog from '@/components/base/BaseDialog.vue';

const usersStore = useUsersStore();

const router = useRouter();

const showAddUserDialog = ref(false);
const userName = ref(null);
const form = ref(null);

const saveUser = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    console.error('Comment is not valid!');

    return;
  }

  usersStore.addUser({
    id: generateUUID(),
    name: userName.value,
  });

  showAddUserDialog.value = false;
  userName.value = null;
  router.push('/requests');
};
</script>

<template>
  <div
    v-if="usersStore.isNoUsers"
    class="d-flex align-center justify-center"
  >
    <v-btn
      color="primary"
      @click="showAddUserDialog = true"
    >
      Start with adding user
    </v-btn>
  </div>

  <RouterView/>

  <BaseDialog
    v-model="showAddUserDialog"
    title="Add new user"
    @save="saveUser"
    @close-dialog="showAddUserDialog = false"
  >
    <v-form ref="form">
      <v-text-field
        v-model="userName"
        label="Add user name"
        counter
        :rules="[...requiredValidationRules, ...maxLengthValidationRules(50), ...minLengthValidationRules()]"
      />
    </v-form>
  </BaseDialog>
</template>
