<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isShowBtns = ref(true);

watch(
  () => route,
  (val) => {
    isShowBtns.value = val.name !== 'order' && val.name !== 'deliver';
  },
  { deep: true, immediate: true },
);

const handleBtnClick = (type) => {
  router.push(`/${route.params.id}/create/${type}`);
};
</script>

<template>
  <div
    v-if="isShowBtns"
    class="d-flex align-center justify-space-around"
  >
    <v-btn
      color="primary"
      @click="handleBtnClick('order')"
    >
      Order
    </v-btn>

    <v-btn
      color="primary"
      @click="handleBtnClick('deliver')"
    >
      Delivery
    </v-btn>
  </div>

  <RouterView/>
</template>
