import React, { FC, ReactNode, useEffect } from 'react';
import styles from './Feed.module.css';
import FeedContent from '../../FeedContent/FeedContent';
import { TOrders } from '../../../utils/types';
import OrdersSummary from '../../OrdersSummary/OrdersSummary';
import { useDispatch, useSelector } from '../../../utils/hooks';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from '../../../services/actions';
import { wsApiOrderURL } from '../../../utils/const';

interface IFeedProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const Feed: FC<IFeedProps> = ({ onModalOpen }) => {
  const recivedData = useSelector((store) => store.wsReducer.messages);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsApiOrderURL,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.feed + ' mr-10'}>
        <h1 className={`${styles.label} text text_type_main-large mt-10 mb-5`}>
          Лента заказов
        </h1>
        <FeedContent
          onModalOpen={onModalOpen}
          recivedData={recivedData}
          path={'/feed/'}
        />
      </div>
      <OrdersSummary onModalOpen={onModalOpen} recivedData={recivedData} />
    </div>
  );
};

export default Feed;
