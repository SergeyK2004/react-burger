import React, { FunctionComponent, ReactNode } from 'react';
import styles from './OrdersSummary.module.css';
import { TOrders } from '../../utils/types';

interface IOrdersSummaryProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
  recivedData: TOrders;
}

const OrdersSummary: FunctionComponent<IOrdersSummaryProps> = ({
  onModalOpen,
  recivedData,
}) => {
  return (
    <div className={styles.list + ' mt-25 mb-4 pr-4'}>
      <div className={styles.columns}>
        <div className={styles.done}>
          <p
            className={styles.doneNumbers + ' mb-4 text text_type_main-medium'}
          >
            Готовы:
          </p>
          <div className={styles.doneList}>
            {recivedData.orders.map((item) => {
              if (item.status === 'done') {
                return (
                  <p
                    key={item._id}
                    className="text text_type_digits-default text_color_inactive"
                  >
                    {String(item.number).padStart(6, '0')}
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className={styles.work}>
          <p
            className={styles.doneNumbers + ' mb-4 text text_type_main-medium'}
          >
            В работе:
          </p>
          {recivedData.orders.map((item) => {
            if (item.status !== 'done') {
              return (
                <p key={item._id} className="text text_type_digits-default">
                  {String(item.number).padStart(6, '0')}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <p className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </p>
      <p className="text text_type_digits-large">{recivedData.total}</p>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{recivedData.totalToday}</p>
    </div>
  );
};

export default OrdersSummary;
