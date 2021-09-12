import {
  LOAD_INGREDIENTS,
  LOAD_DETAILS,
  LOAD_CONSTRUCTOR,
  DELETE_DETAILS,
  ORDER_NUMBER,
} from '../actions';

const initialState = {
  ingredients: [],
  constructor: [],
  ingredient: {},
  order: 0,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    // загрузка ингредиентов с сервера
    case LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.data,
      };
    // подготовка данных об ингредиенте
    case LOAD_DETAILS:
      return {
        ...state,
        ingredient: action.item,
      };
    // удаление данных об ингредиенте
    case DELETE_DETAILS:
      return {
        ...state,
        ingredient: {},
        order: 0,
      };
    case ORDER_NUMBER:
      return {
        ...state,
        order: action.number,
      };

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
