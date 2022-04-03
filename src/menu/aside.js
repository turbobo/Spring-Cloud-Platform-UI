// 菜单 侧边栏
export default [
    {
    path: '/index', title: '首页', icon: 'home'
  },
  {
    path: '/demo',
    title: '推荐页面',
    // icon: 'folder-o',
    icon: 'music',
    children: [
      { path: '/demo/page1', title: '个性推荐' },
      { path: '/demo/page2', title: '热门推荐' },
      // { path: '/demo/page3', title: '页面 3' },
      // {
      //   title: 'page4',
      //   children: [
      //     { path: '/demo/page4', title: 'page4' }
      //   ]
      // }
    ]
  }
]
