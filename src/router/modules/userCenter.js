import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: false }   //需要验证

export default {
    path: '/userCenter',
    name: 'userCenter',
    meta,
    redirect: { name: 'userCenter-page1' },
    component: layoutHeaderAside,
    children: (pre => [
        { path: 'page1', name: `${pre}page1`, component: () => import('@/pages/userCenter/page1'), meta: { meta, title: '用户中心' } },
        // { path: 'page2', name: `${pre}page2`, component: () => import('@/pages/demo/page2'), meta: { meta, title: '热门推荐' } },
        // { path: 'page3', name: `${pre}page3`, component: () => import('@/pages/demo/page3'), meta: { meta, title: '页面 3' } },
        // { path: 'page4', name: `${pre}page4`, component: () => import('@/pages/demo/page4'), meta: { meta, title: '页面 4' } }
    ])('userCenter-')
}
