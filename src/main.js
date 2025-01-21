import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import globalComponents from './plugins/global-components';
import 'bootstrap/dist/js/bootstrap.js';
import globalDirective from './plugins/global-directive';
import dayjs from './plugins/dayjs';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(globalComponents);
app.use(router);
app.use(globalDirective);
app.use(dayjs);
app.use(createPinia());
app.mount('#app');
