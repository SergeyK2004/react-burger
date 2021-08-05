import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import stylesMain from './Main.module.css';
import { typeOfIngredientsData } from '../../utils/const';

function Main({ data, onModalOpen }) {
  return (
    <div className={stylesMain.main}>
      <div className="mr-10">
        <h1
          className={`${stylesMain.label} text text_type_main-large mt-10 mb-5`}
        >
          Соберите бургер
        </h1>
        <BurgerIngredients data={data} onModalOpen={onModalOpen} />
      </div>
      <BurgerConstructor data={data} onModalOpen={onModalOpen} />
    </div>
  );
}

export default Main;

Main.propTypes = {
  data: PropTypes.arrayOf(typeOfIngredientsData).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
