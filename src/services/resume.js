import request from './request';
export function getTechnical(data) {
  return request.get('https://mock.mengxuegu.com/mock/6401ec757c016026ff2b9594/resume/chartData', data);
}