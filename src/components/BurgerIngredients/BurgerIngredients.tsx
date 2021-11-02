import React, { ReactElement, FunctionComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesBurgerIngredients from './BurgerIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient';
import { useSelector } from 'react-redux';
import { TItem } from '../../utils/types';

interface IBurgerIngredientsProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const  BurgerIngredients: FunctionComponent<IBurgerIngredientsProps> = ({ onModalOpen }) => {
  const data = useSelector((store: any) => store.burgerReducer.ingredients);
  const [current, setCurrent] = React.useState('bun');
  const bunArray = data.filter((item: TItem) => item.type === 'bun');
  const mainArray = data.filter((item: TItem) => item.type === 'main');
  const sauceArray = data.filter((item: TItem) => item.type === 'sauce');

  const ingredientsWindow = document.querySelector('#ingredients');
  const bunElement = document.querySelector('#bun');
  const sauceElement = document.querySelector('#sauce');
  const mainElement = document.querySelector('#main');

  const scrollListener = () => {
    // Посчитаем расстояние до каждого раздела
    if (!ingredientsWindow || !bunElement || !sauceElement || !mainElement) {
      setCurrent('bun');
      return;
    }
    const bunLength = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
        bunElement.getBoundingClientRect().top
    );
    const sauceLength = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
        sauceElement.getBoundingClientRect().top
    );
    const mainLength = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
        mainElement.getBoundingClientRect().top
    );
    const rightTabLength = Math.min(bunLength, sauceLength, mainLength);
    setCurrent(
      bunLength === rightTabLength
        ? 'bun'
        : sauceLength === rightTabLength
        ? 'sauce'
        : 'main'
    );
  };
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
      <div
        id="ingredients"
        onScroll={scrollListener}
        className={stylesBurgerIngredients.ingredients}
      >
        <p
          id="bun"
          className={
            stylesBurgerIngredients.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Булки
        </p>
        <div className={stylesBurgerIngredients.chapter + ' mt-6 ml-4'}>
          {bunArray.map((item: TItem) => (
            <Ingredient item={item} key={item._id} onModalOpen={onModalOpen} />
          ))}
        </div>
        <p
          id="sauce"
          className={
            stylesBurgerIngredients.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Соусы
        </p>
        <div className={stylesBurgerIngredients.chapter + ' mt-6 ml-4'}>
          {sauceArray.map((item: TItem) => (
            <Ingredient item={item} key={item._id} onModalOpen={onModalOpen} />
          ))}
        </div>
        <p
          id="main"
          className={
            stylesBurgerIngredients.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Начинки
        </p>
        <div className={`${stylesBurgerIngredients.chapter} mt-6 ml-4`}>
          {mainArray.map((item: TItem) => (
            <Ingredient item={item} key={item._id} onModalOpen={onModalOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;

