import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesIngredient from './Ingredient.module.css';
import { typeOfIngredientsData } from '../../utils/const';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_DETAILS } from '../../services/actions/index';
import { useDrag } from 'react-dnd';

function Ingredient({ item, onModalOpen }) {
  const dispatch = useDispatch();
  function onClick() {
    dispatch({
      type: LOAD_DETAILS,
      item: item,
    });
    const modalChild = <IngredientDetails />;
    const modalHeader = 'Детали ингредиента';
    onModalOpen(modalChild, modalHeader);
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

Ingredient.propTypes = {
  item: typeOfIngredientsData.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
