<script setup>
import { ref } from 'vue';
import RequestsList from '@/components/RequestsList.vue';
import UsersList from '@/components/UsersList.vue';

const tab = ref('requests');

const items = [
  {
    title: 'Requests',
    value: 'requests',
  }, {
    title: 'Users',
    value: 'users',
  },
];
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="requests">
          <RequestsList/>
        </v-window-item>

        <v-window-item value="users">
          <UsersList/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
