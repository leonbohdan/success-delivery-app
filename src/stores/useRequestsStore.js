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

    getRequest(id) {
      return this.requests.filter((request) => request.id === id)[0];
    },

    updateRequest(updatedRequest) {
      const updatedRequests = this.requests.map((request) => {
        if (updatedRequest.id === request.id) {
          return {
            ...request,
            ...updatedRequest,
          };
        }

        return request;
      });

      this.requests = updatedRequests;
      setRequests(updatedRequests);
    },

    addRequest(request) {
      const updatedRequests = [request, ...this.requests];

      this.requests = updatedRequests;
      setRequests(updatedRequests);
    },

    deleteRequest(id) {
      const updatedRequests = this.requests.filter((request) => request.id !== id);

      this.requests = updatedRequests;
      setRequests(updatedRequests);
    },

    deleteAllUserRequests(id) {
      const updatedRequests = this.requests.filter((request) => request.userId !== id);

      this.requests = updatedRequests;
      setRequests(updatedRequests);
    },

    deleteAllRequest() {
      this.requests = [];
      setRequests([]);
    },
  },

  getters: {},
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRequestsStore, import.meta.hot));
