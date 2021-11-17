import { authApiURL } from '../../utils/const';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CHEK_TOKEN } from './index';
import { TUserData } from '../../utils/types';
import { AppDispatch } from '../../utils/types';

export interface ILoginUserAction {
  readonly type: typeof LOGIN_USER;
  readonly data: TUserData;
}
export interface IRegisterUserAction {
  readonly type: typeof REGISTER_USER;
  readonly data: TUserData;
}
export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
}
export interface IChekTokenAction {
  readonly type: typeof CHEK_TOKEN;
  readonly data: TUserData;
}

export type TAuthActions =
  | ILoginUserAction
  | IRegisterUserAction
  | ILogoutUserAction
  | IChekTokenAction;

export function login(data: TUserData) {
  return function (dispatch: AppDispatch) {
    fetch(`${authApiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then(checkReponse)
      .then((answer) => {
        if (answer.success) {
          setCookie('accessToken', answer.accessToken);
          localStorage.setItem('refreshToken', answer.refreshToken);
          dispatch({
            type: LOGIN_USER,
            data: answer.user,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function register(data: TUserData) {
  return function (dispatch: AppDispatch) {
    fetch(`${authApiURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    })
      .then(checkReponse)
      .then((answer) => {
        if (answer.success) {
          setCookie('accessToken', answer.accessToken);
          localStorage.setItem('refreshToken', answer.refreshToken);
          dispatch({
            type: REGISTER_USER,
            data: answer.user,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function logout() {
  return function (dispatch: AppDispatch) {
    fetch(`${authApiURL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then(checkReponse)
      .then((answer) => {
        if (answer.success) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({
            type: LOGOUT_USER,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function getUser() {
  return function (dispatch: AppDispatch) {
    fetchWithRefresh(`${authApiURL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
    })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: CHEK_TOKEN,
            data: answer.user,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function patchUser(data: TUserData) {
  return function (dispatch: AppDispatch) {
    fetchWithRefresh(`${authApiURL}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: CHEK_TOKEN,
            data: answer.user,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${authApiURL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkReponse);
};
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type MyRequestInit = Overwrite<RequestInit, {headers: Record<string, string>  }>;

export const fetchWithRefresh = async (url: string, options: MyRequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function setCookie(name: string, value: string, props: any = {}) {
  props = props || {};
  props = {
    path: '/',
    expires: 35900,
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
