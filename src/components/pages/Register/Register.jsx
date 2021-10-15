import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesRegister from './Register.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { Link } from 'react-router-dom';

function Register() {
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
    <div className={stylesRegister.main}>
      <form className={stylesRegister.form + ' mb-20'}>
        <h1
          className={stylesRegister.heading + ' text text_type_main-large mb-6'}
        >
          Регистрация
        </h1>
        <div className={'mb-6'}>
          <Input
            placeholder="Имя"
            value={form.name}
            name="name"
            onChange={onChange}
          />
        </div>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name="email" onChange={onChange} />
        </div>
        <div className={'mb-6'}>
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <Button onClick={login} primary={true}>
          Зарегистрироваться
        </Button>
      </form>
      <div className={stylesRegister.footerLine}>
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

export default Register;
