<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { generateUUID } from '@/helpers/id-generators.js';
import { format } from 'date-fns';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { maxLengthValidationRules, minLengthValidationRules, requiredValidationRules } from '@/helpers/rules.js';
import { useRequestsStore } from '@/stores/useRequestsStore.js';

const requestsStore = useRequestsStore();

const route = useRoute();
const router = useRouter();

const props = defineProps({
  minWidth: {
    type: Number,
    default: 500,
  },
  requestId: {
    type: String,
    default: null,
  },
});

const emits = defineEmits(['save-request']);

const fromCity = ref(null);
const toCity = ref(null);
const parcelType = ref(null);
const dispatchDate = ref(format(new Date(), 'yyyy-MM-dd'));
const description = ref(null);

const addRequestFormRef = ref(null);
const isOrderType = ref(false);
const loadingBtn = ref(false);
const editedRequest = ref(null);

onMounted(async () => {
  if (props.requestId) {
    const request = await requestsStore.getRequest(props.requestId);

    editedRequest.value = request;

    isOrderType.value = request.requestType === 'order';

    fromCity.value = request.from;
    toCity.value = request.to;
    parcelType.value = request.parcelType;
    dispatchDate.value = request.date;
    description.value = request.description;
  }
});

watch(
  () => route,
  (val) => {
    isOrderType.value = val.name === 'order';
  },
  { deep: true, immediate: true },
);

const handleSubmit = async () => {
  const { valid } = await addRequestFormRef.value.validate();

  if (!valid) {
    console.error('Comment is not valid!');

    return;
  }

  loadingBtn.value = true;

  if (props.requestId) {
    const updatedRequest = {
      ...editedRequest.value,
      from: fromCity.value,
      to: toCity.value,
      parcelType: parcelType.value,
      date: dispatchDate.value,
      description: description.value,
    };

    await requestsStore.updateRequest(updatedRequest);
  } else {
    const request = {
      id: generateUUID(),
      userId: route.params.id,
      requestType: route.name,
      from: fromCity.value,
      to: toCity.value,
      parcelType: parcelType.value,
      date: dispatchDate.value,
      description: description.value,
    };

    await requestsStore.addRequest(request);
  }

  setTimeout(() => {
    loadingBtn.value = false;

    emits('save-request');

    if (!props.requestId) {
      router.push(`/${route.params.id}/requests`);
    }
  }, 500);
};

const saveBtn = computed(() => {
  return props.requestId ? 'Edit' : 'Save';
});
</script>

<template>
  <v-sheet
    :min-width="minWidth"
    max-width="500"
    :class="['mx-auto h-100', requestId ? 'mb-3' : 'mt-5']"
  >
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
        v-model="dispatchDate"
        :min-date="new Date()"
        model-type="yyyy-MM-dd"
        :enable-time-picker="false"
        :teleport="true"
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
          :loading="loadingBtn"
          class="mt-2"
          color="primary"
          elevation="0"
        >
          {{ saveBtn }}
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
