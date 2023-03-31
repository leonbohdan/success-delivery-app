<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AddUserDialog from '@/components/dialogs/AddUserDialog.vue';

const route = useRoute();
const router = useRouter();

const showAddUserDialog = ref(false);

const isUserChosen = computed(() => {
  return route.params.id;
});

const addRequest = () => {
  const updatedRoute = `/${route.params.id}/create`;

  router.push(updatedRoute);
};

const openAllRequests = () => {
  router.push('/requests');
};
</script>

<template>
  <v-container class="d-flex align-center">
    <v-toolbar-title style="cursor: pointer;" @click="openAllRequests">Success Delivery App</v-toolbar-title>

    <template v-if="isUserChosen">
      <v-btn @click="showAddUserDialog = true">
        Add user
      </v-btn>

      <v-btn @click="addRequest">
        Create request
      </v-btn>
    </template>
  </v-container>

  <AddUserDialog
    v-model="showAddUserDialog"
  />
</template>
