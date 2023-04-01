<script setup>
import { onMounted } from 'vue';
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import { useLocalStorage } from '@/composables/useLocalStorage.js';
import { useUsersStore } from '@/stores/useUsersStore.js';
import { useRequestsStore } from '@/stores/useRequestsStore.js';

const usersStore = useUsersStore();
const requestsStore = useRequestsStore();

const { getUsers, getRequests } = useLocalStorage();

onMounted(() => {
  const users = getUsers();
  const requests = getRequests();

  requestsStore.setRequests(!requests ? [] : requests);

  if (!users) {
    usersStore.setUsers([]);
  } else {
    usersStore.setUsers(users);
  }
});
</script>

<template>
  <v-card elevation="0">
    <v-layout>
      <v-app-bar color="primary">
        <HeaderLayout/>
      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
