import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import sty from "./index.module.css";
import { getLogin } from "../../services/login"
const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const info = JSON.parse(userInfo)
      if (info.remember) {
        form.setFieldsValue(JSON.parse(userInfo));
      }
    }
  }, []);
  const onFinish = (values) => {
    if (values.username !== "admin" || values.password !== "123456") {
      return message.error("账号或密码错误");
    }
    getLogin(values).then((res) => {
      let token =res.data;
      localStorage.setItem("token", token.token);
      localStorage.setItem("menu", JSON.stringify(res.data.menu));
      localStorage.setItem("userInfo", JSON.stringify(values));
      navigate("/");
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const checkName = (_, value) => {
    if (value) {
      if (value.length > 3) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("用户名必须大于三位"));
      }
    } else {
      return Promise.reject(new Error("请输入用户名"));
    }
  };
  const checkPwd = (_, value) => {
    if (value) {
      if (value.length >= 6) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("密码必须大于等于六位"));
      }
    } else {
      return Promise.reject(new Error("请输入密码"));
    }
  };
  return (
    <div className={classNames(sty.login_wrapper)}>
      <Card>
        <div className={classNames(sty.login_title)}>小小愿望</div>
        <Form
          form={form}
          name="basic"
          className={classNames(sty.login_form)}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                validator: checkName,
              },
            ]}
          >
            <Input placeholder="Username: admin" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                validator: checkPwd,
              },
            ]}
          >
            <Input.Password placeholder="Password: 123456" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              className={classNames(sty.login_submit)}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default LoginPage;
