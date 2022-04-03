import fetch from '@/plugin/axios'

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
