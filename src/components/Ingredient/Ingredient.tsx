import React, {FunctionComponent, ReactElement, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesIngredient from './Ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';
import { TItem } from '../../utils/types';

interface IIngredientProps {
  item: TItem;
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}


const  Ingredient: FunctionComponent<IIngredientProps> = ({ item, onModalOpen }) => {
  const history = useHistory();
  let location = useLocation();
  function onClick() {
    history.push({
      pathname: `/ingredients/${item._id}`,
      state: { background: location },
    });
  }
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
  });
  return (
    <div ref={dragRef} className={stylesIngredient.card} onClick={onClick}>
      <img src={item.image} alt="Продукт" />
      <div className={stylesIngredient.price + ' mt-1'}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-1">{item.name}</p>
      <div className={stylesIngredient.counter}>
        {item.count > 0 && <Counter count={item.count} size="default" />}
      </div>
    </div>
  );
}

export default Ingredient;
