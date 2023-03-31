<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  console.log('route', route.name);
  console.log('router', router);
});
</script>

<template>
  <div>Create Form</div>
</template>
