import React from 'react';
import stylesAppHeader from './AppHeader.module.css';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const [activeNav, setActiveNav] = React.useState('designer');
  return (
    <div className={stylesAppHeader.header}>
      <nav className={stylesAppHeader.navigate}>
        <div className={stylesAppHeader.burgers}>
          <a
            href="#"
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
          </a>
          <a
            href="#"
            className={
              (activeNav === 'feed'
                ? stylesAppHeader.menuItemActive
                : stylesAppHeader.menuItem) +
              ' text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2'
            }
          >
            <ListIcon type={activeNav === 'feed' ? 'primary' : 'secondary'} />
            <p className="ml-2">Лента заказов</p>
          </a>
        </div>
        <div className={stylesAppHeader.logo}>
          <Logo />
        </div>{' '}
        <a
          href="#"
          className={
            (activeNav === 'feed'
              ? stylesAppHeader.menuItemActive
              : stylesAppHeader.menuItem) +
            ' text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2 ' +
            stylesAppHeader.menuItemLs
          }
        >
          <ProfileIcon type={activeNav === 'feed' ? 'primary' : 'secondary'} />
          <p className="ml-2">Личный кабинет</p>
        </a>
      </nav>
    </div>
  );
}

export default AppHeader;
