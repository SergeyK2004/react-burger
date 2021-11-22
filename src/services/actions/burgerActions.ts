import { apiURL } from '../../utils/const';
import {
  LOAD_INGREDIENTS,
  LOAD_DETAILS,
  DELETE_DETAILS,
  ORDER_NUMBER,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INGREDIENT,
  ORDER_CLEAR,

 } from './index';
import { apiOrderURL } from '../../utils/const';
import { TItem } from '../../utils/types';
import { AppDispatch } from '../../utils/types';
import { getCookie } from './authActions';
export interface ILoadDetailsAction {
  readonly type: typeof LOAD_DETAILS;
  readonly item: TItem;
}
export interface IDeleteDetailsAction {
  readonly type: typeof DELETE_DETAILS;
}
export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TItem,
  readonly id: number,
  readonly qnt: number,

}
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly item: TItem,
  readonly qnt: number,
}
export interface IChangeingredientAction {
  readonly type: typeof CHANGE_INGREDIENT;
  readonly dragIndex: number,
  readonly hoverIndex: number,
}
export interface IGetDataAction {
  readonly type: typeof LOAD_INGREDIENTS;
  readonly data: Array<TItem>;
}
export interface IPostOrderAction {
  readonly type: typeof ORDER_NUMBER;
  readonly number: number;
}
export interface IOrderClearAction {
  readonly type: typeof ORDER_CLEAR;
}

export type TBurgerActions =
  | IChangeingredientAction
  | IDeleteIngredientAction
  | IAddIngredientAction
  | IDeleteDetailsAction
  | ILoadDetailsAction
  | IGetDataAction
  | IPostOrderAction
  | IOrderClearAction;


export function getData() {
  return function (dispatch: AppDispatch) {
    fetch(apiURL)
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: LOAD_INGREDIENTS,
            data: answer.data,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function postOrder(data: Array<TItem>) {
  return async function (dispatch: AppDispatch) {
    const orderArray = data.map((item) => item._id);
    const response = await fetch(apiOrderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify({
        ingredients: orderArray,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: ORDER_NUMBER,
            number: res.order.number,
          });
          dispatch({
            type: ORDER_CLEAR,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    return response;
  };
}
