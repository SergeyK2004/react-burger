import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesLogin from './Login.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { Link } from 'react-router-dom';

function Login() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    (e) => {
      e.preventDefault();
      //   auth.signIn(form);
    },
    [form]
  );

  return (
    <div className={stylesLogin.main}>
      <form className={stylesLogin.form + ' mb-20'}>
        <h1 className={stylesLogin.heading + ' text text_type_main-large mb-6'}>
          Вход
        </h1>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name="Логин" onChange={onChange} />
        </div>
        <div className={'mb-6'}>
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <Button onClick={login} primary={true}>
          Войти
        </Button>
      </form>
      <div className={stylesLogin.footerLine}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={stylesGlobal.link + ' text text_type_main-default ml-2'}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={stylesLogin.footerLine + ' mt-4'}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={stylesGlobal.link + ' text text_type_main-default ml-2'}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}

export default Login;
