
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/signup', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
