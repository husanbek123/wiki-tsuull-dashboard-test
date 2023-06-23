/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import styles from "./index.module.scss";
import SuccessToastify from "../../components/toastify/Success";
import { usePostData } from "../../utils/hooks/usePost";
import ErrorToastify from "../../components/toastify/Error";
import { useToken } from "../../utils/zustand/useStore";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.svg";
import { useTranslation } from "react-i18next";
export default function Login() {
  const useCheckUser = usePostData("/user/login", {});
  const setToken = useToken((state) => state.setToken);
  const setName = useToken((state) => state.setName);
  const navigator = useNavigate();
  const { t } = useTranslation();
  const onFinish = (values: any) => {
    useCheckUser.mutate(values, {
      onSuccess: (data) => {
        SuccessToastify(t("SuccessLogedIn"));
        setToken(data.data.token);
        setName(values.userName);
        navigator("/");
      },
      onError: () => {
        ErrorToastify();
      },
    });
  };

  const onFinishFailed = () => {
    ErrorToastify();
  };

  return (
    <div className={styles.Main}>
      <div className={styles.container}>
        <div className={styles.child}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="userName"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: "rgba(0, 0, 0, 0.623)",
                  width: "100%",
                }}
              >
                Enter
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.lastChild}>
          <img src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}
