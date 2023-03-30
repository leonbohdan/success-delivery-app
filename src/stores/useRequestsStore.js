import { defineStore, acceptHMRUpdate } from 'pinia';

export const useRequestsStore = defineStore('requestsStore', {
  state: () => ({ 
    requests: [],
  }),

  actions: {
    setRequests() {
      this.requests = [];
    },
  },

  getters: {},
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRequestsStore, import.meta.hot));
