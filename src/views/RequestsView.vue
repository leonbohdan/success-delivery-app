<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import RequestsList from '@/components/lists/RequestsList.vue';
import UsersList from '@/components/lists/UsersList.vue';

const route = useRoute();

const tab = ref('requests');

onMounted(() => {
  if (route.query.tab === 'users') {
    tab.value = route.query.tab;
  }
});

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
