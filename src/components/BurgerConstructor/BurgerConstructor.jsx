import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import stylesBurgerConstructor from './BurgerConstructor.module.css';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions/burgerActions';

const initialState = { total: 0 };

function BurgerConstructor({ onModalOpen }) {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.burgerReducer.ingredients);

  const burgerBun = data.find((item) => item.type === 'bun');

  const [stateTotal, dispatchTotal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const total = data.reduce((sum, item) => sum + item.price, 0);
    return { total: total };
  }

  function onClick() {
    dispatch(postOrder(data));
    const modalChild = <OrderDetails />;
    const modalHeader = '';
    onModalOpen(modalChild, modalHeader);
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
