import {
  LOAD_INGREDIENTS,
  LOAD_DETAILS,
  DELETE_DETAILS,
  ORDER_NUMBER,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INGREDIENT,
  ORDER_CLEAR,
} from '../actions';
import { TBurgerActions } from '../actions/burgerActions';
import { TItem } from '../../utils/types';

type TBurgerState = {
  ingredients: Array<TItem>;
  constructor: Array<TItem>;
  ingredient: TItem | {};
  order: number;
};

const initialState: TBurgerState = {
  ingredients: [],
  constructor: [],
  ingredient: {},
  order: 0,
};

export const burgerReducer = (state = initialState, action: TBurgerActions): TBurgerState => {
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
          item._id === action.item._id
            ? { ...item, count: item.count + action.qnt }
            : item
        ),
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        constructor: [...state.constructor].filter(
          (item) => item.constId !== action.item.constId
        ),
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.item._id
            ? { ...item, count: item.count - action.qnt }
            : item
        ),
      };
    case CHANGE_INGREDIENT:
      const newConstructor = [...state.constructor];
      const dragIngredient = newConstructor[action.dragIndex];
      newConstructor.splice(action.dragIndex, 1);
      newConstructor.splice(action.hoverIndex, 0, dragIngredient);

      return {
        ...state,
        constructor: newConstructor,
      };
    case ORDER_CLEAR:
      return {
        ...state,
        constructor: [],
        ingredients: [...state.ingredients].map((item) => {
          item['count'] = 0;
          return item;
        }),
      };

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
