import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage.js';
import { useRequestsStore } from '@/stores/useRequestsStore.js';

const { setUsers } = useLocalStorage();

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
  }),

  actions: {
    setUsers(users) {
      this.users = users;
    },

    addUser(user) {
      const updatedUsers = [user, ...this.users];

      this.users = updatedUsers;
      setUsers(updatedUsers);
    },

    deleteUser(id) {
      const requestsStore = useRequestsStore();

      const updatedUsers = this.users.filter((user) => user.id !== id);

      this.users = updatedUsers;
      setUsers(updatedUsers);

      if (!this.users.length) {
        requestsStore.deleteAllRequest();
      }
    },
  },

  getters: {
    isNoUsers: ({ users }) => {
      return !users.length;
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
