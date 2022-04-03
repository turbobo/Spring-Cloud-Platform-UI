import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/',
  name: 'index',
  meta,
  redirect: { name: 'index-page1' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'page1', name: `${pre}page1`, component: () => import('@/pages/index/page1'), meta: { meta, title: '页面 1' } },
    { path: 'page2', name: `${pre}page2`, component: () => import('@/pages/index/page2'), meta: { meta, title: '页面 2' } },
    { path: 'page3', name: `${pre}page3`, component: () => import('@/pages/index/page3'), meta: { meta, title: '页面 3' } },
    { path: 'page4', name: `${pre}page4`, component: () => import('@/pages/index/page4'), meta: { meta, title: '页面 4' } }
  ])('index-')
}
