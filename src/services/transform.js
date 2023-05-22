import request from './request';
export function getTransform() {
  return request.get(`${process.base_url.admin_url}transform`);
}