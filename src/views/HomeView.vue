<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/useUsersStore.js';
import AddUserDialog from '@/components/AddUserDialog.vue';

const usersStore = useUsersStore();

const showAddUserDialog = ref(false);
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

  <AddUserDialog
    v-model="showAddUserDialog"
  />
</template>
