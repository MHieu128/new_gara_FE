import { createRouter, createWebHistory } from 'vue-router';
import { getAuthToken } from '@/repositories/apiClient';

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
    { path: '/admin/login', name: 'admin-login', component: () => import('@/views/admin/AdminLoginView.vue'), meta: { admin: true } },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayoutView.vue'),
      meta: { admin: true, requiresAuth: true },
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('@/views/admin/AdminDashboardView.vue') },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'products' },
        },
        {
          path: 'product-categories',
          name: 'admin-product-categories',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'productCategories' },
        },
        {
          path: 'services',
          name: 'admin-services',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'services' },
        },
        {
          path: 'service-categories',
          name: 'admin-service-categories',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'serviceCategories' },
        },
        {
          path: 'branches',
          name: 'admin-branches',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'branches' },
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'articles' },
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'users' },
        },
        { path: 'leads', name: 'admin-leads', component: () => import('@/views/admin/AdminLeadsView.vue') },
        {
          path: 'bookings',
          name: 'admin-bookings',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'bookings' },
        },
        {
          path: 'customers',
          name: 'admin-customers',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'customers' },
        },
        {
          path: 'vehicles',
          name: 'admin-vehicles',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'vehicles' },
        },
        {
          path: 'quotations',
          name: 'admin-quotations',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'quotations' },
        },
        {
          path: 'job-cards',
          name: 'admin-job-cards',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'jobCards' },
        },
        {
          path: 'invoices',
          name: 'admin-invoices',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'invoices' },
        },
        {
          path: 'warranties',
          name: 'admin-warranties',
          component: () => import('@/views/admin/AdminResourceView.vue'),
          meta: { admin: true, requiresAuth: true, resource: 'warranties' },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !getAuthToken()) {
    return { name: 'admin-login' };
  }

  if (to.name === 'admin-login' && getAuthToken()) {
    return { name: 'admin-dashboard' };
  }

  return true;
});

router.afterEach((to) => {
  const titleMap: Record<string, string> = {
    home: 'Shinwa Pro Garage',
    products: 'Sản phẩm | Shinwa Pro Garage',
    services: 'Dịch vụ | Shinwa Pro Garage',
    branches: 'Chi nhánh | Shinwa Pro Garage',
    articles: 'Tin tức | Shinwa Pro Garage',
    contact: 'Liên hệ | Shinwa Pro Garage',
    'admin-login': 'Admin Login | Shinwa Pro Garage',
    'admin-dashboard': 'Admin Dashboard | Shinwa Pro Garage',
    'admin-products': 'Admin Products | Shinwa Pro Garage',
    'admin-product-categories': 'Admin Product Categories | Shinwa Pro Garage',
    'admin-services': 'Admin Services | Shinwa Pro Garage',
    'admin-service-categories': 'Admin Service Categories | Shinwa Pro Garage',
    'admin-branches': 'Admin Branches | Shinwa Pro Garage',
    'admin-articles': 'Admin Articles | Shinwa Pro Garage',
    'admin-users': 'Admin Users | Shinwa Pro Garage',
    'admin-leads': 'Admin Leads | Shinwa Pro Garage',
    'admin-bookings': 'Admin Bookings | Shinwa Pro Garage',
    'admin-customers': 'Admin Customers | Shinwa Pro Garage',
    'admin-vehicles': 'Admin Vehicles | Shinwa Pro Garage',
    'admin-quotations': 'Admin Quotations | Shinwa Pro Garage',
    'admin-job-cards': 'Admin Job Cards | Shinwa Pro Garage',
    'admin-invoices': 'Admin Invoices | Shinwa Pro Garage',
    'admin-warranties': 'Admin Warranties | Shinwa Pro Garage',
  };
  document.title = titleMap[String(to.name)] ?? 'Shinwa Pro Garage';
});

export default router;
