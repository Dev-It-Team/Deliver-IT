/* Vue native */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
/* Other libraries */
// Element UI Library (https://element-plus.org/#/en-US)
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';

createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')
