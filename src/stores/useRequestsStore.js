import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage.js';

const { setRequests } = useLocalStorage();

export const useRequestsStore = defineStore('requestsStore', {
  state: () => ({ 
    requests: [],
  }),

  actions: {
    setRequests(requests) {
      this.requests = requests;
    },

    addRequest(request) {
      const updatedRequests = [request, ...this.requests];

      this.users = updatedRequests;
      setRequests(updatedRequests);
    },

    deleteRequest(id) {
      const updatedRequests = this.requests.filter((request) => request.id !== id);

      this.requests = updatedRequests;
      setRequests(updatedRequests);
    },
  },

  getters: {},
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRequestsStore, import.meta.hot));
