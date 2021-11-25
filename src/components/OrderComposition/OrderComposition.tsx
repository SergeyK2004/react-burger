import React, { useEffect, useState } from 'react';
import styles from './OrderComposition.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import { TItem, TOrderRow } from '../../utils/types';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrder } from '../../utils/auth';
import { useHistory } from 'react-router-dom';

function OrderComposition() {
  let { id } = useParams<{ id?: string }>();
  const [item, setItem] = useState<TOrderRow>();
  const items = useSelector((store) => store.wsReducer.messages.orders);
  const ingredientsData = useSelector(
    (store) => store.burgerReducer.ingredients
  );
  let needHeader = ' mt-25';
  const history = useHistory();
  if (history.action === 'PUSH' || history.action === 'REPLACE') {
    needHeader = '';
  }

  useEffect(() => {
    const foundedOrder = items.find(
      (el: TOrderRow) => el.number === Number(id)
    );

    if (foundedOrder) {
      setItem(foundedOrder);
    } else {
      getOrder(Number(id)).then((res) => {
        if (res.success) {
          setItem(res.orders[0]);
        }
      });
    }
  }, [id, items]);

  if (!item) {
    return null;
  }

  let stringOfDate = '';

  if (isToday(Date.parse(item.createdAt))) {
    stringOfDate = 'Сегодня, ';
  } else if (isYesterday(Date.parse(item.createdAt))) {
    stringOfDate = 'Вчера, ';
  } else {
    stringOfDate =
      formatDistanceToNow(Date.parse(item.createdAt), {
        locale: ru,
      }) + ' назад, ';
  }
  stringOfDate += format(Date.parse(item.createdAt), 'HH:mm zzz');

  let ingredientsArray: Array<TItem> = [];
  item.ingredients.forEach((el) => {
    const indexOfIngredient = ingredientsData.findIndex(
      (item) => item._id === el
    );
    if (indexOfIngredient >= 0) {
      ingredientsArray.push(ingredientsData[indexOfIngredient]);
    }
  });

  let price = 0;

  for (let item of ingredientsArray) {
    if (item) {
      price = price + (item.type === 'bun' ? item.price * 2 : item.price);
    }
  }
  let statusName = '';
  switch (item.status) {
    case 'done':
      statusName = 'Выполнен';
      break;
    case 'created':
      statusName = 'Создан';
      break;
    case 'pending':
      statusName = 'Готовится';
      break;
  }

  return (
    <div className={styles.bigCard}>
      {needHeader && <div className="mt-25"></div>}
      <p className={styles.number + ' text text_type_digits-default'}>
        {'#' + String(item.number).padStart(6, '0')}
      </p>
      <p
        className={styles.burgerName + ' text text_type_main-medium mt-6 mb-2'}
      >
        {item.name}
      </p>
      <p
        className={
          styles.burgerStatus + ' text text_type_main-small text_color_inactive'
        }
      >
        {statusName}
      </p>
      <p
        className={styles.burgerName + ' text text_type_main-medium mt-15 mb-6'}
      >
        Состав:
      </p>
      <div className={styles.list + ' mb-10 pr-6'}>
        {ingredientsArray.map((el, index) => {
          if (!el) {
            return null;
          }
          const priceString = (el.type === 'bun' ? '2 x ' : '1 x ') + el.price;
          return (
            <div key={index} className={styles.row}>
              <img
                alt="Фото"
                src={el.image_mobile}
                className={styles.image + ' mr-6'}
              ></img>
              <p
                className={
                  styles.ingredientName + ' text text_type_main-default mr-4'
                }
              >
                {el.name}
              </p>
              <p
                className={styles.remains + ' text text_type_main-default mr-2'}
              >
                {priceString}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          );
        })}
      </div>
      <div className={styles.footer + ' mb-10'}>
        <p className={'text text_type_main-default text_color_inactive'}>
          {stringOfDate}
        </p>
        <div className={styles.price}>
          <p className={'text text_type_digits-default mr-2'}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderComposition;
