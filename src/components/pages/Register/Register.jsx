import React, { useState, useCallback, useEffect } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesRegister from './Register.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { register } from '../../../services/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

function Register(props) {
  const history = useHistory();
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.authReducer.isAuthorized);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const registerListener = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form]
  );
  useEffect(() => {
    if (auth) {
      history.replace({ pathname: '/' });
    }
  }, [auth]);

  if (auth) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={props.state?.from || '/'}
      />
    );
  }

  return (
    <div className={stylesRegister.main}>
      <form
        onSubmit={registerListener}
        className={stylesRegister.form + ' mb-20'}
      >
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
        <Button type="primary">Зарегистрироваться</Button>
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
