import request from './request';
export function getMap() {
  return request.get(`${process.base_url.admin_url}map`);
}