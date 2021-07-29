import React from 'react';
import stylesIngredientDetails from './IngredientDetails.module.css';

function IngredientDetails({ item }) {
  return (
    <div className={stylesIngredientDetails.bigCard}>
      <img src={item.image_large} alt="Ингредиент" className="mr-5 ml-5" />
      <p
        className={
          stylesIngredientDetails.bigCardName +
          ' text text_type_main-medium mt-4'
        }
      >
        {item.name}
      </p>
      <div className={stylesIngredientDetails.nutrients + ' mt-8 mb-15'}>
        <div className={stylesIngredientDetails.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </div>
        <div className={stylesIngredientDetails.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </div>
        <div className={stylesIngredientDetails.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </div>
        <div className={stylesIngredientDetails.nutrient}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
