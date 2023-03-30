<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import { useLocalStorage } from '@/composables/useLocalStorage.js';
import { useUsersStore } from '@/stores/useUsersStore.js';

const usersStore = useUsersStore();

const router = useRouter();

const { getUsers } = useLocalStorage();
// const { setUsers } = useLocalStorage();

onMounted(() => {
  // setUsers([{ name: 'Step', id: 'sfdsd7s88sdf87s' }]);
  const users = getUsers();

  if (!users) {
    usersStore.setUsers([]);
  } else {
    usersStore.setUsers(users);
    router.push('/requests');
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
