<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'; 

const route = useRoute();

const isUserChosen = computed(() => {
  return route.params.id;
});
</script>

<template>
  <v-container class="d-flex align-center">
    <v-toolbar-title>Success Delivery App</v-toolbar-title>

    <template v-if="isUserChosen">
      <v-btn>Add user</v-btn>

      <v-btn>Create request</v-btn>
    </template>
  </v-container>
</template>
