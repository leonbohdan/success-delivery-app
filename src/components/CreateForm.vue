<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { generateUUID } from '@/helpers/id-generators.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { maxLengthValidationRules, minLengthValidationRules, requiredValidationRules } from '@/helpers/rules.js';
import { useRequestsStore } from '@/stores/useRequestsStore.js';

const requestsStore = useRequestsStore();

const route = useRoute();
const router = useRouter();

const fromCity = ref(null);
const toCity = ref(null);
const parcelType = ref(null);
const disputchDate = ref(new Date());
const description = ref(null);

const addRequestFormRef = ref(null);
const isOrderType = ref(false);

watch(
  () => route,
  (val) => {
    isOrderType.value = val.name === 'order';
  },
  { deep: true, immediate: true },
);

const handleSubmit = async () => {
  console.log('handleSubmit');

  const { valid } = await addRequestFormRef.value.validate();

  if (!valid) {
    console.error('Comment is not valid!');

    return;
  }

  const request = {
    id: generateUUID(),
    userId: route.params.id,
    requestType: route.name,
    from: fromCity.value,
    to: toCity.value,
    parcelType: parcelType.value,
    date: disputchDate.value,
    description: description.value,
  };

  requestsStore.addRequest(request);

  router.push(`/${route.params.id}/requests`);
};
</script>

<template>
  <v-sheet width="500" class="mx-auto mt-5 h-screen">
    <v-form
      ref="addRequestFormRef"
      fast-fail
      @submit.prevent="handleSubmit"
    >
      <v-text-field
        v-model="fromCity"
        label="From city"
        :rules="[...requiredValidationRules, ...minLengthValidationRules(), ...maxLengthValidationRules(50)]"
      />

      <v-text-field
        v-model="toCity"
        label="To city"
        :rules="[...requiredValidationRules, ...minLengthValidationRules(), ...maxLengthValidationRules(50)]"
      />

      <v-select
        v-if="isOrderType"
        v-model="parcelType"
        :items="['Gadgets', 'Drinks', 'Clothes', 'Medicines', 'Other']"
        label="Parcel type"
        clearable
      />

      <VueDatePicker
        v-model="disputchDate"
        :enable-time-picker="false"
        class="mb-6"
      />

      <v-textarea
        v-if="isOrderType"
        v-model="description"
        label="Description"
        clearable
      />

      <div class="d-flex">
        <v-spacer/>
        <v-btn
          type="submit"
          class="mt-2"
          color="primary"
          elevation="0"
        >
          Save
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
