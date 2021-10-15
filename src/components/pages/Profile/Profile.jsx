import React, { useState, useCallback } from 'react';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesProfile from './Profile.module.css';
import stylesGlobal from '../../../utils/global.module.css';
import { NavLink, Link } from 'react-router-dom';

function Profile() {
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
    <div className={stylesProfile.main}>
      <div className={stylesProfile.nav}>
        <NavLink
          to={{ pathname: '/profile' }}
          className={stylesProfile.link + ' text text_type_main-medium'}
          activeClassName={
            stylesProfile.activeLink + ' text text_type_main-medium'
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to={{ pathname: '/profile/orders' }}
          className={stylesProfile.link + ' text text_type_main-medium'}
          activeClassName={
            stylesProfile.activeLink + ' text text_type_main-medium'
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to={{ pathname: '/profile/exit' }}
          className={stylesProfile.link + ' text text_type_main-medium'}
          activeClassName={
            stylesProfile.activeLink + ' text text_type_main-medium'
          }
        >
          Выход
        </NavLink>
      </div>
      <form className={stylesProfile.form + ' mb-20'}>
        <div className={'mb-6'}>
          <Input
            placeholder="Имя"
            value={form.name}
            name="name"
            onChange={onChange}
          />
        </div>
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
      </form>
    </div>
  );
}

export default Profile;
