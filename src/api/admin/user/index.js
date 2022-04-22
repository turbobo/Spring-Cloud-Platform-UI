import fetch from '@/plugin/axios'

export function page (query) {
  return fetch({
    // url: '/api/admin/user/page',
    url: '/api/admin/user/v2/single',
    method: 'get',
    params: query
  })
}

export function getSingleByUserName (query) {
  return fetch({
    // url: '/api/admin/user/page',
    url: '/api/admin/user/v2/single/username',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return fetch({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return fetch({
    //物理删除接口
    // url: '/api/admin/user/' + id,

    //逻辑删除
    url: '/api/auth/jwt/logic/' + id,
    method: 'delete'
  })
}

export function putObj (id, obj) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'put',
    data: obj
  })
}

export function updatePass (id, obj) {
  return fetch({
    url: '/api/admin/user/updatePass' + id,
    method: 'put',
    data: obj
  })
}
