<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import { useLocalStorage } from '@/composables/useLocalStorage.js';
import { useUsersStore } from '@/stores/useUsersStore.js';
import { useRequestsStore } from '@/stores/useRequestsStore.js';

const usersStore = useUsersStore();
const requestsStore = useRequestsStore();

const router = useRouter();

const { getUsers, getRequests } = useLocalStorage();
const { setRequests } = useLocalStorage();

onMounted(() => {
  const requestObj = [{
    id: 'sdfs7878sfsfd98sf',
    userId: 'asfkxvbotywbc8778',
    name: 'Frenk',
    requestType: 'order',
    from: 'Ivano-Frankivsk',
    to: 'Kiev',
    parcelType: 'Medicaments',
    date: '2023-04-23',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, omnis',
  },{
    id: 'sd1238jknmfd98sf',
    userId: 'erwllxlxlllx',
    name: 'Dayvin',
    requestType: 'deliver',
    from: 'Lviv',
    to: 'Kharkiv',
    parcelType: null,
    date: '2023-04-13',
    description: null,
  }];

  setRequests(requestObj);
  // setUsers([{ name: 'Step', id: 'sfdsd7s88sdf87s' }]);
  const users = getUsers();
  const requests = getRequests();

  requestsStore.setRequests(!requests ? [] : requests);

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
