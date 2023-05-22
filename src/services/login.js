import request from './request';
export function getLogin(data) {
  return request.post(`${process.base_url.admin_url}login`, data);
}