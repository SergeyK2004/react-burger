import React, { useState, useEffect } from 'react';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesProfile from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchUser, logout } from '../../../services/actions/authActions';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authReducer.user);
  const [form, setValue] = useState({});
  const [changed, setChanged] = useState(false);
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setChanged(true);
    console.log(form);
  };

  const cancelClick = (e) => {
    console.log(e, 'canceled');
    setValue(user);
  };

  function onClick(e) {
    console.log(e, form, changed);
    e.preventDefault();
    if (changed) dispatch(patchUser(form));
  }
  function onExit(e) {
    dispatch(logout(form));
  }
  useEffect(() => {
    setValue(user);
  }, []);

  const inactiveButtonStyle = changed
    ? {}
    : { opacity: 0.5, cursor: 'default' };

  return (
    <div className={stylesProfile.main}>
      <div className={stylesProfile.nav + ' mr-15'}>
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
        <div
          className={stylesProfile.exitLink + ' text text_type_main-medium'}
          onClick={onExit}
        >
          Выход
        </div>
        <p
          className={stylesProfile.text + ' text text_type_main-default mt-20'}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={stylesProfile.form + ' mb-20'} onSubmit={onClick}>
        <div className={stylesProfile.input + ' mb-6'}>
          <Input
            placeholder="Имя"
            value={form.name || ''}
            name="name"
            onChange={onChange}
          />
        </div>
        <div className={stylesProfile.input + ' mb-6'}>
          <EmailInput
            value={form.email || ''}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className={stylesProfile.input + ' mb-6'}>
          <PasswordInput
            value={form.password || ''}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className={stylesProfile.buttons}>
          <Button type="primary" size="medium" style={inactiveButtonStyle}>
            Сохранить
          </Button>
          <Button onClick={cancelClick} type="secondary">
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
