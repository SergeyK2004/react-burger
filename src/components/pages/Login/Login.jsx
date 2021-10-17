import React, { useState, useCallback } from 'react';
import {
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../../services/actions/authActions';
import stylesLogin from './Login.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
// import { LOGIN_USER } from '../../services/actions';

function Login(props) {
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  let location = useLocation();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let loginListener = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [form]
  );

  if (auth) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={location.state?.from || '/'}
      />
    );
  }

  return (
    <div className={stylesLogin.main}>
      <form className={stylesLogin.form + ' mb-20'}>
        <h1 className={stylesLogin.heading + ' text text_type_main-large mb-6'}>
          Вход
        </h1>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name={'email'} onChange={onChange} />
        </div>
        <div className={'mb-6'}>
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <Button onClick={loginListener} primary={true}>
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
