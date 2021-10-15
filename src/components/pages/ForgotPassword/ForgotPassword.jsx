import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForgotPassword from './ForgotPassword.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { forgotPassword } from '../../../utils/auth';

function ForgotPassword() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const history = useHistory();
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let passwordReset = useCallback(
    (e) => {
      e.preventDefault();
      forgotPassword(form.email)
        .then((data) => {
          if (data.success) {
            history.replace({ pathname: '/reset-password' });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [form]
  );

  return (
    <div className={stylesForgotPassword.main}>
      <form className={stylesForgotPassword.form + ' mb-20'}>
        <h1
          className={
            stylesForgotPassword.heading + ' text text_type_main-large mb-6'
          }
        >
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <EmailInput
            value={form.email}
            name="email"
            placeholder="Укажите e-mail"
            onChange={onChange}
          />
        </div>
        <Button onClick={passwordReset} primary={true}>
          Восстановить
        </Button>
      </form>
      <div className={stylesForgotPassword.footerLine}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?
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

export default ForgotPassword;