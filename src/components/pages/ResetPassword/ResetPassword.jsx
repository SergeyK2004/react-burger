import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesResetPassword from './ResetPassword.module.css';
import stylesGlobal from '../../../utils/global.module.css';

function ResetPassword() {
  const [form, setValue] = useState({ code: '', password: '' });

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
          <PasswordInput
            placeholder="Введите новый пароль"
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className={'mb-6'}>
          <Input
            placeholder="Введите код из письма"
            value={form.code}
            name="code"
            onChange={onChange}
          />
        </div>
        <Button onClick={login} primary={true}>
          Сохранить
        </Button>
      </form>
      <div className={stylesLogin.footerLine}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы?
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

export default ResetPassword;
