import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RequestsView from '@/views/RequestsView.vue';
import CreateView from '@/views/CreateView.vue';
import CreateForm from "@/components/CreateForm.vue";
import UserRequests from "@/components/UserRequests.vue";

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
          redirect: to => {
            return { path: `${to.params.id}/requests` };
          },
          children: [
            {
              path: 'requests',
              component: UserRequests,
            },
            {
              path: 'create',
              component: CreateView,
              children: [
                {
                  path: 'order',
                  component: CreateForm,
                }, {
                  path: 'deliver',
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
    },
  ],
});

export default router;
