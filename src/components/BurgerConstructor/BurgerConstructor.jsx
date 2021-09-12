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
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT, DELETE_INGREDIENT } from '../../services/actions';
const initialState = { total: 0 };

function BurgerConstructor({ onModalOpen }) {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.burgerReducer.constructor);
  const constId = Date.now();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item) => {
    if (item.type === 'bun') {
      const bunElement = data.find((el) => el.type === 'bun');
      if (bunElement) {
        dispatch({
          type: DELETE_INGREDIENT,
          item: bunElement,
        });
      }
    }
    dispatch({
      type: ADD_INGREDIENT,
      item: item,
      id: constId,
    });
  };
  const burgerBun = data.find((item) => item.type === 'bun');

  const [stateTotal, dispatchTotal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const total = data.reduce((sum, item) => sum + item.price, 0);
    return { total: total };
  }
  function deleteElement(item) {
    dispatch({
      type: DELETE_INGREDIENT,
      item: item,
    });
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
    <div ref={dropTarget} className="mt-25 ml-4">
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
                key={item.constId}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  handleClose={() => deleteElement(item)}
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
