import { createRouter, createWebHistory } from 'vue-router';
import { useUsersStore } from '@/stores/useUsersStore.js';
import HomeView from '@/views/HomeView.vue';
import RequestsView from '@/views/RequestsView.vue';
import CreateView from '@/views/CreateView.vue';
import CreateForm from '@/components/CreateForm.vue';
import UserRequestsLists from '@/components/lists/UserRequestsLists.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: ':id',
          name: 'id',
          redirect: (to) => {
            return { path: `${to.params.id}/requests` };
          },
          children: [
            {
              path: 'requests',
              name: 'user-requests',
              component: UserRequestsLists,
            },
            {
              path: 'create',
              name: 'create',
              component: CreateView,
              children: [
                {
                  path: 'order',
                  name: 'order',
                  component: CreateForm,
                }, {
                  path: 'deliver',
                  name: 'deliver',
                  component: CreateForm,
                },
              ],
            },
          ],
        },
      ],
    }, {
      path: '/requests',
      name: 'requests',
      component: RequestsView,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const usersStore = useUsersStore();

  if (usersStore.isNoUsers && to.name !== 'home') {
    return next({ name: 'home' });
  } else if (
    !usersStore.isNoUsers
    && to.name !== 'id'
    && to.name !== 'user-requests'
    && to.name !== 'requests'
    && to.name !== 'order'
    && to.name !== 'deliver'
    && to.name !== 'create'
    && from.name !== 'requests'
    && to.name !== 'home'
  ) {
    return next({ path: `${to.params.id}/requests` });
  } else if (!usersStore.isNoUsers && to.name === 'home') {
    return next({ name: 'requests' });
  } else {
    return next();
  }
});

export default router;
