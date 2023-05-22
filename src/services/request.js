// 引入依赖
import axios from "axios";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { loadingActions } from "../redux/actions/loadingActions";
import store from "../redux"
const { confirm } = Modal;
const request = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 500000, // 请求超时时间
});
// loading函数
// 记录请求次数
let needLoadingRequestCount = 0;
function startLoading() {
  store.dispatch(loadingActions(true))
}
function endLoading() {
  // 延迟500ms，防止网速特快加载中画面一闪而过
  setTimeout(function () {
    store.dispatch(loadingActions(false))
  }, 500);
}
// 打开loading
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
// 关闭loading
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
// request拦截器
request.interceptors.request.use(
  (config) => {
    // 打开loading
    showFullScreenLoading();
    const token = localStorage.getItem("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token; //请求头加上token
    }
    return config;
  },
  (error) => {
    // 关闭loading
    tryHideFullScreenLoading();
    // Do something with request error
    Promise.reject(error);
  }
);
// respone拦截器
request.interceptors.response.use(
  (response) => {
    // 关闭loading
    tryHideFullScreenLoading();
    const res = response.data.data;
    if (res.code === 401) {
      // 最后一次出弹框
      if (needLoadingRequestCount === 0) {
        confirm({
          icon: <ExclamationCircleOutlined />,
          content: `你已被登出，可以取消继续留在该页面，
          或者重新登录, 确定登出`,
          onOk() {
            // 返回登录页
            // ...做些事情
            // 为了重新实例化vue-router对象 避免bug
            window.location.href = "/";
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      }
      return Promise.reject(res.msg || "error");
    } else if(res.code === 200){
      return res;
    } else {
      message.error(res.msg);
      return Promise.reject(res.msg || "error");
    }
  },
  (error) => {
    // 关闭loading
    tryHideFullScreenLoading();
    message.error(error);
    return Promise.reject(error);
  }
);
export default request;
