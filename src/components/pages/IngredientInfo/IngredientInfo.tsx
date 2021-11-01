import React from 'react';
import stylesIngredientInfo from './IngredientInfo.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TItem } from '../../../utils/types';

function IngredientInfo() {
  const { id } = useParams<{id?: string}>();
  const items = useSelector((store: any) => store.burgerReducer.ingredients);
  const item = items.find((el: TItem) => el._id === id);

  if (!item) {
    return <div></div>;
  }
  return (
    <div className={stylesIngredientInfo.bigCard}>
      <h1 className={stylesIngredientInfo.label + ' text text_type_main-large'}>
        Детали ингредиента
      </h1>

      <img src={item.image_large} alt="Ингредиент" className="mr-5 ml-5" />
      <p
        className={
          stylesIngredientInfo.bigCardName + ' text text_type_main-medium mt-4'
        }
      >
        {item.name}
      </p>
      <div className={stylesIngredientInfo.nutrients + ' mt-8 mb-15'}>
        <div className={stylesIngredientInfo.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </div>
        <div className={stylesIngredientInfo.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </div>
        <div className={stylesIngredientInfo.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </div>
        <div className={stylesIngredientInfo.nutrient}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientInfo;
