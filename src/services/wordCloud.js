import request from './request';
export function getTechnical() {
  return request.get(`${process.base_url.admin_url}technology`);
}