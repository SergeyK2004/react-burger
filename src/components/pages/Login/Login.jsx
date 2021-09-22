import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesLogin from './Login.module.css';

function Login({ regForm = true }) {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  let winName, buttonName;
  if (regForm) {
    winName = 'Регистрация';
    buttonName = 'Зарегистрироваться';
  } else {
    winName = 'Вход';
    buttonName = 'Войти';
  }

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
    <div>
      <form className={stylesLogin.form}>
        <h1 className={stylesLogin.heading}>{winName}</h1>
        {regForm && (
          <Input
            placeholder="Email"
            value={form.email}
            name="Логин"
            onChange={onChange}
          />
        )}
        <Input
          placeholder="Email"
          value={form.email}
          name="Логин"
          onChange={onChange}
        />
        <PasswordInput
          placeholder="Пароль"
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <Button onClick={login} primary={true}>
          {buttonName}
        </Button>
      </form>
    </div>
  );
}

export default Login;
