import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForgotPassword from './ForgotPassword.module.css';
import stylesGlobal from '../../../utils/global.module.css';

function ForgotPassword() {
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
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name="Логин" onChange={onChange} />
        </div>
        <Button onClick={login} primary={true}>
          Восстановить
        </Button>
      </form>
      <div className={stylesLogin.footerLine}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?
        </p>
        <a
          href="#"
          className={stylesGlobal.link + ' text text_type_main-default ml-2'}
        >
          Войти
        </a>
      </div>
    </div>
  );
}

export default ForgotPassword;
