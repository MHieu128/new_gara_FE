import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router';
import './style.css';
import { loadSiteConfig } from '@/config/siteConfig';

async function bootstrap() {
  await loadSiteConfig();
  createApp(App).use(router).mount('#app');
}

bootstrap();
