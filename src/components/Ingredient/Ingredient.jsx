import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesIngredient from './Ingredient.module.css';
import { typeOfIngredientsData } from '../../utils/const';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function Ingredient({ item, onModalOpen }) {
  function onClick() {
    const modalChild = <IngredientDetails item={item} />;
    const modalHeader = 'Детали ингредиента';
    onModalOpen(modalChild, modalHeader);
  }
  return (
    <div className={stylesIngredient.card} onClick={onClick}>
      <img src={item.image} alt="Продукт" />
      <div className={stylesIngredient.price + ' mt-1'}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-1">{item.name}</p>
      <div className={stylesIngredient.counter}>
        <Counter count={1} size="default" />
      </div>
    </div>
  );
}

export default Ingredient;

Ingredient.propTypes = {
  item: typeOfIngredientsData,
};
