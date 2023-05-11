// index.js
import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.scss";
import transform_icon from "../../assets/transform/transform_icon.png";
import transform_bg from "../../assets/transform/transform_bg.jpeg";
Storage.prototype.setExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire,
  };
  //localStorage 设置的值不能为对象,转为json字符串
  localStorage.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getExpire = (key) => {
  let val = localStorage.getItem(key);
  if (!val) {
    return val;
  }
  val = JSON.parse(val);
  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
};
const Transform = () => {
  let storage = localStorage.getExpire(`floatFlag`);
  if (storage === "false" || storage === false) {
    storage = false;
  } else {
    storage = true;
  }
  const [floatFlag, setFloatFlag] = useState(storage);
  // burst
  const [showBurst, setShowBurst] = useState(false);
  // burst path
  const [pathBurst, setPathBurst] = useState("");
  // burst time
  const [timeBurst, setTimeBurst] = useState("");
  const [showFloat, setShowFloat] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [floatList, setFloatList] = useState([]);
  const [tableList, setTableList] = useState([]);
  useEffect(() => {
    getTableList();
  }, []);
  useEffect(() => {
    initStyle();
  }, [tableList]);
  const getTableList = () => {
    let list = [
      {
        showoption: "btn",
        starttime: "2022-09-03",
        endtime: "2023-09-03",
        imagaddress: [
          {
            path: transform_icon,
          },
        ],
      },
      {
        showoption: "burst",
        starttime: "2022-09-03",
        endtime: "2023-09-03",
        imagaddress: [
          {
            path: transform_bg,
          },
        ],
      },
      {
        showoption: "float",
        starttime: "2022-09-03",
        endtime: "2023-09-03",
        imagaddress: [
          {
            path: transform_icon,
          },
          {
            path: transform_icon,
          },
        ],
      },
      {
        showoption: "header",
        starttime: "2022-09-03",
        endtime: "2023-09-03",
        imagaddress: [
          {
            path: transform_bg,
          },
        ],
      },
    ];
    setTableList(list);
  };
  // 获取七条数据
  const initList = (data, cb) => {
    if (data && data.length < 7) {
      let dt = data.concat(data);
      initList(dt, cb);
    } else {
      cb(data.slice(0, 7));
    }
  };
  const add0 = (m) => {
    return m < 10 ? "0" + m : m;
  };
  const initStyle = () => {
    try {
      let tableLs = JSON.parse(JSON.stringify(tableList));
      let resDt = [];
      let time = new Date();
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var H = time.getHours();
      var FEN = time.getMinutes();
      var Miao = time.getSeconds();
      let newDe = moment(
        `${y}-${add0(m)}-${add0(d)} ${add0(H)}:${add0(FEN)}:${add0(Miao)}`
      ).format("YYYY-MM-DD HH:mm:ss");
      for (let index = 0; index < tableLs.length; index++) {
        const element = tableLs[index];
        let strDe = moment(`${element.starttime} 00:00:00`).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let endDe = moment(`${element.endtime} 23:59:59`).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (
          moment(strDe).isBefore(moment(newDe)) &&
          moment(newDe).isBefore(moment(endDe))
        ) {
          resDt.push(element);
          // break;
        }
      }
      if (resDt && resDt.length > 0) {
        for (let idx = 0; idx < resDt.length; idx++) {
          const element = resDt[idx];
          if (element.showoption === "float") {
            let str = element.imagaddress;
            let list = [];
            initList(str, (dt) => {
              list = dt;
            });
            setShowFloat(true);
            setShowBtn(true);
            setFloatList(list);
          } else if (element.showoption === "btn") {
            let strBtn = element.imagaddress[0].path;
            let sty = `
              .ant-btn::before {
                  content: " ";
                  display: block;
                  background: url(${strBtn}) no-repeat!important;
                  background-size: 20px !important;
                  height: 100%;
                  width: 100%;
                  position: absolute;
                  top: -10px;
                  left: -10px;
                  opacity: 1;
              }
              `;
            loadStyleString(sty);
          } else if (element.showoption === "burst") {
            let tmZl = `${y}-${add0(m)}-${add0(d)}`;
            let flag = true;
            if (localStorage.getExpire(`timeBurstLocal`) === `${tmZl}`) {
              flag = false;
            }
            setShowBurst(flag);
            setPathBurst(element.imagaddress[0].path);
            setTimeBurst(tmZl);
          } else if (element.showoption === "header") {
            let strH = element.imagaddress[0].path;
            let styH = `
              .ant-pro-global-header {
                background-image: url(${strH});
                background-repeat: no-repeat;
                background-size: cover;
                // opacity: 0.8;
              }
              `;
            loadStyleString(styH);
          }
        }
      } else {
        setShowFloat(false);
        setShowBtn(false);
        setFloatFlag(false);
        setFloatList([]);
      }
    } catch (error) {
      setShowFloat(false);
      setShowBtn(false);
      setFloatFlag(false);
      setFloatList([]);
      console.log(error);
    }
  };
  const loadStyleString = (css) => {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
      style.appendChild(document.createTextNode(css));
    } catch (ex) {
      style.styleSheet.cssText = css; //兼容IE
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  };
  // burst关闭
  const CloseBurst = () => {
    setShowBurst(false);
    // 有效期两天
    localStorage.setExpire(`timeBurstLocal`, `${timeBurst}`, 86400000 * 2);
  };
  // 调用示例
  // loadStyleString("body{background-color:red}");
  const selectHtml = () => {
    if (showFloat && floatFlag) {
      return (
        <React.Fragment>
          {floatList
            ? floatList.map((item, index) => {
                let width = Math.round(Math.random() * 20 + 30);
                return (
                  <div key={index} className={`animation${index + 1}`}>
                    <img alt="图片" width={width} src={item.path} />
                  </div>
                );
              })
            : ""}
        </React.Fragment>
      );
    } else {
      return null;
    }
  };
  // 调用示例
  const selectHtmlBurst = () => {
    var tempHeightRight = document.documentElement.clientHeight - 100;
    if (showBurst && pathBurst) {
      return (
        <React.Fragment>
          <div
            onClick={() => {
              CloseBurst();
            }}
            className="shadeWrapper"
            style={{ cursor: "pointer" }}
          >
            <div
              onClick={() => {
                CloseBurst();
              }}
              className="shadeClose"
            >
              <CloseCircleOutlined />
            </div>
            <div>
              <img
                alt="图片"
                style={{ maxHeight: tempHeightRight }}
                src={pathBurst}
              />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };
  // 开启/关闭特效
  const switchCheck = (e) => {
    // 有效期七天
    localStorage.setExpire(`floatFlag`, e, 86400000 * 7);
    setFloatFlag(e);
  };
  return (
    <React.Fragment>
      {showBtn ? (
        <div
          style={{
            display: "inline-block",
            position: "fixed",
            top: "23px",
            right: "200px",
            zIndex: "31",
          }}
        >
          <Switch
            checkedChildren="关闭特效"
            unCheckedChildren="开启特效"
            checked={floatFlag}
            onChange={(e) => switchCheck(e)}
          />
        </div>
      ) : null}
      {selectHtmlBurst()}
      {selectHtml()}
    </React.Fragment>
  );
};
export default Transform;
