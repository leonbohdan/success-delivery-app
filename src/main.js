import { createApp } from 'vue';
import { createPinia } from 'pinia'; 

import App from './App.vue';
import router from './router';

import '@mdi/font/css/materialdesignicons.css';
import './assets/main.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
