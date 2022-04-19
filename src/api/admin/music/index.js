import fetch from '@/plugin/axios'
import request from "@/plugin/axios";

export function page (query) {
  return fetch({
    url: '/api/auth/music/page',
    // url: '/api/auth/jwt/music/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return fetch({
    // url: '/api/admin/user',
    url: '/api/auth/music/add',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return fetch({
    // url: '/api/admin/user/' + id,
    url: '/api/auth/music/getSong/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return fetch({
    //物理删除接口
    // url: '/api/admin/user/' + id,

    //逻辑删除
    url: '/api/auth/music/logicDelete/' + id,
    method: 'delete'
  })
}

export function putObj (id, obj) {
  return fetch({
    url: '/api/auth/music/update',
    method: 'put',
    data: obj
  })
}


export function getUserInfo () {
  return request({
    url: '/api/admin/user/v2/front/info',
    method: 'get'
  })
}

//获取个性化推荐歌曲列表
export function GetPersonalizedSongList (query){
  // return request({
  return fetch({
    url: '/api/auth/music/personalized',
    // url: '/api/auth/jwt/music/top',
    method: 'get',
    params: query
  })
}

export function GetPersonalizedListAll (){
  return fetch({
    url: '/api/auth/music/personalizedAll',
    // url: '/api/sample/music/topDuration',
    // url: '/api/auth/jwt/music/top',
    method: 'get',
    // params: query
  })
}

//获取热门推荐歌曲列表
export function GetTopSongList (){
  // return request({
  return fetch({
    url: '/api/auth/music/top',
    // url: '/api/sample/music/top',
    // url: '/api/auth/jwt/music/top',
    method: 'get',
    // params: query
  })
}

//获取热门推荐歌曲列表+歌曲时长
export function GetTopSongListAndDuration (){
  // return request({
  return fetch({
    url: '/api/auth/music/topDuration',
    // url: '/api/sample/music/topDuration',
    // url: '/api/auth/jwt/music/top',
    method: 'get',
    // params: query
  })
}

//获取相似歌曲列表+歌曲时长
export function GetSimilarListBootJs (query){
  return fetch({
    url: '/api/auth/music/similarList',
    // url: '/api/sample/music/similarList',
    // url: '/api/auth/jwt/music/top',
    method: 'get',
    params: query
  })
}

