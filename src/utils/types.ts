export type TItem = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  constId?: number;
    index?: number;
    count: number;
}

export type TUserData = {
  email: string,
  password: string,
  name?: string,
}

import { store } from '../index';
import { TAuthActions } from '../services/actions/authActions';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TBurgerActions } from '../services/actions/burgerActions';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TAuthActions | TBurgerActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
  >;

  // Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

