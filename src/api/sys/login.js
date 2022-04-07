import request from '@/plugin/axios'
import fetch from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/api/auth/jwt/token',
    method: 'post',
    data,
    loading: {
      type: 'loading',
      options: {
        fullscreen: true,
        lock: true,
        text: '正在登陆...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      }
    }
  })
}

export function AccountLogout (token) {
  return request({
    url: '/api/auth/jwt/logout?token=' + token,
    method: 'delete',
    loading: {
      type: 'loading',
      options: {
        fullscreen: true,
        lock: true,
        text: '正在退出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      }
    }
  })
}

export function getCodeImg (data) {
  return request({
    url: '/api/auth/captcha',
    method: 'get'
  })
}

//注册
export function AccountSignUp (data) {
  return request({
    // url: '/api/auth/jwt/token',
    url: '/api/auth/jwt/signup',
    method: 'post',
    data,
    loading: {
      type: 'loading',
      options: {
        fullscreen: true,
        lock: true,
        text: '正在注册...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      }
    }
  })
}

// //获取个性化推荐歌曲列表
// export function GetPersonalizedSongList (){
//   // return request({
//   return fetch({
//     url: '/api/auth/music/personalized',
//     // url: '/api/auth/jwt/music/top',
//     method: 'get',
//     // params: query
//   })
// }
//
// //获取热门推荐歌曲列表
// export function GetTopSongList (){
//   // return request({
//   return fetch({
//     url: '/api/auth/music/top',
//     // url: '/api/auth/jwt/music/top',
//     method: 'get',
//     // params: query
//   })
// }
