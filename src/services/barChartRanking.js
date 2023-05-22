import request from './request';
export function getRanking() {
  return request.get(`${process.base_url.admin_url}ranking`);
}