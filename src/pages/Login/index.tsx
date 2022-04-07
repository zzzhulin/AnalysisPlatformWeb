import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { history, useIntl, useModel } from 'umi';
import type { LoginParams } from './data';
import { login } from './service';
import logo from '../../assets/login/logo.png';
import company from '../../assets/login/company.png';
import user from '../../assets/login/user.png';
import password from '../../assets/login/password.png';
import styles from './index.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: LoginParams) => {
    try {
      // 登录
      const res = await login({ ...values });
      if (res.Code === 0) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      console.log(res);
      // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    await handleSubmit(values as LoginParams);
  };

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <a href="http://www.berryoncology.com" target={'_blank'} rel="noreferrer">
            <img alt="logo" src={logo} />
          </a>
        </div>
        <div className={styles.company}>
          <img alt="logo" src={company} />
        </div>
        <Form className={styles.loginForm} name="login" onFinish={onFinish} autoComplete="off">
          <Form.Item name="userid" rules={[{ required: true, message: '请输入账号!' }]}>
            <Input bordered={false} prefix={<img src={user} />} placeholder="请输入账号" />
          </Form.Item>

          <Form.Item name="Password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password
              bordered={false}
              prefix={<img src={password} />}
              visibilityToggle={false}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
