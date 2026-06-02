import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/san-pham', name: 'products', component: () => import('@/views/ProductsView.vue') },
    { path: '/san-pham/:slug', name: 'product-detail', component: () => import('@/views/ProductDetailView.vue') },
    { path: '/dich-vu', name: 'services', component: () => import('@/views/ServicesView.vue') },
    { path: '/dich-vu/:slug', name: 'service-detail', component: () => import('@/views/ServiceDetailView.vue') },
    { path: '/chi-nhanh', name: 'branches', component: () => import('@/views/BranchesView.vue') },
    { path: '/tin-tuc', name: 'articles', component: () => import('@/views/ArticlesView.vue') },
    { path: '/tin-tuc/:slug', name: 'article-detail', component: () => import('@/views/ArticleDetailView.vue') },
    { path: '/lien-he', name: 'contact', component: () => import('@/views/ContactView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
  ],
});

router.afterEach((to) => {
  const titleMap: Record<string, string> = {
    home: 'Shinwa Pro Garage',
    products: 'Sản phẩm | Shinwa Pro Garage',
    services: 'Dịch vụ | Shinwa Pro Garage',
    branches: 'Chi nhánh | Shinwa Pro Garage',
    articles: 'Tin tức | Shinwa Pro Garage',
    contact: 'Liên hệ | Shinwa Pro Garage',
  };
  document.title = titleMap[String(to.name)] ?? 'Shinwa Pro Garage';
});

export default router;
