import React, { useEffect } from 'react';
import stylesAppHeader from './AppHeader.module.css';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';

function AppHeader() {
  const [activeNav, setActiveNav] = React.useState('designer');
  const { path } = useRouteMatch();
  useEffect(() => {
    switch (path) {
      case '/feed':
        setActiveNav('feed');
        break;
      case '/profile':
        setActiveNav('profile');
        break;
      case '/':
        setActiveNav('designer');
        break;
      default:
        setActiveNav('designer');
    }
  }, [path]);

  return (
    <div className={stylesAppHeader.header}>
      <nav className={stylesAppHeader.navigate}>
        <div className={stylesAppHeader.burgers}>
          <Link
            to="/"
            className={
              (activeNav === 'designer'
                ? stylesAppHeader.menuItemActive
                : stylesAppHeader.menuItem) +
              ' text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2'
            }
          >
            <BurgerIcon
              type={activeNav === 'designer' ? 'primary' : 'secondary'}
            />
            <p className="ml-2">Конструктор</p>
          </Link>
          <Link
            to="/"
            className={
              (activeNav === 'feed'
                ? stylesAppHeader.menuItemActive
                : stylesAppHeader.menuItem) +
              ' text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2'
            }
          >
            <ListIcon type={activeNav === 'feed' ? 'primary' : 'secondary'} />
            <p className="ml-2">Лента заказов</p>
          </Link>
        </div>
        <div className={stylesAppHeader.logo}>
          <Logo />
        </div>{' '}
        <Link
          to="/profile"
          className={
            (activeNav === 'profile'
              ? stylesAppHeader.menuItemActive
              : stylesAppHeader.menuItem) +
            ' text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2 ' +
            stylesAppHeader.menuItemLs
          }
        >
          <ProfileIcon
            type={activeNav === 'profile' ? 'primary' : 'secondary'}
          />
          <p className="ml-2">Личный кабинет</p>
        </Link>
      </nav>
    </div>
  );
}

export default AppHeader;
