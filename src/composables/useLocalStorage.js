import localStorageService from '@/services/localStorage.service.js';
import { LOCAL_STORAGE_NAMES } from '@/constants/localStorage.constants.js'; 

export function useLocalStorage() {
  const getUsers = () => {
    return localStorageService.get(LOCAL_STORAGE_NAMES.Users);
  };

  const setUsers = (users) => {
    return localStorageService.set(LOCAL_STORAGE_NAMES.Users, users);
  };

  const removeUsers = () => {
    return localStorageService.remove(LOCAL_STORAGE_NAMES.Users);
  };

  const getRequests = () => {
    return localStorageService.get(LOCAL_STORAGE_NAMES.Requests);
  };

  const setRequests = (requests) => {
    return localStorageService.set(LOCAL_STORAGE_NAMES.Requests, requests);
  };

  const removeRequests = () => {
    return localStorageService.remove(LOCAL_STORAGE_NAMES.Requests);
  };

  return {
    getUsers,
    setUsers,
    removeUsers,
    getRequests,
    setRequests,
    removeRequests,
  };
}
