import React, { FC, ReactNode } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './FeedContent.module.css';
import Ingredient from '../Ingredient/Ingredient';
import { useSelector } from '../../utils/hooks';
import { TItem, TOrders } from '../../utils/types';
import Order from '../Order/Order';

interface IFeedContentProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
  recivedData: TOrders;
  path: string;
}

const FeedContent: FC<IFeedContentProps> = ({
  onModalOpen,
  recivedData,
  path,
}) => {
  const data = useSelector((store) => store.burgerReducer.ingredients);

  return (
    <section className={styles.section}>
      <div className={styles.orders}>
        <div className={styles.chapter + ' mt-6'}>
          {recivedData.orders.map((item) => (
            <Order
              data={item}
              key={item._id}
              onModalOpen={onModalOpen}
              path={path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedContent;
