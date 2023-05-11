// 数组扁平化
export const flatten = (arr) => {
  let ls = [...arr];
  return ls.reduce((prev, next) => {
    return prev.concat(next.children ? flatten(next.children) : next);
  }, []);
};

// 数组去重-菜单扁平化后去重
export const uniqueArray = (arr) => {
  let newKeyArr = [];
  return arr.reduce((newArr, next) => {
    if (!newKeyArr.includes(next.key)) {
      newKeyArr.push(next.key);
      newArr.push(next);
    }
    return newArr;
  }, []);
};

// 路由
export const initRouterArr = (arr) => {
  return uniqueArray(flatten(arr));
};
