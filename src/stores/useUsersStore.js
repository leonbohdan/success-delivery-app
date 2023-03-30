import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage.js';

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
  },

  getters: {
    isNoUsers: ({ users }) => {
      return !users.length;
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
