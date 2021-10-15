import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesResetPassword from './ResetPassword.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../../utils/auth';

function ResetPassword() {
  const [form, setValue] = useState({ code: '', password: '' });
  const history = useHistory();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let passwordCreate = useCallback(
    (e) => {
      e.preventDefault();
      resetPassword(form.password, form.code)
        .then((data) => {
          if (data.success) {
            history.replace({ pathname: '/' });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [form]
  );

  return (
    <div className={stylesResetPassword.main}>
      <form className={stylesResetPassword.form + ' mb-20'}>
        <h1
          className={
            stylesResetPassword.heading + ' text text_type_main-large mb-6'
          }
        >
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
        <Button onClick={passwordCreate} primary={true}>
          Сохранить
        </Button>
      </form>
      <div className={stylesResetPassword.footerLine}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы?
        </p>
        <Link
          to="/login"
          className={stylesGlobal.link + ' text text_type_main-default ml-2'}
        >
          Войти
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
