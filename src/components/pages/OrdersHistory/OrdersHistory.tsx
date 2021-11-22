import React, { FC, useEffect, MouseEvent, ReactNode } from 'react';
import styles from './OrdersHistory.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../utils/hooks';
import { logout } from '../../../services/actions/authActions';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from '../../../services/actions';
import { wsUserApiOrderURL } from '../../../utils/const';
import { getCookie } from '../../../services/actions/authActions';
import FeedContent from '../../FeedContent/FeedContent';

interface IOrdersHistoryProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const OrdersHistory: FC<IOrdersHistoryProps> = ({ onModalOpen }) => {
  const dispatch = useDispatch();
  const recivedData = useSelector((store) => store.wsReducer.messages);

  function onExit(e: MouseEvent) {
    dispatch(logout());
  }
  useEffect(() => {
    const accessToken = getCookie('accessToken').replace('Bearer ', '');
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${wsUserApiOrderURL}?token=${accessToken}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.nav + ' mr-15'}>
        <Link
          to={{ pathname: '/profile' }}
          className={styles.link + ' text text_type_main-medium'}
        >
          Профиль
        </Link>
        <Link
          to={{ pathname: '/profile/orders' }}
          className={styles.activeLink + ' text text_type_main-medium'}
        >
          История заказов
        </Link>
        <div
          className={styles.exitLink + ' text text_type_main-medium'}
          onClick={onExit}
        >
          Выход
        </div>
        <p className={styles.text + ' text text_type_main-default mt-20'}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.form + ' mb-20'}>
        <FeedContent
          onModalOpen={onModalOpen}
          recivedData={recivedData}
          path={'/profile/orders/'}
        />
      </div>
    </div>
  );
};

export default OrdersHistory;
