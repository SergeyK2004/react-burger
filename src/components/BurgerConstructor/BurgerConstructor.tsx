import React, { FunctionComponent, ReactNode, useReducer } from 'react';
import stylesBurgerConstructor from './BurgerConstructor.module.css';
import { useHistory } from 'react-router-dom';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from '../../utils/hooks';
import { postOrder } from '../../services/actions/burgerActions';
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT,
  CHANGE_INGREDIENT,
  DELETE_INGREDIENT,
} from '../../services/actions';
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient';
import { TItem } from '../../utils/types';
const initialState = { total: 0 };

interface IBurgerConstructorProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const BurgerConstructor: FunctionComponent<IBurgerConstructorProps> = ({
  onModalOpen,
}) => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.burgerReducer.constructor);
  const constId = Date.now();
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  const history = useHistory();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TItem) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item: TItem) => {
    let qnt = 1;
    if (item.type === 'bun') {
      qnt = 2;
      const bunElement = data.find((el: TItem) => el.type === 'bun');
      if (bunElement) {
        dispatch({
          type: DELETE_INGREDIENT,
          item: bunElement,
          qnt: qnt,
        });
      }
    }
    dispatch({
      type: ADD_INGREDIENT,
      item: item,
      id: constId,
      qnt: qnt,
    });
  };
  const burgerBun = data.find((item: TItem) => item.type === 'bun');

  const [stateTotal, dispatchTotal] = useReducer(reducer, initialState);

  function reducer() {
    const total = data.reduce(
      (sum: number, item: TItem) =>
        sum + (item.type === 'bun' ? item.price * 2 : item.price),
      0
    );
    return { total: total };
  }
  function onClick() {
    if (burgerBun) {
      if (auth) {
        dispatch(postOrder(data));
        const modalChild = <OrderDetails />;
        const modalHeader = '';
        onModalOpen(modalChild, modalHeader);
      } else {
        history.replace({ pathname: '/login' });
      }
    }
  }
  function moveElement(dragIndex: number, hoverIndex: number) {
    dispatch({
      type: CHANGE_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  }
  React.useEffect(() => {
    dispatchTotal();
  }, [data]);
  const inactiveButtonStyle = burgerBun
    ? {}
    : { opacity: 0.5, cursor: 'default' };
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
          (el: TItem, index: number) =>
            el.type !== 'bun' && (
              <ConstructorIngredient
                item={el}
                index={index}
                key={el.constId}
                moveElement={moveElement}
              />
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
        <div style={inactiveButtonStyle}>
          <Button type="primary" size="medium" onClick={onClick}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
