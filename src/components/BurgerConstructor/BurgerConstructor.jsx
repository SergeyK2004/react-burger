import React from 'react';
import stylesBurgerConstructor from './BurgerConstructor.module.css';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';

function BurgerConstructor(props) {
  const burgerBun = data.find((item) => item.type === 'bun');
  return (
    <div className="mt-25 ml-4">
      <ConstructorElement
        type="top"
        isLocked={true}
        text={burgerBun.name + ' (верх)'}
        price={burgerBun.price / 2}
        thumbnail={burgerBun.image_mobile}
      />
      <div className={stylesBurgerConstructor.list + ' mt-4 mb-4 pr-4'}>
        {data.map((item) => (
          <div className={stylesBurgerConstructor.burgerItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
        ))}
      </div>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={burgerBun.name + ' (низ)'}
        price={burgerBun.price / 2}
        thumbnail={burgerBun.image_mobile}
      />

      <div className={stylesBurgerConstructor.footer + '  mt-10'}>
        <div className="mr-10">
          <p
            className={
              stylesBurgerConstructor.summ + ' text text_type_digits-medium'
            }
          >
            610
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
