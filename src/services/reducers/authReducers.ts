import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CHEK_TOKEN } from '../actions';
import type { TUserData } from '../../utils/types';
import type { TAuthActions } from '../actions/authActions';

type TAuthState = {
  user: TUserData;
  accessToken: string;
  isAuthorized: boolean;
}

const initialState: TAuthState = {
  user: {
    email: '',
    password: '',
  },
  accessToken: '',
  isAuthorized: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    // аутентификация пользователя
    case LOGIN_USER:
      return {
        ...state,
        user: action.data,
        isAuthorized: true,
      };
    // регистрация нового пользователя
    case REGISTER_USER:
      return {
        ...state,
        user: action.data,
        isAuthorized: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {
    email: '',
    password: '',
  },
        isAuthorized: false,
      };
    case CHEK_TOKEN:
      return {
        ...state,
        user: action.data,
        isAuthorized: true,
      };
    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
