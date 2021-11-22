import React, { FC, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import type { TOrderRow } from '../../utils/types';
import styles from './Order.module.css';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';

interface IOrderProps {
  data: TOrderRow;
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
  path: string;
}

const Order: FC<IOrderProps> = ({ data, onModalOpen, path }) => {
  const history = useHistory();
  let location = useLocation();
  function onClick() {
    history.push({
      pathname: `${path}${data.number}`,
      state: { background: location },
    });
  }

  let stringOfDate = '';

  if (isToday(Date.parse(data.createdAt))) {
    stringOfDate = 'Сегодня, ';
  } else if (isYesterday(Date.parse(data.createdAt))) {
    stringOfDate = 'Вчера, ';
  } else {
    stringOfDate =
      formatDistanceToNow(Date.parse(data.createdAt), {
        locale: ru,
      }) + ' назад, ';
  }
  stringOfDate += format(Date.parse(data.createdAt), 'HH:mm zzz');
  const ingredientsData = useSelector(
    (store) => store.burgerReducer.ingredients
  );

  const ingredientsArray = data.ingredients.map((el) => {
    const indexOfIngredient = ingredientsData.findIndex(
      (item) => item._id === el
    );
    if (indexOfIngredient >= 0) return ingredientsData[indexOfIngredient];
  });

  let price = 0;

  for (let item of ingredientsArray) {
    if (item) {
      price = price + (item.type === 'bun' ? item.price * 2 : item.price);
    }
  }

  return (
    <div
      className={styles.order + ' pt-6 pr-6 pb-6 pl-6 mr-2'}
      onClick={onClick}
    >
      <div className={styles.number}>
        <p className={'text text_type_digits-default'}>
          {'#' + String(data.number).padStart(6, '0')}
        </p>
        <p className={'text text_type_main-default text_color_inactive'}>
          {stringOfDate}
        </p>
      </div>
      <p className={styles.burgerName + ' text text_type_main-medium mt-6'}>
        {data.name}
      </p>
      <div className={styles.orderContent + ' mt-6'}>
        <div className={styles.ingredients}>
          {ingredientsArray.map((el, index) => {
            if (!el || index > 5) {
              return <div key={index}></div>;
            }
            let remains = '';
            if (index === 5 && ingredientsArray.length > 6) {
              remains = '+' + (ingredientsArray.length - 5);
            }
            return (
              <>
                <img
                  alt="Фото"
                  key={index}
                  src={el.image_mobile}
                  className={styles.image}
                ></img>
                {remains && (
                  <p
                    key={'p' + index}
                    className={styles.remains + ' text text_type_main-default'}
                  >
                    {remains}
                  </p>
                )}
              </>
            );
          })}
        </div>
        <div className={styles.price}>
          <p className={'text text_type_digits-default mr-2'}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Order;
