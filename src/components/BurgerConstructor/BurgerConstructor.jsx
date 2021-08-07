import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import stylesBurgerConstructor from './BurgerConstructor.module.css';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import { BurgerIngredientsContext } from '../../services/burgerIngredientsContext';
import { apiOrderURL } from '../../utils/const';

const initialState = { total: 0 };

function BurgerConstructor({ onModalOpen }) {
  const data = useContext(BurgerIngredientsContext);

  const burgerBun = data.find((item) => item.type === 'bun');

  const [stateTotal, dispatchTotal] = useReducer(reducer, initialState);

  async function postOrder() {
    const orderArray = data.map((item) => item._id);
    const response = await fetch(apiOrderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        ingredients: orderArray,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          console.log(res.order.number);
          return res.order.number;
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
    return response;
  }

  function reducer(state, action) {
    const total = data.reduce((sum, item) => sum + item.price, 0);
    return { total: total };
  }

  function onClick() {
    postOrder()
      .then((orderNum) => {
        console.log(`ordernum = ${orderNum}`);
        const modalChild = <OrderDetails order={orderNum} />;
        const modalHeader = '';
        onModalOpen(modalChild, modalHeader);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  React.useEffect(() => {
    dispatchTotal();
  }, [data]);

  return (
    <div className="mt-25 ml-4">
      {burgerBun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={burgerBun.name + ' (верх)'}
          price={burgerBun.price}
          thumbnail={burgerBun.image_mobile}
        />
      )}
      <div className={stylesBurgerConstructor.list + ' mt-4 mb-4 pr-4'}>
        {data.map(
          (item) =>
            item.type !== 'bun' && (
              <div
                className={stylesBurgerConstructor.burgerItem}
                key={item._id}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </div>
            )
        )}
      </div>

      {burgerBun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={burgerBun.name + ' (низ)'}
          price={burgerBun.price}
          thumbnail={burgerBun.image_mobile}
        />
      )}
      <div className={stylesBurgerConstructor.footer + '  mt-10'}>
        <div className="mr-10">
          <p
            className={
              stylesBurgerConstructor.total + ' text text_type_digits-medium'
            }
          >
            {stateTotal.total}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={onClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};
