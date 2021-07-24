import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesBurgerIngredients from './BurgerIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient';

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState('bun');
  const bunArray = data.filter((item) => item.type === 'bun');
  const mainArray = data.filter((item) => item.type === 'main');
  const sauceArray = data.filter((item) => item.type === 'sauce');
  return (
    <section className={stylesBurgerIngredients.section}>
      <div className={stylesBurgerIngredients.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={stylesBurgerIngredients.ingredients}>
        <p
          className={
            stylesBurgerIngredients.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Булки
        </p>
        <div className={stylesBurgerIngredients.chapter + ' mt-6 ml-4'}>
          {bunArray.map((item) => (
            <Ingredient item={item} />
          ))}
        </div>
        <p
          className={
            stylesBurgerIngredients.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Соусы
        </p>
        <div className={stylesBurgerIngredients.chapter + ' mt-6 ml-4'}>
          {sauceArray.map((item) => (
            <Ingredient item={item} />
          ))}
        </div>
        <p
          className={
            stylesBurgerIngredients.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Начинки
        </p>
        <div className={stylesBurgerIngredients.chapter + ' mt-6 ml-4'}>
          {mainArray.map((item) => (
            <Ingredient item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};
