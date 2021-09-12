import {
  LOAD_INGREDIENTS,
  LOAD_DETAILS,
  LOAD_CONSTRUCTOR,
  DELETE_DETAILS,
  ORDER_NUMBER,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
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
        ingredients: action.data.map((el) => {
          el['count'] = 0;
          return el;
        }),
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
    case ADD_INGREDIENT:
      return {
        ...state,
        constructor: [
          ...state.constructor,
          { ...action.item, constId: action.id },
        ],
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.item._id ? { ...item, count: ++item.count } : item
        ),
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        constructor: [...state.constructor].filter(
          (item) => item.constId !== action.item.constId
        ),
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.item._id ? { ...item, count: --item.count } : item
        ),
      };

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
